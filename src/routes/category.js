const router = require("express").Router();
const { addCategory, getCategories } = require("../controllers/category");
const requireAdmin = require("../middleware/requireAdmin");
const requireLogin = require("../middleware/requireLogin");

router.post("/", requireLogin, requireAdmin, addCategory);
router.get("/", getCategories);

module.exports = router;
