const ErrorResponse = require("../utils/ErrorResponse");

const requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new ErrorResponse("Access Denied - Must be an Admin", 401));
  }
  next();
};

module.exports = requireAdmin;
