const route = require("express").Router();
const ProductController = require("../Controller/ProductController.js");
const authenticateToken= require("../Middleware/Auth.js");
const upload = require("../Middleware/uploadIMage.js");
const authorize= require("../Middleware/role.js").authorize;
const storeMiddleware = require("../Middleware/validatestore.js");


route.post("/importProducts", authenticateToken,authorize(["owner"]), upload.single("image"), ProductController.importDefaultProducts);

route.post("/create", authenticateToken,authorize(["owner"]),storeMiddleware, upload.single("image"), ProductController.createProduct);

route.get("/all-products", authenticateToken, storeMiddleware, ProductController.getAllProducts);

route.get("/get-product/:sku", authenticateToken, storeMiddleware, ProductController.getProductById);

route.get("/categories", authenticateToken, storeMiddleware, ProductController.getAllCategories);

route.put("/update/:sku", authenticateToken, authorize(["owner"]), storeMiddleware, ProductController.updateProduct);

route.delete("/delete/:sku", authenticateToken, authorize(["owner"]), storeMiddleware, ProductController.deleteProduct);


module.exports = route;