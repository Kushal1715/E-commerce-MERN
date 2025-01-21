const express = require("express");
const {
  addAddress,
  fetchAddress,
  deleteAddress,
  editAddress,
} = require("../../controllers/shop/address-controllers");

const router = express.Router();

router.post("/add", addAddress);
router.get("/get/:userId", fetchAddress);
router.put("/update/:userId/:addressId", editAddress);
router.delete("/delete/:userId/:addressId", deleteAddress);

module.exports = router;
