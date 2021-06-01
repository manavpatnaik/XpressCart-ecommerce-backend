const asyncHandler = require("../middleware/asyncHandler");
const Product = require("../models/Product");
const shortId = require("shortid");

exports.createProduct = asyncHandler(async (req, res, next) => {
  res.status(200).json({ file: req.files, body: req.body });
});
