const router = require("express").Router();
const { createProduct } = require("../controllers/product");
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

module.exports = router;
