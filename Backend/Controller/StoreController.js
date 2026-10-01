const Store = require("../Models/Store");

// Create store
exports.createStore = async (req, res) => {
  try {
    const {
      name,
      address,
      email,
      phone,
    } = req.body;

    // Validate fields
    if (!name || !address || !email || !phone) {
      return res.status(400).json({
        message: "All store fields are required",
      });
    }

    // Only allow one store
    const existingStore = await Store.findOne();

    if (existingStore) {
      return res.status(400).json({
        message: "Store has already been created",
      });
    }

    const store = await Store.create({
      name,
      address,
      email,
      phone,
    });

    return res.status(201).json({
      message: "Store created successfully",
      store,
    });
  } catch (error) {
    console.error("Create store error:", error);

    return res.status(500).json({
      message: "Error creating store",
    });
  }
};

// Get store information
exports.getStore = async (req, res) => {
  try {
    const store = await Store.findOne();

    if (!store) {
      return res.status(404).json({
        message: "Store information not found",
      });
    }

    return res.status(200).json({
      message: "Store information retrieved successfully",
      store,
    });
  } catch (error) {
    console.error("Get store error:", error);

    return res.status(500).json({
      message: "Error getting store information",
    });
  }
};

// Update store information
exports.updateStore = async (req, res) => {
  try {
    const {
      name,
      address,
      email,
      phone,
    } = req.body;

    if (!name || !address || !email || !phone) {
      return res.status(400).json({
        message: "All store fields are required",
      });
    }

    const store = await Store.findOne();

    if (!store) {
      return res.status(404).json({
        message: "Store information not found",
      });
    }

    store.name = name;
    store.address = address;
    store.email = email;
    store.phone = phone;

    await store.save();

    return res.status(200).json({
      message: "Store information updated successfully",
      store,
    });
  } catch (error) {
    console.error("Update store error:", error);

    return res.status(500).json({
      message: "Error updating store information",
    });
  }
};