const ErrorResponse = require("../utils/ErrorResponse");

const requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new ErrorResponse("Access Denied", 400));
  }
  next();
};

module.exports = requireAdmin;
