const ErrorResponse = require("../utils/ErrorResponse");

const requireUser = (req, res, next) => {
  if (req.user.role !== "user") {
    return next(new ErrorResponse("Access Denied - Must be a User", 400));
  }
  next();
};

module.exports = requireUser;
