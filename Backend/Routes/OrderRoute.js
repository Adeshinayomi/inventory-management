const mongoose=require("mongoose");
const route=require("express").Router();
const OrderController=require("../Controller/OrderController.js");
const authenticateToken= require("../Middleware/Auth.js");
const authorize= require("../Middleware/role.js").authorize;

route.post("/createOrder", authenticateToken, authorize(["owner","storekeeper"]), OrderController.createOrder);
route.get("/allOrders", authenticateToken, authorize(["owner","storekeeper"]), OrderController.getAllOrders);
route.get("/getOrder/:orderId",authenticateToken,authorize(["owner","storekeeper"]),OrderController.getOrderById)
route.get("/totalProductsSold", authenticateToken, authorize(["owner","storekeeper"]), OrderController.getTotalProductsSold);
route.get("/totalSales", authenticateToken, authorize(["owner","storekeeper"]), OrderController.getTotalSales);
route.get("/totalOrders",authenticateToken, authorize(["owner","storekeeper"]), OrderController.getTotalOrders)
route.get("/topSellingCategory",authenticateToken,authorize(["owner","storekeeper"]),OrderController.getTopSellingCategory)

module.exports=route