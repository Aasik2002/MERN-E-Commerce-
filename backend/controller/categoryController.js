import Category from "../Models/categoryModel.js";
import HandeleError from "../helper/handleError.js";
import asyncHandler from "../utils/asyncHandler.js";

// Create Category -- Admin
export const createCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.create(req.body);
    res.status(201).json({
        success: true,
        message: "Category Created Successfully",
        category,
    });
});

// Get All Categories -- Public
export const getAllCategories = asyncHandler(async (req, res, next) => {
    const categories = await Category.find();
    res.status(200).json({
        success: true,
        categories,
    });
});

// Delete Category -- Admin
export const deleteCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        return next(new HandeleError("Category Not Found", 404));
    }
    await category.deleteOne();
    res.status(200).json({
        success: true,
        message: "Category Deleted Successfully",
    });
});