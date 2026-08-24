const mongoose = require("mongoose");
const route = require("express").Router();
const ProductController = require("../Controller/ProductController.js");
const authenticateToken= require("../Middleware/Auth.js");
const upload = require("../Middleware/uploadIMage.js");
const authorize= require("../Middleware/role.js").authorize;

route.post("/create-product", authenticateToken,authorize(["owner"]), upload.single("image"), ProductController.createProduct);


module.exports = route;