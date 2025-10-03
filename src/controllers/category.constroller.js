import Category from "../models/Category.js";


export const getCategory = async (req, res) => {
    try {

        return res.status(200).json({
            success: true,
            message: "Category added"
        });
    } catch (error) {
        console.log("Error in the getCategory Controller")
        return res.status(500).json({
            success: false,
            message: "Error in the getCategory Controller"
        });
    }
}

export const createCategory = async (req, res) => {
    const { name, color } = req.body;
    try {
        const categoryExist = await Category.findOne({ name });
        if (categoryExist) return res.status(401).json({ success: false, message: "Category Exisits" });

        const newCategory = new Category({ name, color, createdBy: req.user._id })
        await newCategory.save()

        return res.status(200).json({
            success: true,
            message: "Category added"
        });
    } catch (error) {
        console.log("Error in the createCategory Controller", error)
        return res.status(500).json({
            success: false,
            message: "Error in the createCategory Controller"
        });
    }
}

export const updateCategory = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Category updated"
        });
    } catch (error) {
        console.log("Error in the updateCategory Controller")
        return res.status(500).json({
            success: false,
            message: "Error in the updateCategory Controller"
        });
    }
}
export const deleteCategory = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Category deleted"
        });
    } catch (error) {
        console.log("Error in the deleteCategory Controller")
        return res.status(500).json({
            success: false,
            message: "Error in the deleteCategory Controller"
        });
    }
}