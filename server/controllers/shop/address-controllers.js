const Address = require("../../models/Address");

const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !pincode || !phone) {
      return res.status(400).json({
        success: false,
        error: "Please provide all the details",
      });
    }

    const newAddress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });
    await newAddress.save();

    res.status(201).json({
      success: true,
      data: newAddress,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "some error occured",
    });
  }
};

const fetchAddress = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "some error occured",
    });
  }
};

const editAddress = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "some error occured",
    });
  }
};

const deleteAddress = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "some error occured",
    });
  }
};

module.exports = { addAddress, fetchAddress, editAddress, deleteAddress };
