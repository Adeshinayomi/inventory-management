const express = require("express");

const router = express.Router();

const {
  registerStore,
  updateStore,
  getStoreInfo
} = require('../Controller/StoreController');

const authMiddleware = require("../Middleware/Auth");
const authorize= require("../Middleware/role.js").authorize;
const storeMiddleware = require("../Middleware/validatestore.js");
router.post('/register', registerStore);
router.put('/update', authMiddleware,authorize(["owner","storekeeper"]),storeMiddleware, updateStore);
router.get('/get-store', authMiddleware,authorize(["owner","storekeeper"]),storeMiddleware, getStoreInfo)
module.exports = router;