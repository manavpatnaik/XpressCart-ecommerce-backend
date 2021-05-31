const router = require("express").Router();
const { register, login } = require("../controllers/auth");
const requireLogin = require("../middleware/requireLogin");

router.post(
  "/register",
  register
);
router.post("/login", login);

router.post("/profile", requireLogin, (req, res, next) => {
  res.send({ user: req.user.id });
});

module.exports = router;
