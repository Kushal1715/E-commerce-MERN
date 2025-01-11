const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

//add a product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    });
    await newlyCreatedProduct.save();

    return res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
      message: "product added successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

// fetch all products
const fetchProducts = async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

// edit a product
const editProduct = async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

//delete product
const deleteProduct = async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchProducts,
  editProduct,
  deleteProduct,
};
