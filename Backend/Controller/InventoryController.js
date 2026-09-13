const Inventory = require("../Models/Product.js");

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

exports.getOutOfStockProducts = async (req, res) => {
  try {
    const products = await Inventory.find({
      stock: 0,
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

exports.getInventoryValue = async (req, res) => {
  try {
    const result = await Inventory.aggregate([
      {
        $group: {
          _id: null,
          totalInventoryValue: {
            $sum: {
              $multiply: ["$price", "$stock"],
            },
          },
        },
      },
    ]);

    res.status(200).json({
      totalInventoryValue: result[0]?.totalInventoryValue || 0,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getTotalStock = async (req, res) => {
  try {
    const result = await Inventory.aggregate([
      {
        $group: {
          _id: null,
          totalStock: {
            $sum: "$stock",
          },
        },
      },
    ]);

    res.status(200).json({
      totalStock: result[0]?.totalStock || 0,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getInventoryStats = async (req, res) => {
  try {
    const totalProducts = await Inventory.countDocuments();

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
        totalProducts, 
        totalUnit, 
        lowStocks,
        inventoryValue 
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
