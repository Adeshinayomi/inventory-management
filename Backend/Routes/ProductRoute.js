const mongoose = require("mongoose");
const route = require("express").Router();
const ProductController = require("../Controller/ProductController.js");
const authenticateToken= require("../Middleware/Auth.js");
const upload = require("../Middleware/uploadIMage.js");

route.post("/create-product", authenticateToken, upload.single("image"), ProductController.createProduct);


module.exports = route;