const route = require("express").Router();
const PurchaseController=require('../Controller/PurchaseController.js')
const authenticateToken= require("../Middleware/Auth.js");
const authorize= require("../Middleware/role.js").authorize;

route.post("/restock",authenticateToken, authorize(["owner","storekeeper"]), PurchaseController.createPurchase)

module.exports=route