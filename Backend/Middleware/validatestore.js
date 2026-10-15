const User = require("../Models/User.js");

const storeMiddleware = async (req, res, next) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const user = await User.findById(req.user.id).select("store");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    if (!user.store) {
      return res.status(403).json({
        message: "User is not assigned to a store",
      });
    }

    req.storeId = user.store;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = storeMiddleware;