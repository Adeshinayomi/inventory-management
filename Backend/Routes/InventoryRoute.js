const mongoose = require("mongoose");
const route = require("express").Router();
const InventoryController = require("../Controller/InventoryController.js");
const authenticateToken= require("../Middleware/Auth.js");
const authorize= require("../Middleware/role.js").authorize;


route.get("/inventoryValue", authenticateToken, InventoryController.getInventoryValue);
route.get("/totalStock", authenticateToken, InventoryController.getTotalStock);
route.get("/lowStock", authenticateToken, InventoryController.getLowStockProducts);
route.get("/outOfStock", authenticateToken, InventoryController.getOutOfStockProducts);

module.exports = route;