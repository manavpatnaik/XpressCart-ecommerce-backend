const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/ErrorResponse");

const requireLogin = (req, res, next) => {
  if (!req.headers.authorization)
    return next(new ErrorResponse("Token missing from headers", 400));

  const token = req.headers.authorization.split(" ")[1];
  let user;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    next(new ErrorResponse("Invalid Token", 400));
  }

  req.user = user;
  next();
};

module.exports = requireLogin;
