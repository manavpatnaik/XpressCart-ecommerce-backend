const User = require("../models/User");

exports.register = async (req, res, next) => {
  const userEmail = await User.findOne({ email: req.body.email });
  if (userEmail)
    return res.status(400).send({ Error: "User already registered" });

  const userName = await User.findOne({ email: req.body.username });
  if (userName)
    return res.status(400).send({ Error: "User already registered" });

  const _user = new User(req.body);
  try {
    await _user.save();
    res
      .status(201)
      .send({ success: true, message: "User created Successfully" });
  } catch (err) {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .send({ Error: "Something went wrong, User not registered" });
    }
  }
};
