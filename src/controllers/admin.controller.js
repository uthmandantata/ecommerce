import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

export const dashboard = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();
        const pendingOrders = await Order.countDocuments({ status: "pending" });
        const deliveredOrders = await Order.countDocuments({ status: "delivered" });

        const revenue = await Order.aggregate([
            { $match: { status: "delivered" } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const totalRevenue = revenue[0]?.total || 0;
        const topSellingProducts = await Order.aggregate([
            { $match: { status: "delivered" } },
            { $unwind: "$products" },
            {
                $group: {
                    _id: "$products.productId",
                    totalSold: {
                        $sum: "$products.quantity"
                    }
                }
            },
            { $sort: { totalSold: -1 } },
            { $limit: 1 },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "product"
                }
            },
            { $unwind: "$product" }
        ]);


        const totalCustomers = (await Order.distinct("userId")).length


        return res.status(200).json({
            success: true,
            metrics: {
                totalUsers,
                totalCustomers,

                totalProducts,


                totalOrders,
                pendingOrders,
                deliveredOrders,


                totalRevenue,

                topSellingProducts
            }
        });
    } catch (error) {
        console.log("Error in Admin Controller", error);
        res.status(500).json({ suucess: false, message: "Error in Admin Controller" })
    }

}

export const createAdmin = async (req, res) => {
    try {
        const userId = req.params.id
        const { isAdmin } = req.body;
        if (!isAdmin) return res.status(404).json({ success: false, message: "All fields are required" });
        const userExist = await User.findById(userId);
        if (!userExist) return res.status(404).json({ success: false, message: "User does not exsist!" });
        if (userExist.isAdmin === true) return res.status(400).json({ success: false, message: "User is already an admin" });

        userExist.isAdmin = true;
        await userExist.save();

        return res.status(200).json({
            success: true,
            message: "Admin created",
            admin: userExist.username
        });
    } catch (error) {
        console.log("Error in createAdmin Controller", error);
        res.status(500).json({ suucess: false, message: "Error in createAdmin Controller" })
    }

}