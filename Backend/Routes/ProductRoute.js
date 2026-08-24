const mongoose = require("mongoose");
const route = require("express").Router();
const ProductController = require("../Controller/ProductController.js");
const authenticateToken= require("../Middleware/Auth.js");
const upload = require("../Middleware/uploadIMage.js");
const authorize= require("../Middleware/role.js").authorize;

route.post("/create-product", authenticateToken,authorize(["owner"]), upload.single("image"), ProductController.createProduct);

route.get("/allProducts", authenticateToken, ProductController.getAllProducts);

route.get("/getProduct/:sku", authenticateToken, ProductController.getProductById);

route.put("/updateProduct/:sku", authenticateToken, authorize(["owner"]), ProductController.updateProduct);

route.get("/totalProducts", authenticateToken, ProductController.getTotalProducts);

route.get("/availableProducts", authenticateToken, ProductController.getAvailableProducts);

route.get("/unavailableProducts", authenticateToken, ProductController.getUnavailableProducts);

route.put("/updateProductAvailability/:sku", authenticateToken, authorize(["owner"]), ProductController.updateProductAvailability);

route.get("/getProducts/:category", authenticateToken, ProductController.getProductsByCategory);

route.delete("/deleteProduct/:sku", authenticateToken, authorize(["owner"]), ProductController.deleteProduct);
module.exports = route;