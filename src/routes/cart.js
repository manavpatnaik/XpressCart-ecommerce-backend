const router = require("express").Router();
const { addItemToCart } = require("../controllers/cart");
const requireLogin = require("../middleware/requireLogin");
const requireUser = require("../middleware/requireUser");

router.post("/", requireLogin, requireUser, addItemToCart);
// router.get("/", getCategories);

module.exports = router;
