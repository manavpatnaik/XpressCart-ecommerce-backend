const router = require("express").Router();
const { register } = require("../controllers/auth");

router.post("/register", register);

router.post("/login", (req, res, next) => {});

module.exports = router;
