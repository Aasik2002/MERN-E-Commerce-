import HandeleError from "../helper/handleError.js";
import Order from "../Models/orderModel.js";


//Create Orders
export const CreateNewOrder = async (req, res, next) => {
    const { ShippingAddress, orderItems, paymentInfo, itemPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    try {
        const order = await Order.create({
            ShippingAddress,
            orderItems,
            paymentInfo,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            user: req.user._id,
            paidAt: Date.now()
        });

        res.status(201).json({
            success: true,
            order,
        });
    } catch (error) {
        next(error);
    }
};

//get single Order Details
export const getOrderDetails = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate({ path: "user", select: "name email" });
        if (!order) {
            return next(new HandeleError("Order Not Found", 404));
        }
        return res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        next(error);
    }
};

//Get all order details for current user
export const getAllOrderDetails = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id });

        return res.status(200).json({
            success: true,
            orders,
        });
    } catch (error) {
        next(error);
    }
};

// Admin All Order
export const getAllOrderByAdmin = async (req, res, next) => {
    try {
        const orders = await Order.find().populate({
            path: "user",
            select: "name email"
        });

        if (!orders || orders.length === 0) {
            return next(new HandeleError("Order Not Found", 404));
        }

        let totalAmount = 0;

        orders.forEach((order) => {
            totalAmount += order.totalPrice;
        });

        res.status(200).json({
            success: true,
            totalAmount,
            orders,
        });

    } catch (error) {
        next(error);
    }
};

//Admin Delete Orders

export const AdminDeleteOrders= async(req,res,next) => {
    try {
    
        const order = await Order.findById(req.params.id);
        

        if (!order) {
            return next(new HandeleError("Order Not Found", 404));
        }
        if(order.orderStatus !== 'Delivered'){
            return next(new HandeleError("Thsi Order in Under processing and Cannot be deleted",404))
        }
        await Order.deleteOne({_id:req.params.id})
        return res.status(200).json({
            success: true,
            message: "Order Deleted Successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}