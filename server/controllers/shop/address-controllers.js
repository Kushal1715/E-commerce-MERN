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
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "Please provide user id",
      });
    }

    const address = await Address.find({ userId });

    res.status(200).json({
      success: true,
      data: address,
    });
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
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        error: "Please provide user id and address id",
      });
    }

    const address = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      formData,
      { new: true }
    );

    if (!address) {
      return res.status(404).json({
        success: false,
        error: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "some error occured",
    });
  }
};

const deleteAddress = async (req, res) => {
  const { userId, addressId } = req.params;

  if (!userId || !addressId) {
    return res.status(400).json({
      success: false,
      error: "Please provide user id and address id",
    });
  }

  const address = await Address.findOneAndDelete({ _id: addressId, userId });

  if (!address) {
    return res.status(404).json({
      success: false,
      error: "Address not found",
    });
  }
  res.status(200).json({
    success: true,
    data: address,
  });
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
