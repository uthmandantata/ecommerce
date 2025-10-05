import Cart from "../models/Cart.js";
import Product from "../models/Product.js";





export const createCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId, quantity } = req.body;

        if (!productId || !quantity) return res.status(400).json({ success: false, message: "All fields are required" });

        const productExists = await Product.findById(productId);
        if (!productExists) return res.status(404).json({ success: false, message: "Product not found" });

        // If any product doesn't exist
        if (productChecks.includes(false)) {
            return res.status(404).json({
                success: false,
                message: "One or more products do not exist"
            });
        }
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId: userId, products: [{ productId, quantity }] });
        } else {
            // ✅ Cart exists → check if product already inside
            const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

            if (productIndex > -1) {
                // ✅ Product already in cart → update quantity
                cart.products[productIndex].quantity += quantity || 1;
            } else {
                // ✅ Product not in cart → add new
                cart.products.push({ productId, quantity });
            }
        }

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Cart created!",
            cart
        })
    } catch (error) {
        console.log("Error in createCart Controller", error)
        return res.status(500).json({
            success: true,
            message: "Error in  createCart Controller"
        });
    }
}

export const deleteCartProduct = async (req, res) => {
    try {
        return res.status(200).json({
            success: true
        })
    } catch (error) {
        console.log("Error in deleteCartProduct Controller")
        return res.status(500).json({
            success: true,
            message: "Error in deleteCartProduct Controller"
        });
    }
}

export const clearCart = async (req, res) => {
    try {
        return res.status(200).json({
            success: true
        })
    } catch (error) {
        console.log("Error in clearCart Controller")
        return res.status(500).json({
            success: true,
            message: "Error in clearCart Controller"
        });
    }
}
export const getCart = async (req, res) => {
    try {
        return res.status(200).json({
            success: true
        })
    } catch (error) {
        console.log("Error in clearCart Controller")
        return res.status(500).json({
            success: true,
            message: "Error in clearCart Controller"
        });
    }
}
export const updateCart = async (req, res) => {
    try {
        return res.status(200).json({
            success: true
        })
    } catch (error) {
        console.log("Error in clearCart Controller")
        return res.status(500).json({
            success: true,
            message: "Error in clearCart Controller"
        });
    }
}