const Order = require("../Models/Order.js");
const Product = require("../Models/Product.js");
const generateId = require("../Utils/generateId.js");

exports.createOrder = async (req, res) => {
  try {
    const { items, paymentMethod } = req.body;

    if (
      !items ||
      !Array.isArray(items) ||
      items.length === 0 ||
      !paymentMethod
    ) {
      return res.status(400).json({
        message: "Customer, items and payment method are required"
      });
    }

    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const { product, quantity } = item;

      if (!product || !quantity || quantity < 1) {
        return res.status(400).json({
          message: "Each item must contain a valid product and quantity"
        });
      }

      const productExists = await Product.findById(product);

      if (!productExists) {
        return res.status(404).json({
          message: `Product ${product} not found`
        });
      }

      if (productExists.stock < quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${productExists.name}. Available stock: ${productExists.stock}`
        });
      }

      const priceAtSale = Number(productExists.price);
      const itemTotal = priceAtSale * Number(quantity);

      orderItems.push({
        product: productExists._id,
        quantity: Number(quantity),
        priceAtSale,
        totalAmount: itemTotal
      });

      totalAmount += itemTotal;

      productExists.stock -= Number(quantity);

      productExists.available = productExists.stock > 0;

      await productExists.save();
    }

    const order = await Order.create({
      orderId: generateId("ORD"),
      items: orderItems,
      totalAmount,
      paymentMethod,
      soldBy: req.user.id
    });

    res.status(201).json({
      message: "Order created successfully",
      order
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
};


// GET ALL ORDERS
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.product", "name sku price")
      .populate("soldBy")
      .sort({ createdAt: -1 });

    res.status(200).json({
      orders
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// GET ORDER BY ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      orderId: req.params.orderId
    })
      .populate("items.product", "name sku price")
      .populate("soldBy", "name email");

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    res.status(200).json({
      order
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


exports.getTotalProductsSold = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $unwind: "$items"
      },
      {
        $group: {
          _id: null,
          totalProductsSold: {
            $sum: "$items.quantity"
          }
        }
      }
    ]);

    res.status(200).json({
      totalProductsSold: result[0]?.totalProductsSold || 0
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// TOTAL SALES
exports.getTotalSales = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSales: {
            $sum: "$totalAmount"
          }
        }
      }
    ]);

    res.status(200).json({
      totalSales: result[0]?.totalSales || 0
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// TOTAL ORDERS
exports.getTotalOrders = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    res.status(200).json({
      totalOrders
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getTopSellingCategory = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $unwind: "$items"
      },

      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "product"
        }
      },

      {
        $unwind: "$product"
      },

      {
        $group: {
          _id: "$product.category",
          totalProductsSold: {
            $sum: "$items.quantity"
          }
        }
      },

      {
        $sort: {
          totalProductsSold: -1
        }
      },

      {
        $limit: 1
      }
    ]);

    res.status(200).json({
      topSellingCategory: result[0]?._id || null,
      totalProductsSold: result[0]?.totalProductsSold || 0
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};