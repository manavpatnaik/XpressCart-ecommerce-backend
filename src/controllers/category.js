const slugify = require("slugify");
const Category = require("../models/Category");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/asyncHandler");

const createCategories = (categories, parentId = null) => {
  let nestedCategories = [];
  let category;

  // Creating levels of categories based in parentId
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == null);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (cat of category) {
    nestedCategories.push({
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
      children: createCategories(categories, cat._id),
    });
  }

  return nestedCategories;
};

exports.addCategory = asyncHandler(async (req, res, next) => {
  const cat = await Category.findOne({ name: req.body.name });
  if (cat) return next(new ErrorResponse("Category already exists", 400));

  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };

  if (req.file) {
    categoryObj.categoryImage =
      process.env.API + "/public/" + req.file.filename;
  }

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

  // Create nested Structure
  const nestedCategories = createCategories(categories);
  res.status(200).send(nestedCategories);
  // res.status(200).send(categories);
});

exports.createCategories = createCategories;
