const mongoose = require("mongoose");
const route = require("express").Router();
const UserController = require("../Controller/UserController.js");

route.post("/create-user", UserController.createUser);
route.post("/login", UserController.loginUser);

module.exports = route;