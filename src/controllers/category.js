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

exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { name, parentId } = req.body;
  if (!name) return next(new ErrorResponse("Nothing to update", 400));
  const updatedCategories = [];
  if (name instanceof Array) {
    for (let i = 0; i < name.length; i++) {
      const category = {
        name: name[i],
        slug: slugify(name[i]),
      };
      if (parentId[i]) {
        category.parentId = parentId[i];
      }

      const updatedCategory = await Category.findOneAndUpdate(
        { name: name[i] },
        category,
        { new: true }
      );
      updatedCategories.push(updatedCategory);
    }
    return res.status(200).send(updatedCategories);
  } else {
    const category = {
      name,
    };
    if (parentId) {
      category.parentId = parentId;
    }
    const updatedCategory = await Category.findOneAndUpdate(
      { name },
      category,
      { new: true }
    );
    res.status(200).send({ updatedCategory });
  }
});

exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { ids } = req.body;
  const deletedCategories = [];
  if (ids instanceof Array) {
    console.log(ids);
    for (let i = 0; i < ids.length; i++) {
      const category = await Category.findOneAndDelete({ _id: ids[i] });
      deletedCategories.push(category);
    }
  } else {
    const category = await Category.findOneAndDelete({ _id: ids });
    deletedCategories.push(category);
  }

  res.status(200).send({ deletedCategories });
});
