import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";



export const checkout = async (req, res) => {
    try {
        const { address } = req.body;
        const userId = req.user;
        const myCart = await Cart.findOne({ userId: userId })
        const products = myCart?.products

        if (!myCart) return res.status(404).json({ success: false, message: "Nothing in your cart!" });

        if (!address) return res.status(400).json({ success: false, message: "All fields are required!" });


        const productStock = await Promise.all(
            products.map(async (item) => {
                const product = await Product.findById(item.productId);
                // If product doesn't exist
                if (!product) return false;

                // If product exists but has no stock
                if (product.stock <= 0) return false;

                // If product exists and stock is available
                return true;
            })
        );
        if (productStock.includes(false)) {
            return res.status(404).json({ success: false, message: "One or more products are invalid or out of stock" });
        }

        let totalAmount = 0;
        for (let item of products) {
            const product = await Product.findById(item.productId);
            if (!product) continue
            totalAmount += product.price * item.quantity
        }

        const newOrder = new Order({ userId, products, amount: totalAmount, address })

        await newOrder.save()
        await Cart.findByIdAndDelete(myCart._id)

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

