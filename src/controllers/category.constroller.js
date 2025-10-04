import Category from "../models/Category.js";


export const getCategory = async (req, res) => {
    try {
        const allCategories = await Category.find();
        return res.status(200).json({
            success: true,
            categories: allCategories
        });
    } catch (error) {
        console.log("Error in the getCategory Controller")
        return res.status(500).json({
            success: false,
            message: "Error in the getCategory Controller"
        });
    }
}


export const getACategory = async (req, res) => {
    try {
        const categoryId = req.params.id
        const category = await Category.findById(categoryId);
        if(!category) return res.status(404).json({success:false, })
        return res.status(200).json({
            success: true,
            categories: allCategories
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
        const { name, color } = req.body;
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId);
        // if (category) return res.status(401).json({ success: false, message: "Category exisits!" })
        if (name) category.name = name;
        if (color) category.color = color

        await category.save();


        return res.status(200).json({
            success: true,
            message: "Category updated",
            category: category
        });
    } catch (error) {
        console.log("Error in the updateCategory Controller", error)
        // ✅ Duplicate key error handler
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: `Duplicate value for field: ${Object.keys(error.keyPattern)[0]} - "${Object.values(error.keyValue)[0]}" already exists`
            });
        }
        return res.status(500).json({
            success: false,
            message: "Error in the updateCategory Controller"
        });
    }
}
export const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        const category = await Category.findById(categoryId)
        if (!category) return res.status(404).json({ success: false, message: "Could not find Category" })

        await Category.findByIdAndDelete(categoryId);
        return res.status(200).json({
            success: true,
            message: "Category deleted successfully",
            deletedCategory: {
                _id: category._id,
                name: category.name,
                color: category.color
            }
        });
    } catch (error) {
        console.error("Error in deleteCategory Controller:", error);
        return res.status(500).json({
            success: false,
            message: "Error in the deleteCategory Controller"
        });
    }
};