const router = require("express").Router();
const {
  createProduct,
  getProductBySlug,
  getInitialData,
} = require("../controllers/product");
const requireAdmin = require("../middleware/requireAdmin");
const requireLogin = require("../middleware/requireLogin");
const upload = require("../middleware/fileUpload");

router.post(
  "/",
  requireLogin,
  requireAdmin,
  upload.array("productImage"),
  createProduct
);
router.get('/initialData', getInitialData)
router.get("/:slug", getProductBySlug);

module.exports = router;
