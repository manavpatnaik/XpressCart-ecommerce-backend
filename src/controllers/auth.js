const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../middleware/asyncHandler");

exports.register = asyncHandler(async (req, res, next) => {
  const userEmail = await User.findOne({ email: req.body.email });
  if (userEmail)
    return next(new ErrorResponse("Email already registered", 400));

  const userName = await User.findOne({ username: req.body.username });
  if (userName)
    return next(new ErrorResponse("Username already registered", 400));

  const _user = new User(req.body);
  await _user.save();
  res.status(201).send({ success: true, message: "User created Successfully" });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return next(new ErrorResponse("User not registered", 400));

  if (!(await user.authenticate(password)))
    return next(new ErrorResponse("Invalid Password", 400));

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );

  const { _id, fullName, username, role } = user;

  res.status(200).send({
    token,
    user: { _id, fullName, username, email, role },
  });
});
