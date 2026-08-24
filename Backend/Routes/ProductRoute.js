const mongoose = require("mongoose");
const route = require("express").Router();
const ProductController = require("../Controller/ProductController.js");
const authenticateToken= require("../Middleware/Auth.js");
const upload = require("../Middleware/uploadIMage.js");
const authorize= require("../Middleware/role.js").authorize;

route.post("/create-product", authenticateToken,authorize(["owner"]), upload.single("image"), ProductController.createProduct);

route.get("/getproducts", authenticateToken, ProductController.getAllProducts);
route.get("/getproduct/:sku", authenticateToken, ProductController.getProductById);
route.put("/restock/:sku", authenticateToken, authorize(["owner"]), ProductController.restockProduct);
route.put("/updateproduct/:sku", authenticateToken, authorize(["owner"]), ProductController.updateProduct);
route.get("/gettotalProducts", authenticateToken, ProductController.getTotalProducts);
route.get("/getlow-stock", authenticateToken, ProductController.getLowStockProducts);
route.get("/getavailableProducts", authenticateToken, ProductController.getAvailableProducts);
route.get("/getunavailableProducts", authenticateToken, ProductController.getUnavailableProducts);
route.put("/updateproductavailability/:sku", authenticateToken, authorize(["owner"]), ProductController.updateProductAvailability);
route.get("/getproductsbycategory/:category", authenticateToken, ProductController.getProductsByCategory);
route.get("/gettotalInventoryValue", authenticateToken, ProductController.getTotalInventoryValue);
route.delete("/deleteproduct/:sku", authenticateToken, authorize(["owner"]), ProductController.deleteProduct);
module.exports = route;