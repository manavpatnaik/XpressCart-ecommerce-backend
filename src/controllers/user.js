const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");

exports.register = async (req, res, next) => {
  const userEmail = await User.findOne({ email: req.body.email });
  if (userEmail) return next(new ErrorResponse("User already registered", 400));

  const userName = await User.findOne({ email: req.body.username });
  if (userName) return next(new ErrorResponse("User already registered", 400));

  const _user = new User(req.body);
  try {
    await _user.save();
    res
      .status(201)
      .send({ success: true, message: "User created Successfully" });
  } catch (err) {
    next("Something went wrong, User could not be registered", 500);
  }
};
