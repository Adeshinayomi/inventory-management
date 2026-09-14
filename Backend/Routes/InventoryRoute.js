const route = require("express").Router();
const InventoryController = require("../Controller/InventoryController.js");
const authenticateToken= require("../Middleware/Auth.js");
const authorize= require("../Middleware/role.js").authorize;

route.get("/low-stocks",authenticateToken,authorize(['admin','owner']), InventoryController.getLowStockProducts)
route.get("/stats", authenticateToken, authorize(['admin','owner']), InventoryController.getInventoryStats);

module.exports = route;