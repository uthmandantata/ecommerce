import Cart from "../models/Cart.js";
import Product from "../models/Product.js";






export const createAndAddCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { products } = req.body;

        if (!products || !Array.isArray(products) || products.length === 0) return res.status(400).json({ success: false, message: "All fields are required" });

        const productChecks = await Promise.all(
            products.map(async (item) => {
                if (!item.productId || !item.quantity) return false;
                const product = await Product.findById(item.productId);
                return product ? true : false;
            })
        );

        if (productChecks.includes(false)) {
            return res.status(404).json({ success: false, message: "One or more products are invalid" });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // Create a new cart if it doesn't exist
            cart = new Cart({
                userId,
                products: products.map(item => ({ productId: item.productId, quantity: item.quantity }))
            });
        } else {
            // Update existing cart
            products.forEach((item) => {
                const index = cart.products.findIndex(p => p.productId.toString() === item.productId);

                if (index > -1) {
                    // Product exists → adjust quantity
                    cart.products[index].quantity += item.quantity;

                    // If quantity <= 0 → remove product
                    if (cart.products[index].quantity <= 0) {
                        cart.products.splice(index, 1);
                    }
                } else {
                    // Product not in cart → add it if quantity > 0
                    if (item.quantity > 0) {
                        cart.products.push({ productId: item.productId, quantity: item.quantity });
                    }
                }
            });
        }

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            cart
        });

    } catch (error) {
        console.error("Error in updateCart Controller", error);
        return res.status(500).json({
            success: false,
            message: "Error updating cart"
        });
    }
}

export const removefromCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { products } = req.body;

        if (!products || !Array.isArray(products) || products.length === 0) return res.status(400).json({ success: false, message: "All fields are required" });

        const productChecks = await Promise.all(
            products.map(async (item) => {
                if (!item.productId || !item.quantity) return false;
                const product = await Product.findById(item.productId);
                return product ? true : false;
            })
        );

        if (productChecks.includes(false)) {
            return res.status(404).json({ success: false, message: "One or more products are invalid" });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) return res.status(404).json({ success: false, message: "Cart does not exist" });

        for (const item of products) {
            const index = cart.products.findIndex(p => p.productId.toString() === item.productId);

            if (index === -1) {
                return res.status(400).json({ success: false, message: `Product ${item.productId} not in cart` });
            }

            // Reduce quantity
            cart.products[index].quantity -= item.quantity;

            // Remove product if quantity <= 0
            if (cart.products[index].quantity <= 0) {
                cart.products.splice(index, 1);
            }
        }

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            cart
        });

    } catch (error) {
        console.error("Error in updateCart Controller", error);
        return res.status(500).json({
            success: false,
            message: "Error updating cart"
        });
    }
}

export const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).json({ success: false, message: "Cart does not exist!" })

        await Cart.findByIdAndDelete(cart._id);

        return res.status(200).json({
            success: true,
            message: "Cart cleared"
        })
    } catch (error) {
        console.log("Error in clearCart Controller", error)
        return res.status(500).json({
            success: true,
            message: "Error in clearCart Controller"
        });
    }
}
export const getCart = async (req, res) => {
    try {
        const userId = req.user;
        const myCart = await Cart.find({ userId: userId })
        return res.status(200).json({
            success: true,
            myCart: myCart
        })
    } catch (error) {
        console.log("Error in getCart Controller")
        return res.status(500).json({
            success: true,
            message: "Error in getCart Controller"
        });
    }
}
