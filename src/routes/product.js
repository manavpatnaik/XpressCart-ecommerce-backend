const router = require("express").Router();
const { createProduct } = require("../controllers/product");
const requireAdmin = require("../middleware/requireAdmin");
const requireLogin = require("../middleware/requireLogin");
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/",
  requireLogin,
  requireAdmin,
  upload.array("productImage"),
  createProduct
);

module.exports = router;
