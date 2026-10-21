const connectDB = require("../Config/DatabaseConfig.js");
const Store = require("../Models/Store.js");
const DashboardSnapshot = require("../Models/DashboardSnapshot.js");
const Product = require("../Models/Product.js");

async function runDashboardSnapshot() {
  await connectDB();

  const stores = await Store.find({}, "_id");

  for (const store of stores) {
    const storeId = store._id;

    const [totals, lowStocks] = await Promise.all([
      Product.aggregate([
        { $match: { store: storeId } },
        {
          $group: {
            _id: null,
            totalUnit: { $sum: "$stock" },
            inventoryValue: {
              $sum: { $multiply: ["$price", "$stock"] },
            },
          },
        },
      ]),
      Product.countDocuments({
        store: storeId,
        $expr: { $lte: ["$stock", "$threshold"] },
      }),
    ]);

    const metrics = totals[0] || {
      totalUnit: 0,
      inventoryValue: 0,
    };

    const snapshotDate = new Date();
    snapshotDate.setUTCHours(0, 0, 0, 0);

    await DashboardSnapshot.updateOne(
      { store: storeId, snapshotDate },
      {
        $set: {
          totalUnit: metrics.totalUnit,
          inventoryValue: metrics.inventoryValue,
          lowStocks,
        },
      },
      { upsert: true }
    );

    console.log(`Snapshot saved for store ${storeId}`);
  }
}

runDashboardSnapshot()
  .then(() => {
    console.log("Dashboard snapshots completed successfully.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Dashboard snapshot failed:", error);
    process.exit(1);
});