const addProductReview = async (req, res) => {
  try {
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

const getProductReview = async (req, res) => {
  try {
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

module.exports = { addProductReview, getProductReview };
