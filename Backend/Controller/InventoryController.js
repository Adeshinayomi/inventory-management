const Inventory = require("../Models/Product.js");
const Product = require("../Models/Product.js");

exports.getLowStockProducts = async (req, res) => {
  try {
    const products = await Inventory.find({
      $expr: {
        $lte: ["$stock", "$threshold"],
      },
    });

    res.status(200).json({
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getInventoryStats = async (req, res) => {
  try {
    const totalUnitsResult = await Inventory.aggregate([
      {
        $group: {
          _id: null,
          totalUnits: { $sum: "$stock" },
        },
      },
    ]);

    const totalUnit = totalUnitsResult[0]?.totalUnits || 0;

    const lowStocks = await Inventory.countDocuments({
      $expr: {
        $lt: ["$stock", "$threshold"],
      },
    });

    const outOfStock = await Inventory.find({
        stock:0
    })

    const inventoryValueResult = await Inventory.aggregate([
      {
        $group: {
          _id: null,
          inventoryValue: { $sum: { $multiply: ["$price", "$stock"] } },
        },
      },
    ]);

    const inventoryValue = inventoryValueResult[0]?.inventoryValue || 0;

    res.status(200).json({ 
        totalUnit, 
        inventoryValue,
        lowStocks,
        outOfStock
    });
  } catch (error) {
    console.error("Inventory stats error:", error);
    res
      .status(500)
      .json({
        message: "Error fetching inventory statistics",
        error: error.message,
      });
  }
};

exports.restockProduct = async (req, res) => {
  try {
    const { sku } = req.params;
    const { quantity } = req.body;

    // Validate quantity exists
    if (quantity === undefined || quantity === null) {
      return res.status(400).json({
        success: false,
        message: "Restock quantity is required",
      });
    }

    // Convert to number
    const restockQuantity = Number(quantity);

    // Validate quantity
    if (!Number.isFinite(restockQuantity) || restockQuantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Restock quantity must be a positive number",
      });
    }

    // Find product
    const product = await Product.findOne({ sku });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Increase stock
    product.stock += restockQuantity;

    // Product is available once stock is above 0
    product.available = product.stock > 0;

    await product.save();

    res.status(200).json({
      success: true,
      message: `${restockQuantity} units added to ${product.name}`,
      product,
    });
  } catch (error) {
    console.error("Restock product error:", error);

    res.status(500).json({
      success: false,
      message: "Error restocking product",
      error: error.message,
    });
  }
};