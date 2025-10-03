import Product from '../models/Product.js'

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


export const createProduct = async (req, res) => {
    try {
        const { title, desc, categories, size, color, price } = req.body;

        if (!title || !desc || !categories || !size || !color || !price) {
            return res.status(401).json({
                success: false,
                message: "All fields should be filled"
            })
        }
        const productEists = await Product.findOne(title)
        if (productEists) return res.status(400).json({ success: false, message: "Product already exists" })
        const newProduct = new Product({
            title, desc, categories, size, color, price
        })

        await newProduct.save()
        return res.status(200).json({
            success: true,
            message: "Product Created Successfully!"
        });
    } catch (error) {
        console.log("Error in the createProduct Controller")
        return res.status(500).json({
            success: false,
            message: "Error in the createProduct Controller"
        });
    }
}


export const updateProduct = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: ""
        });
    } catch (error) {
        console.log("Error in the updateProduct Controller")
        return res.status(500).json({
            success: false,
            message: "Error in the updateProduct Controller"
        });
    }
}


export const deleteProduct = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: ""
        });
    } catch (error) {
        console.log("Error in the deleteProduct Controller")
        return res.status(500).json({
            success: false,
            message: "Error in the deleteProduct Controller"
        });
    }
}
