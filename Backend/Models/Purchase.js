const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema(
  {
    purchaseId: {
      type: String,
      required: true,
      unique: true
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },

    supplier: {
      type: String,
      required: true
    },

    quantity: {
      type: Number,
      required: true,
      min: 1
    },

    costPrice: {
      type: Number,
      required: true,
      min: 0
    },

    totalCost: {
      type: Number,
      required: true,
      min: 0
    },

    purchasedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    purchaseDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Purchase", purchaseSchema);