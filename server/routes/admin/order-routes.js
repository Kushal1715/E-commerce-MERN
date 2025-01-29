const express = require('express');
const { getAllOrders, getOrderDetails, updateOrderStatus } = require('../../controllers/admin/order-controller');

const router = express.Router()

router.get('/getorders', getAllOrders)
router.get('/getorder-detail/:id', getOrderDetails)
router.put('/update-status', updateOrderStatus)

module.exports = router;