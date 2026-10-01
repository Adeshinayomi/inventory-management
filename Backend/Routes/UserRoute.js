const route = require("express").Router();
const UserController = require("../Controller/UserController.js");
const authenticateToken= require("../Middleware/Auth.js");

route.post("/create-user", UserController.createUser);
route.post("/login", UserController.loginUser);
route.put("/update-user",authenticateToken, UserController.updateUser);
route.put("/change-password", authenticateToken, UserController.changePassword);

module.exports = route;