// ✅ Import Product Model - to interact with MongoDB products collection
import Product from "../Models/ProductModel.js";

// ✅ Import Custom Error Handler - to send proper error responses
import HandeleError from "../helper/handleError.js";

// ✅ Import API Helper - for search, filter, pagination features
import ApiHelper from "../helper/apiHelper.js";

// ❌ Removed: import { Cursor } from "mongoose" - not needed here


// ============================================================
// Create Product -- Admin
// POST http://localhost:8000/api/v1/product/new
// ============================================================
export const addproduct = async (req, res) => {
    try {
        // ✅ Create new product using request body data
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: "Product Added Successfully",
            product
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


// ============================================================
// Update Product -- Admin
// PUT http://localhost:8000/api/v1/product/:id
// ============================================================
export const updateproduct = async (req, res, next) => {
    try {
        const id = req.params.id;

        // ✅ Find product by ID and update with new data
        let product = await Product.findByIdAndUpdate(id, req.body, {
            new: true,           // return updated product
            runValidators: true, // run schema validators
            useFindAndModify: false, // use native findOneAndUpdate()
        });

        // ✅ If product not found, send 404 error
        if (!product) {
            return next(new HandeleError("Product Not Found", 404));
        }

        return res.status(200).json({
            success: true,
            product
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


// ============================================================
// Delete Single Product -- Admin
// DELETE http://localhost:8000/api/v1/product/:id
// ============================================================
export const deleteproduct = async (req, res, next) => {
    try {
        const id = req.params.id;

        // ✅ Find product by ID and delete it
        let product = await Product.findByIdAndDelete(id);

        // ✅ If product not found, send 404 error
        if (!product) {
            return next(new HandeleError("Product Not Found", 404));
        }

        return res.status(200).json({
            success: true,
            message: "Product Deleted Successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


// ============================================================
// Delete All Products -- Admin
// DELETE http://localhost:8000/api/v1/products/all
// ============================================================
export const deleteallproduct = async (req, res) => {
    try {
        // ✅ Delete all products from DB
        await Product.deleteMany();

        return res.status(200).json({
            success: true,
            message: "All Products Deleted Successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


// ============================================================
// Get All Products with Search, Filter, Pagination
// GET http://localhost:8000/api/v1/products?keyword=rice&page=1
// ============================================================
export const getallproduct = async (req, res) => {
    try {
        const resultsPerPage = 4; // ✅ Show 4 products per page

        // ✅ Step 1 - Apply search and filter
        const apihelper = new ApiHelper(Product.find(), req.query)
            .search()
            .filter();

        // ✅ Step 2 - Clone query to count total filtered products
        // (before pagination so we get full count not just per page)
        const filteredQuery = apihelper.query.clone();
        const productCount = await filteredQuery.countDocuments();

        // ✅ Step 3 - Calculate total pages
        const totalPages = Math.ceil(productCount / resultsPerPage);

        // ✅ Step 4 - Get current page from URL, default is 1
        const page = Number(req.query.page) || 1;

        // ✅ Step 5 - Check if requested page exists
        if (totalPages > 0 && page > totalPages) {
            return res.status(404).json({
                success: false,
                message: `Page ${page} does not exist. Total pages: ${totalPages}`
            });
        }

        // ✅ Step 6 - Apply pagination to query
        apihelper.pagination(resultsPerPage);

        // ✅ Step 7 - Execute final query with pagination
        const products = await apihelper.query;

        // ✅ Step 8 - Send response
        res.status(200).json({
            success: true,
            productCount,   // total products in DB after filter
            totalPages,     // total number of pages
            resultsPerPage, // products shown per page
            currentPage: page, // current page number
            products        // products for current page
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


// ============================================================
// Get Single Product by ID
// GET http://localhost:8000/api/v1/product/:id
// ============================================================
export const getsingleproduct = async (req, res, next) => {
    try {
        // ✅ Find product by ID from URL params
        const product = await Product.findById(req.params.id);

        // ✅ If product not found, send 404 error
        if (!product) {
            return next(new HandeleError("Product Not Found", 404));
        }

        return res.status(200).json({
            success: true,
            product
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};