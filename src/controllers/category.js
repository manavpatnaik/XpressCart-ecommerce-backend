const slugify = require("slugify");
const Category = require("../models/Category");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/asyncHandler");

exports.addCategory = asyncHandler(async (req, res, next) => {
  const cat = await Category.findOne({ name: req.body.name });
  if (cat) return next(new ErrorResponse("Category already exists", 400));

  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  const _category = new Category(categoryObj);
  const category = await _category.save();
  res.status(201).send({
    success: true,
    category,
  });
});

exports.getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).send(categories);
});
