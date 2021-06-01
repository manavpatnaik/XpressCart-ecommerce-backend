const asyncHandler = require("../middleware/asyncHandler");
const Product = require("../models/Product");
const slugify = require("slugify");

exports.createProduct = asyncHandler(async (req, res, next) => {
  const { name, price, description, category, quantity,  } = req.body;

  let productImages = [];
  if (req.files.length > 0) {
    productImages = req.files.map((file) => ({
      img: file.filename,
    }));
  }

  const _product = new Product({
    name,
    slug: slugify(name),
    price,
    description,
    quantity,
    productImages,
    category,
    createdBy: req.user.id,
  });

  const product = await _product.save();
  res.status(200).json({ product });
});
