const route = require("express").Router();
const DashboardController = require("../Controller/DadhboardController.js");
const authenticateToken= require("../Middleware/Auth.js");
const authorize= require("../Middleware/role.js").authorize;
const storeMiddleware = require("../Middleware/validatestore.js");

route.get("/stats", authenticateToken,authorize(['owner','admin']), storeMiddleware, DashboardController.getDashboardStats);
route.post(
  "/cron/dashboard-snapshot",
  DashboardController.createDailyDashboardSnapshots
);


module.exports=route