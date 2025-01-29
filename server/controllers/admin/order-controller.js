const Order = require("../../models/Order");

const getAllOrders = async (req,res) => {
    try{
        const orders = await Order.find({});

        if(orders.length <= 0){
            return res.status(404).json({
                success: false,
                message: 'orders not found'
            })
        }

        res.status(201).json({
            success: true,
            data: orders
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'something went wrong'
        })
    }
}

const getOrderDetails = async (req,res) =>{
    try{
        const {id} = req.params;
        const order = await Order.findById(id);
        if(!order){
            return res.status(404).json({
                success: false,
                message: 'order not found'
            })
        }

        res.status(201).json({
            success: true,
            data: order
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'something went wrong'
        })
    }
}


const updateOrderStatus = async (req,res) => {
    try{
        const {orderStatus} = req.body;
        const {id} = req.params;

        const findOrder = await Order.findById(id);

        if(!findOrder){
            return res.status(404).json({
                success: false,
                message: 'order not found'
            })
        }

        const updateStatus = await Order.findByIdAndUpdate(id, {orderStatus})

        if(!updateStatus){
            return res.status(400).json({
                success:false,
                message: 'failed to update status'
            })
        }

        res.status(201).json({
            success: true,
            message: 'order status updated successfully'
        })
    }catch(e){
        return res.status(500).json({
            success: false,
            message: 'something went wrong'
        })
    }
}

module.exports = {getAllOrders, getOrderDetails, updateOrderStatus}