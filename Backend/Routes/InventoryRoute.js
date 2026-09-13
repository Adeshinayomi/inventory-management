const route = require("express").Router();
const InventoryController = require("../Controller/InventoryController.js");
const authenticateToken= require("../Middleware/Auth.js");
const authorize= require("../Middleware/role.js").authorize;

route.get("/inventory-stats", authenticateToken, authorize(['admin,owner']), InventoryController.getInventoryStats);

module.exports = route;