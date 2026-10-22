const route=require("express").Router();
const OrderController=require("../Controller/OrderController.js");
const authenticateToken= require("../Middleware/Auth.js");
const authorize= require("../Middleware/role.js").authorize;
const storeMiddleware = require("../Middleware/validatestore.js");

route.post("/create-order", authenticateToken, authorize(["owner","storekeeper"]), storeMiddleware, OrderController.createOrder);

route.get("/all-orders", authenticateToken, authorize(["owner","storekeeper"]), storeMiddleware, OrderController.getAllOrders);

route.get("/", authenticateToken, authorize(["owner","storekeeper"]), storeMiddleware, OrderController.getOrders);

route.get("/get-order/:orderId",authenticateToken,authorize(["owner","storekeeper"]),storeMiddleware,OrderController.getOrderById)

route.get("/stats",authenticateToken,authorize(["owner","storekeeper"]),storeMiddleware,OrderController.getOrdersStats)

route.get("/top-selling-category",authenticateToken,authorize(["owner","storekeeper"]),storeMiddleware,OrderController.getTopSellingCategories)

route.get("/monthly",authenticateToken,authorize(["owner","storekeeper"]),storeMiddleware,OrderController.getMonthlySales)

module.exports=route