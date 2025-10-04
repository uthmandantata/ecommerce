import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";



export const createOrder = async (req, res) => {
    try {
        const { products, amount, address } = req.body;
        const userId = req.user._id
        if (!products || !amount || !address) return res.status(400).json({ success: false, message: "All fields are required" });

        // ✅ Check if all products exist
        const productChecks = await Promise.all(
            products.map(async (item) => {
                const product = await Product.findById(item.productId);
                return product ? true : false;
            })

        );
        // If any product doesn't exist
        if (productChecks.includes(false)) {
            return res.status(404).json({
                success: false,
                message: "One or more products do not exist"
            });
        }
        const newOrder = new Order({ userId: userId, products, amount, address });

        await newOrder.save();
        return res.status(201).json({
            success: true,
            message: "Order created successfully",
            order: newOrder
        });
    } catch (error) {
        console.error("Error in createOrder:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create order"
        });
    }
};


export const getOrder = async (req, res) => {
    try {
        const allOrders = await Order.find();

        return res.status(201).json({
            success: true,
            orders: allOrders
        });
    } catch (error) {
        console.error("Error in getOrder:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to get orders"
        });
    }
};


export const getAnOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ success: false, message: "Order does not exisit" })

        return res.status(201).json({
            success: true,
            order: order
        });
    } catch (error) {
        console.error("Error in getAnOrder:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to get an order"
        });
    }
};


export const getMyOrder = async (req, res) => {
    try {
        const userId = req.user._id

        const myOrders = await Order.find({ userId })
        if (!myOrders) return res.status(404).json({ success: false, message: "Order does not exisit" })

        return res.status(201).json({
            success: true,
            order: myOrders
        });
    } catch (error) {
        console.error("Error in getMyOrder:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to get my order"
        });
    }
};


export const adminDashboard = async (req, res) => {
    try {
        // Get all orders
        const totalOrders = await Order.countDocuments();
        // Total revenue (only from completed orders)
        const revenueAgg = await Order.aggregate([
            { $match: { status: "completed" } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        const totalRevenue = revenueAgg[0]?.total || 0;

        const productsSold = await Order.aggregate([
            { $unwind: "$products" }, // break each order’s products array into individual docs
            {
                $group: {
                    _id: "$products.productId", // group by productId
                    totalQuantity: { $sum: "$products.quantity" } // sum the quantity
                }
            }
        ]);

        const totalProductsSoldAgg = await Order.aggregate([
            { $unwind: "$products" },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$products.quantity" }
                }
            }
        ]);

        const totalProductsSold = totalProductsSoldAgg[0]?.total || 0;


        const totalCustomers = (await Order.distinct("userId")).length;
        const totalUsers = await User.countDocuments();
        // Orders by status
        const pendingOrders = await Order.countDocuments({ status: "pending" });
        const completedOrders = await Order.countDocuments({ status: "completed" });

        return res.status(200).json({
            success: true,
            metrics: {
                totalRevenue,
                totalOrders,
                totalCustomers,
                totalUsers,
                pendingOrders,
                completedOrders,
                productsSold,
                totalProductsSold
            }
        });
    } catch (error) {
        console.log("Error in Admin Controller", error);
        res.status(500).json({ suucess: false, message: "Error in Admin Controller" })
    }

}