const mongoose = require("mongoose");

const dashboardSnapshotSchema = new mongoose.Schema(
  {
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
      index: true,
    },
    snapshotDate: {
      type: Date,
      required: true,
    },
    totalUnit: {
      type: Number,
      default: 0,
    },
    inventoryValue: {
      type: Number,
      default: 0,
    },
    lowStocks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

dashboardSnapshotSchema.index(
  { store: 1, snapshotDate: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "DashboardSnapshot",
  dashboardSnapshotSchema
);
