const express = require("express");
const {
  createOrder,
  getOrderByUser,
  getOrderDetails,
} = require("../../controllers/shop/order-controller");

const router = express.Router();

router.post("/create", createOrder);
router.get("/get/:userId", getOrderByUser);
router.get("/get-detail/:id", getOrderDetails);

module.exports = router;
