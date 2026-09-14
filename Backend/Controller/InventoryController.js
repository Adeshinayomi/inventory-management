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
