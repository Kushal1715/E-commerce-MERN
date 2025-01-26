const Cart = require("../../models/Cart");
const Order = require("../../models/Order");
const User = require("../../models/User");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
    } = req.body;

    const findUser = await User.findById(userId);
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    const findCart = await Cart.findById(cartId);
    if (!findCart) {
      return res.status(404).json({
        success: false,
        message: "cart not found",
      });
    }

    const newOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "new order created successfully",
      data: newOrder._id,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

const getOrderByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const order = await Order.find({ userId });
    if (!order.length) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: false,
      message: "something went wrong",
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "order not found",
      });
    }

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

module.exports = { createOrder, getOrderByUser, getOrderDetails };
