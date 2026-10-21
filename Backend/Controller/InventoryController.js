const Inventory = require("../Models/Product.js");
const Product = require("../Models/Product.js");

exports.getLowStockProducts = async (req, res) => {
  try {
    const storeId = req.storeId; // Get the store ID from the request object
    const products = await Inventory.find({
      $expr: {
        $lte: ["$stock", "$threshold"],
      },
      store: storeId
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

const DashboardSnapshot = require("../Models/DashboardSnapshot.js");

function calculateChange(current, previous) {
  if (previous == null || previous <= 0) {
    return {
      percentageChange: 0,
      change: "no_change",
    };
  }

  const percentageChange =
    Math.round(((current - previous) / previous) * 10000) / 100;

  return {
    percentageChange,
    change:
      percentageChange > 0
        ? "increase"
        : percentageChange < 0
          ? "decrease"
          : "no_change",
  };
}

exports.getInventoryStats = async (req, res) => {
  try {
    const storeId = req.storeId;

    if (!storeId) {
      return res.status(400).json({
        message: "Store ID is required",
      });
    }

    const [totals, lowStocks, outOfStock] = await Promise.all([
      Inventory.aggregate([
        { $match: { store: storeId } },
        {
          $group: {
            _id: null,
            totalUnits: { $sum: "$stock" },
            inventoryValue: {
              $sum: { $multiply: ["$price", "$stock"] },
            },
          },
        },
      ]),

      Inventory.countDocuments({
        store: storeId,
        $expr: {
          $lt: ["$stock", "$threshold"],
        },
      }),

      Inventory.countDocuments({
        store: storeId,
        stock: 0,
      }),
    ]);

    const totalUnit = totals[0]?.totalUnits ?? 0;
    const inventoryValue = totals[0]?.inventoryValue ?? 0;

    // Compare against the snapshot from approximately 7 days ago.
    const comparisonDate = new Date();
    comparisonDate.setUTCHours(0, 0, 0, 0);
    comparisonDate.setUTCDate(comparisonDate.getUTCDate() - 7);

    const previousSnapshot = await DashboardSnapshot.findOne({
      store: storeId,
      snapshotDate: { $lte: comparisonDate },
    }).sort({ snapshotDate: -1 });

    const previousTotalUnit = previousSnapshot?.totalUnit;
    const previousInventoryValue = previousSnapshot?.inventoryValue;
    const previousLowStocks = previousSnapshot?.lowStocks;

    return res.status(200).json({
      totalUnit: {
        value: totalUnit,
        ...calculateChange(totalUnit, previousTotalUnit),
      },

      inventoryValue: {
        value: inventoryValue,
        ...calculateChange(inventoryValue, previousInventoryValue),
      },

      lowStocks: {
        value: lowStocks,
        ...calculateChange(lowStocks, previousLowStocks),
      },

      outOfStock: {
        value: outOfStock,
        percentageChange: 0,
        change: "no_change",
      },

      inventoryHistoryAvailable: Boolean(previousSnapshot),
      comparisonPeriod: "previous_7_days",
    });
  } catch (error) {
    console.error("Inventory stats error:", error);

    return res.status(500).json({
      message: "Error fetching inventory statistics",
    });
  }
};

exports.restockProduct = async (req, res) => {
  try {
    const storeId = req.storeId;
    const { sku } = req.params;
    const { quantity } = req.body;

    if (quantity === undefined || quantity === null) {
      return res.status(400).json({
        success: false,
        message: "Restock quantity is required",
      });
    }

    const restockQuantity = Number(quantity);

    if (!Number.isFinite(restockQuantity) || restockQuantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Restock quantity must be a positive number",
      });
    }

    // Find product
    const product = await Product.findOne({ sku, store: storeId });

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