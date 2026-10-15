const route = require("express").Router();
const InventoryController = require("../Controller/InventoryController.js");
const authenticateToken= require("../Middleware/Auth.js");
const authorize= require("../Middleware/role.js").authorize;
const storeMiddleware = require("../Middleware/validatestore.js");

route.get("/low-stocks",authenticateToken,authorize(['admin','owner']), storeMiddleware, InventoryController.getLowStockProducts)
route.get("/stats", authenticateToken, authorize(['admin','owner']), storeMiddleware, InventoryController.getInventoryStats);
route.post("/:sku/restock", authenticateToken, authorize(['admin','owner']), storeMiddleware, InventoryController.restockProduct);

module.exports = route;