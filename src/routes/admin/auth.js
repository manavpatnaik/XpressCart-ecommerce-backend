const router = require("express").Router();
const { register, login, logout } = require("../../controllers/admin/auth");
const requireLogin = require("../../middleware/requireLogin");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", requireLogin, logout);

router.post("/profile", requireLogin, (req, res, next) => {
  res.send({ user: req.user.id });
});

module.exports = router;
