const route=require("express").Router();
const OrderController=require("../Controller/OrderController.js");
const authenticateToken= require("../Middleware/Auth.js");
const authorize= require("../Middleware/role.js").authorize;

route.post("/create-order", authenticateToken, authorize(["owner","storekeeper"]), OrderController.createOrder);

route.get("/all-orders", authenticateToken, authorize(["owner","storekeeper"]), OrderController.getAllOrders);

route.get("/", authenticateToken, authorize(["owner","storekeeper"]), OrderController.getOrders);

route.get("/get-order/:orderId",authenticateToken,authorize(["owner","storekeeper"]),OrderController.getOrderById)

route.get("/stats",authenticateToken,authorize(["owner","storekeeper"]),OrderController.getSalesStats)

route.get("/top-selling-category",authenticateToken,authorize(["owner","storekeeper"]),OrderController.getTopSellingCategories)

route.get("/monthly",authenticateToken,authorize(["owner","storekeeper"]),OrderController.getMonthlySales)

module.exports=route