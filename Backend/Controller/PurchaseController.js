const Purchase = require("../Models/Purchase.js");
const Product = require("../Models/Product.js");
const generateId = require("../Utils/generateId.js");

exports.createPurchase = async (req, res) => {
  try {
    const {
      product,
      supplier,
      quantity,
      costPrice
    } = req.body;

    if (!product || !supplier || !quantity || !costPrice) {
      return res.status(400).json({
        message: "Product, supplier, quantity and cost price are required"
      });
    }

    if (Number(quantity) <= 0 || Number(costPrice) < 0) {
      return res.status(400).json({
        message: "Quantity and cost price must be valid"
      });
    }

    const productExists = await Product.findById(product);

    if (!productExists) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    const totalCost = Number(quantity) * Number(costPrice);

    const purchase = await Purchase.create({
      purchaseId: generateId("PUR"),
      product,
      supplier,
      quantity: Number(quantity),
      costPrice: Number(costPrice),
      totalCost,
      purchasedBy: req.user.id
    });

    productExists.stock += Number(quantity);

    productExists.available = productExists.stock > 0;

    await productExists.save();

    res.status(201).json({
      message: "Product restocked successfully",
      purchase,
      updatedStock: productExists.stock
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
};
