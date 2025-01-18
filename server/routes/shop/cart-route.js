const express = require("express");
const { addToCart } = require("../../controllers/shop/cart-controllers");

const router = express.Router();

router.push("/add-to-cart", addToCart);

module.exports = router;
