const route = require("express").Router();
const DashboardController = require("../Controller/DadhboardController.js");
const authenticateToken= require("../Middleware/Auth.js");
const authorize= require("../Middleware/role.js").authorize;

route.get("/stats", authenticateToken,authorize(['owner','admin']), DashboardController.getDashboardStats);

module.exports=route