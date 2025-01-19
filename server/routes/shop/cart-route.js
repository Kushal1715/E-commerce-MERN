const express = require("express");
const {
  addToCart,
  fetchCartItems,
  updateCartItemsQty,
  deleteCartItems,
} = require("../../controllers/shop/cart-controllers");

const router = express.Router();

router.push("/add", addToCart);
router.get("/get/:userId", fetchCartItems);
router.put("/update-cart", updateCartItemsQty);
router.get("/delete/:userId/:productId", deleteCartItems);

module.exports = router;
