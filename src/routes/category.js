const router = require("express").Router();
const { addCategory, getCategories } = require("../controllers/category");
const requireAdmin = require("../middleware/requireAdmin");
const requireLogin = require("../middleware/requireLogin");
const upload = require("../middleware/fileUpload");

router.post(
  "/",
  requireLogin,
  requireAdmin,
  upload.single("categoryImage"),
  addCategory
);
router.get("/", getCategories);

module.exports = router;
