const route = require("express").Router();
const ProductController = require("../Controller/ProductController.js");
const authenticateToken= require("../Middleware/Auth.js");
const upload = require("../Middleware/uploadIMage.js");
const authorize= require("../Middleware/role.js").authorize;

route.post("/importProducts", authenticateToken,authorize(["owner"]), upload.single("image"), ProductController.importDefaultProducts);


route.post("/create", authenticateToken,authorize(["owner"]), upload.single("image"), ProductController.createProduct);

route.get("/all-products", authenticateToken, ProductController.getAllProducts);

route.get("/get-product/:sku", authenticateToken, ProductController.getProductById);

route.get("/categories", authenticateToken, ProductController.getAllCategories);

route.put("/update/:sku", authenticateToken, authorize(["owner"]), ProductController.updateProduct);

route.delete("/delete/:sku", authenticateToken, authorize(["owner"]), ProductController.deleteProduct);


module.exports = route;