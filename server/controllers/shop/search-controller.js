const Product = require("../../models/Product");

const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;
    if (!keyword || typeof keyword != "string") {
      return res.status(400).json({
        success: false,
        message: "please provide valid keyword",
      });
    }

    const regEx = new RegExp(keyword, "i");

    const searchQuery = {
      $or: [
        { title: regEx },
        { description: regEx },
        { category: regEx },
        { brand: regEx },
      ],
    };

    const searchProduct = await Product.find(searchQuery);
    res.status(200).json({
      success: true,
      data: searchProduct,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

module.exports = { searchProducts };
