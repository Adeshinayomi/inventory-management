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



exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.product", "name sku price")
      .populate("soldBy","name email")
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

exports.getOrdersStats =  async (req,res)=>{
  try{
    const totalSales = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSales: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);
    const totalOrders = await Order.find().countDocuments();
    const itemsSold = await Order.aggregate([
      {
        $unwind: "$items"
      },
      {
        $group:{
          _id: null,
          total: {
            $sum: "$items.quantity"
          }
        }
      }
    ])

    const averageOrderValue = totalOrders === 0 ? 0 : totalSales[0]?.totalSales / totalOrders;

    res.status(200).json({
      totalSales:totalSales[0]?.totalSales || 0,
      totalOrders,
      itemsSold:itemsSold[0]?.total || 0,
      averageOrderValue
    })
  }catch(error){
    res.status(500).json({message:error.message})
  }
}

// Helper function for creating the date filter
const getDateFilter = (startDate, endDate) => {
  const filter = {};

  if (startDate) {
    const start = new Date(startDate);

    if (isNaN(start.getTime())) {
      throw new Error("Invalid start date");
    }

    start.setHours(0, 0, 0, 0);

    filter.$gte = start;
  }

  if (endDate) {
    const end = new Date(endDate);

    if (isNaN(end.getTime())) {
      throw new Error("Invalid end date");
    }

    end.setHours(23, 59, 59, 999);

    filter.$lte = end;
  }

  if (startDate || endDate) {
    return {
      createdAt: filter,
    };
  }

  return {};
};


exports.getSalesStats = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const dateFilter = getDateFilter(
      startDate,
      endDate
    );

    // =========================
    // TOTAL SALES
    // =========================

    const salesResult = await Order.aggregate([
      {
        $match: dateFilter,
      },
      {
        $group: {
          _id: null,
          totalSales: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    const totalSales =
      salesResult[0]?.totalSales || 0;


    // =========================
    // TOTAL ORDERS
    // =========================

    const totalOrders = await Order.countDocuments(
      dateFilter
    );


    // =========================
    // TOTAL ITEMS SOLD
    // =========================

    const itemsSoldResult = await Order.aggregate([
      {
        $match: dateFilter,
      },
      {
        $unwind: "$items",
      },
      {
        $group: {
          _id: null,
          itemsSold: {
            $sum: "$items.quantity",
          },
        },
      },
    ]);

    const itemsSold =
      itemsSoldResult[0]?.itemsSold || 0;


    // =========================
    // AVERAGE ORDER VALUE
    // =========================

    const averageOrderValue =
      totalOrders === 0
        ? 0
        : totalSales / totalOrders;


    res.status(200).json({
      totalSales,
      totalOrders,
      itemsSold,
      averageOrderValue,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching sales statistics",
      error: error.message,
    });
  }
};

exports.getTopSellingCategories = async (req, res) => {
  try {
    const categories = await Order.aggregate([
      // 1. Break each order into individual items
      {
        $unwind: "$items",
      },

      // 2. Get the Product document for each item
      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "product",
        },
      },

      // 3. Turn the product array into an object
      {
        $unwind: "$product",
      },

      // 4. Group items by product category
      {
        $group: {
          _id: "$product.category",

          // Add the quantity sold for each category
          sales: {
            $sum: "$items.quantity",
          },
        },
      },

      // 5. Highest-selling category first
      {
        $sort: {
          sales: -1,
        },
      },

      // 6. Return the format your frontend expects
      {
        $project: {
          _id: 0,
          category: "$_id",
          sales: 1,
        },
      },
    ]);

    res.status(200).json({
      categories,
    });
  } catch (error) {
    console.error("Top selling categories error:", error);

    res.status(500).json({
      message: "Error fetching top selling categories",
      error: error.message,
    });
  }
};

exports.getMonthlySales = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();

    const sales = await Order.aggregate([
      // Get orders from the current year
      {
        $match: {
          orderDate: {
            $gte: new Date(`${currentYear}-01-01`),
            $lt: new Date(`${currentYear + 1}-01-01`),
          },
        },
      },

      // Group sales by month
      {
        $group: {
          _id: {
            $month: "$orderDate",
          },
          sales: {
            $sum: "$totalAmount",
          },
        },
      },

      // Sort by month
      {
        $sort: {
          _id: 1,
        },
      },

      // Convert month number to month name
      {
        $project: {
          _id: 0,
          month: {
            $arrayElemAt: [
              [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              {
                $subtract: ["$_id", 1],
              },
            ],
          },
          sales: 1,
        },
      },
    ]);

    // Create all 12 months
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Add months with no sales
    const completeSales = months.map((month) => {
      const existingMonth = sales.find(
        (item) => item.month === month
      );

      return {
        month,
        sales: existingMonth ? existingMonth.sales : 0,
      };
    });

    res.status(200).json({
      sales: completeSales,
    });
  } catch (error) {
    console.error("Monthly sales error:", error);

    res.status(500).json({
      message: "Error fetching monthly sales",
      error: error.message,
    });
  }
};
