const Product = require("../Models/Product.js");
const Sale = require("../Models/Order.js");
const DashboardSnapshot = require("../Models/DashboardSnapshot.js");

const DAY_MS = 24 * 60 * 60 * 1000;

function getPercentageChange(current, previous) {
  if (previous === null || previous === undefined || previous <= 0) {
    return {
      percentageChange: 0,
      change: "no_change",
    };
  }

  const difference = ((current - previous) / previous) * 100;
  const rounded = Math.round(difference * 100) / 100;

  if (rounded === 0) {
    return {
      percentageChange: 0,
      change: "no_change",
    };
  }

  return {
    percentageChange: rounded,
    change: rounded > 0 ? "increase" : "decrease",
  };
}

async function getInventoryMetrics(storeId) {
  const [totalUnitResult, inventoryValueResult, lowStocks] =
    await Promise.all([
      Product.aggregate([
        { $match: { store: storeId } },
        {
          $group: {
            _id: null,
            total: { $sum: "$stock" },
          },
        },
      ]),

      Product.aggregate([
        { $match: { store: storeId } },
        {
          $group: {
            _id: null,
            total: {
              $sum: {
                $multiply: ["$price", "$stock"],
              },
            },
          },
        },
      ]),

      Product.countDocuments({
        store: storeId,
        $expr: {
          $lte: ["$stock", "$threshold"],
        },
      }),
    ]);

  return {
    totalUnit: totalUnitResult[0]?.total ?? 0,
    inventoryValue: inventoryValueResult[0]?.total ?? 0,
    lowStocks,
  };
}

exports.getDashboardStats = async (req, res) => {
  try {
    const storeId = req.storeId;

    if (!storeId) {
      return res.status(400).json({
        message: "Store ID is missing",
      });
    }

    const now = new Date();
    const currentPeriodStart = new Date(now.getTime() - 7 * DAY_MS);
    const previousPeriodStart = new Date(now.getTime() - 14 * DAY_MS);

    // Current and previous seven-day sales periods.
    const [currentSalesResult, previousSalesResult, inventory] =
      await Promise.all([
        Sale.aggregate([
          {
            $match: {
              store: storeId,
              createdAt: {
                $gte: currentPeriodStart,
                $lt: now,
              },
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$totalAmount" },
            },
          },
        ]),

        Sale.aggregate([
          {
            $match: {
              store: storeId,
              createdAt: {
                $gte: previousPeriodStart,
                $lt: currentPeriodStart,
              },
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$totalAmount" },
            },
          },
        ]),

        getInventoryMetrics(storeId),
      ]);

    const currentSales = currentSalesResult[0]?.total ?? 0;
    const previousSales = previousSalesResult[0]?.total ?? 0;

    // Compare inventory with the latest snapshot at least seven days old.
    const targetSnapshotDate = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate()
      ) - 7 * DAY_MS
    );

    const previousSnapshot = await DashboardSnapshot.findOne({
      store: storeId,
      snapshotDate: { $lte: targetSnapshotDate },
    })
      .sort({ snapshotDate: -1 })
      .lean();

    const hasInventoryHistory = Boolean(previousSnapshot);

    res.status(200).json({
      totalSales: {
        value: currentSales,
        ...getPercentageChange(currentSales, previousSales),
        comparisonPeriod: "previous_7_days",
      },

      totalUnit: {
        value: inventory.totalUnit,
        ...getPercentageChange(
          inventory.totalUnit,
          previousSnapshot?.totalUnit
        ),
      },

      inventoryValue: {
        value: inventory.inventoryValue,
        ...getPercentageChange(
          inventory.inventoryValue,
          previousSnapshot?.inventoryValue
        ),
      },

      lowStocks: {
        value: inventory.lowStocks,
        ...getPercentageChange(
          inventory.lowStocks,
          previousSnapshot?.lowStocks
        ),
      },

      inventoryHistoryAvailable: hasInventoryHistory,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);

    res.status(500).json({
      message: "Failed to fetch dashboard statistics",
    });
  }
};

const Store = require("../Models/Store.js");

exports.createDailyDashboardSnapshots = async (req, res) => {
  try {
    // Protect this endpoint from unauthorized requests.
    const secret = process.env.CRON_SECRET;

    if (
      !secret ||
      req.headers.authorization !== `Bearer ${secret}`
    ) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const now = new Date();

    // One snapshot per store per UTC calendar day.
    const snapshotDate = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate()
      )
    );

    const stores = await Store.find({}, "_id").lean();

    const results = await Promise.all(
      stores.map(async ({ _id: storeId }) => {
        const metrics = await getInventoryMetrics(storeId);

        return DashboardSnapshot.updateOne(
          { store: storeId, snapshotDate },
          {
            $set: {
              ...metrics,
              store: storeId,
              snapshotDate,
            },
          },
          { upsert: true }
        );
      })
    );

    return res.status(200).json({
      message: "Daily dashboard snapshots completed",
      storesProcessed: results.length,
      snapshotDate,
    });
  } catch (error) {
    console.error("Dashboard snapshot error:", error);

    return res.status(500).json({
      message: "Failed to create dashboard snapshots",
    });
  }
};
