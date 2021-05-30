const router = require("express").Router();
const { register } = require("../controllers/user");

router.post("/register", register);

router.post("/login", (req, res, next) => {});

module.exports = router;
