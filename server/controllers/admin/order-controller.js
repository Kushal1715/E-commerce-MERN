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

module.exports = {getAllOrders}