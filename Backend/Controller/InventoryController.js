const Inventory = require("../Models/Product.js");

exports.getLowStockProducts = async (req, res) => {
    try {
        const products = await Inventory.find({
            $expr: {
                $lte: ["$stock", "$threshold"]
            }
        });

        res.status(200).json({
            products
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getOutOfStockProducts = async (req, res) => {
    try {
        const products = await Inventory.find({
            stock: 0
        });

        res.status(200).json({
            products
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
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
                            $multiply: ["$price", "$stock"]
                        }
                    }
                }
            }
        ]);

        res.status(200).json({
            totalInventoryValue: result[0]?.totalInventoryValue || 0
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getTotalStock= async (req, res) => {
    try {
        const result = await Inventory.aggregate([
            {
                $group: {
                    _id: null,
                    totalStock: {
                        $sum: "$stock"
                    }
                }
            }
        ]);

        res.status(200).json({
            totalStock: result[0]?.totalStock || 0
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
