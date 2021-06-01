const asyncHandler = require("../middleware/asyncHandler");
const Cart = require("../models/Cart");
const ErrorResponse = require("../utils/ErrorResponse");

exports.addItemToCart = asyncHandler(async (req, res, next) => {
  // Update cart if it already exists
  const existingCart = await Cart.findOne({ user: req.user.id });
  if (existingCart) {
    // If cart item exists, update the quantity
    // Item.product is stored as object, convert to String first
    const addedItem = existingCart.cartItems.find(
      (item) => String(item.product) === req.body.cartItems[0].product
    );

    if (addedItem) {
      existingCart.cartItems = existingCart.cartItems.map((item) => {
        if (item == addedItem) {
          item.quantity++;
        }
        return item;
      });
      const cart = await existingCart.save();
      res.status(200).send({ cart });
    } else {
      existingCart.cartItems.push(...req.body.cartItems);
      const cart = await existingCart.save();
      res.status(200).send({ cart });
    }
  } else {
    const _cart = new Cart({
      user: req.user.id,
      cartItems: req.body.cartItems,
    });

    const cart = await _cart.save();
    res.status(201).send({ cart });
  }
});
