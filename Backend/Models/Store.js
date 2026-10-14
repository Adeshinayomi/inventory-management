const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
  {
    storeName: {
      type: String,
      required: true,
      trim: true,
    },

    storeAddress: {
      type: String,
      required: true,
      trim: true,
    },

    storeEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    storePhone: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Store", storeSchema);