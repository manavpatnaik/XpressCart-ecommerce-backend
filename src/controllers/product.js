const asyncHandler = require("../middleware/asyncHandler");
const Product = require("../models/Product");
const Category = require("../models/Category");
const { createCategories } = require("./category");
const slugify = require("slugify");
const ErrorResponse = require("../utils/ErrorResponse");

exports.createProduct = asyncHandler(async (req, res, next) => {
  const { name, price, description, category, quantity } = req.body;

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

exports.getInitialData = asyncHandler(async (req, res, next) => {
  const categories = await Category.find();
  const products = await Product.find()
    .select("_id name price quantity description productImages category")
    .populate("category");
  const data = {
    categories: createCategories(categories),
    products,
  };
  res.status(200).send(data);
});

exports.getProductBySlug = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;
  const category = await Category.findOne({ slug }).select("_id");
  if (!category) next(new ErrorResponse("Product does not exist", 400));

  const products = await Product.find({ category: category._id });
  res.status(200).send({ products });
});
