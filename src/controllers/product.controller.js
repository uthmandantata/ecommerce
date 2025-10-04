import Product from '../models/Product.js'
import Category from '../models/Category.js'
import mongoose from 'mongoose';

export const getProduct = async (req, res) => {
    try {
        const products = await Product.find()
        return res.status(200).json({
            success: true,
            product: products
        });
    } catch (error) {
        console.log("Error in the getProduct Controller")
        return res.status(500).json({
            success: false,
            message: "Error in the getProduct Controller"
        });
    }
}

export const getAProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        // Check if it's a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID format",
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            product: product
        });
    } catch (error) {
        console.error("Error in the getAProduct Controller:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}


export const createProduct = async (req, res) => {
    try {
        const { title, desc, category, size, price } = req.body;

        if (!title || !desc || !category || !size || !price) {
            return res.status(401).json({
                success: false,
                message: "All fields should be filled"
            });
        }
        const productExists = await Product.findOne({ title })
        if (productExists) return res.status(400).json({ success: false, message: "Product already exists" })

        const categoryName = await Category.findOne({ name: category })
        if (!categoryName) return res.status(404).json({ success: false, message: "Category does not exisit" })
        const categoryId = categoryName._id

        const newProduct = new Product({
            title, desc, category: categoryId, size, price, createdBy: req.user.id
        })

        await newProduct.save()
        return res.status(200).json({
            success: true,
            message: "Product Created Successfully!"
        });
    } catch (error) {
        console.log("Error in the createProduct Controller", error)
        return res.status(500).json({
            success: false,
            message: "Error in the createProduct Controller"
        });
    }
}


export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const { title, desc, category, size, price } = req.body;
        const productExist = await Product.findById(productId);
        const categoryDoc = await Category.findOne({ name: category });
        if (!categoryDoc) {
            return res.status(404).json({
                success: false,
                message: "Category not found!"
            });
        }

        const categoryId = categoryDoc._id

        if (!title || !desc || !category || !size || !price) {
            return res.status(401).json({
                success: false,
                message: "All fields should be filled"
            });
        }
        if (!productExist) {
            return res.status(404).json({ success: false, message: "Product does not exist!" })
        }
        if (title) productExist.title = title;
        if (desc) productExist.desc = desc;
        if (category) productExist.category = categoryId;
        if (size) productExist.size = size;
        if (price) productExist.price = price;

        await productExist.save();

        return res.status(200).json({
            success: true,
            message: "Product Updated",
            product: productExist
        });
    } catch (error) {
        console.log("Error in the updateProduct Controller", error)
        return res.status(500).json({
            success: false,
            message: "Error in the updateProduct Controller"
        });
    }
}


export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const productExist = await Product.findById(productId);
        if (!productExist) return res.status(404).json({ success: false, message: "Product does not exist!" });
        await Product.findByIdAndDelete(productId);
        return res.status(200).json({
            success: true,
            message: "Product was deleted"
        });
    } catch (error) {
        console.log("Error in the deleteProduct Controller")
        return res.status(500).json({
            success: false,
            message: "Error in the deleteProduct Controller"
        });
    }
}
