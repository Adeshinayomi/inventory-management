const express = require("express");

const router = express.Router();

const {
  registerStore,
  updateStore,
} = require('../Controller/StoreController');

const authMiddleware = require("../Middleware/Auth");
const authorize= require("../Middleware/role.js").authorize;

router.post('/register', registerStore);
router.put('/update', authMiddleware,authorize(["owner","storekeeper"]), updateStore);

module.exports = router;