const Order = require("../../models/Order");
const ProductReview = require("../../models/Review");
const Product = require("../../models/Product");

const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;

    const order = await Order.findOne({
      userId: userId,
      "cartItems.productId": productId,
      // orderStatus: "confirmed",
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "purchase product to review it",
      });
    }

    const existingReview = await ProductReview.findOne({ userId, productId });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed",
      });
    }

    const newReview = new ProductReview({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });
    await newReview.save();

    const reviews = await ProductReview.find({ productId });
    const totalReviews = reviews.length;
    const averageReview =
      reviews.reduce((sum, productReview) => {
        sum + productReview.reviewValue;
      }, 0) / totalReviews;

    await Product.findByIdAndUpdate(productId, {
      averageReview,
    });

    res.status(201).json({
      success: true,
      data: newReview,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

const getProductReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await ProductReview.find({ productId });

    if (!reviews) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

module.exports = { addProductReview, getProductReview };
