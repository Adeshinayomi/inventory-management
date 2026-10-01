const express = require("express");

const router = express.Router();

const {
  getStore,
  updateStore,
  createStore
} = require('../Controller/StoreController');

const authMiddleware = require("../Middleware/Auth");
const authorize= require("../Middleware/role.js").authorize;

router.post("/", authMiddleware,authorize(["owner","storekeeper"]), createStore);
router.get("/", authMiddleware,authorize(["owner","storekeeper"]), getStore);

router.put("/", authMiddleware,authorize(["owner","storekeeper"]), updateStore);

module.exports = router;