const router = require("express").Router();
const {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");
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
router.put(
  "/changeParent",
  requireLogin,
  requireAdmin,
  updateCategory
);
router.delete("/", requireLogin, requireAdmin, deleteCategory);

module.exports = router;
