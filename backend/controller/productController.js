// ✅ Import Product Model - to interact with MongoDB products collection
import Product from '../Models/ProductModel.js';

// ✅ Import Custom Error Handler - to send proper error responses
import HandeleError from "../helper/handleError.js";

// ✅ Import API Helper - for search, filter, pagination features
import ApiHelper from "../helper/apiHelper.js";

// ✅ Import Async Handler - to clean up try-catch blocks and handle async errors
import asyncHandler from "../utils/asyncHandler.js";

// ✅ Import Cloudinary for image management
import cloudinary from 'cloudinary';


// ============================================================
// Create Product -- Admin (with Cloudinary Image Support)
// POST http://localhost:5000/api/v1/products
// ============================================================
export const addproduct = asyncHandler(async (req, res, next) => {
    let images = [];
    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else if (Array.isArray(req.body.images)) {
        images = req.body.images;
    }

    const imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
        let imagePath = images[i];

        // If image format is an object containing a URL, extract it safely
        if (typeof imagePath === "object" && imagePath.url) {
            imagePath = imagePath.url;
        }

        if (typeof imagePath !== "string") {
            continue; 
        }

        const result = await cloudinary.v2.uploader.upload(imagePath, {
            folder: "products",
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    req.body.images = imagesLinks;
    
    if (req.user) {
        req.body.user = req.user.id;
    }

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        message: "Product Added Successfully",
        product
    });
});


// ============================================================
// Update Product -- Admin
// PUT http://localhost:5000/api/v1/product/:id
// ============================================================
export const updateproduct = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    let product = await Product.findById(id);
    if (!product) {
        return next(new HandeleError("Product Not Found", 404));
    }

    // ✅ Handle Image Update if new images are provided safely
    let images = [];
    if (req.body.images) {
        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        } else if (Array.isArray(req.body.images)) {
            images = req.body.images;
        }

        if (images.length > 0) {
            // If new images are sent, delete old images from Cloudinary
            for (let i = 0; i < product.images.length; i++) {
                if (product.images[i].public_id) {
                    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
                }
            }

            const imagesLinks = [];
            for (let i = 0; i < images.length; i++) {
                let imagePath = images[i];
                if (typeof imagePath === "object" && imagePath.url) {
                    imagePath = imagePath.url;
                }
                if (typeof imagePath !== "string") continue;

                const result = await cloudinary.v2.uploader.upload(imagePath, {
                    folder: "products",
                });
                imagesLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                });
            }
            req.body.images = imagesLinks;
        }
    }

    // ✅ Find product by ID and update with new data
    product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,              // return updated product
        runValidators: true,    // run schema validators
    });

    return res.status(200).json({
        success: true,
        product
    });
});


// ============================================================
// Delete Single Product -- Admin (with Cloudinary image cleanup)
// DELETE http://localhost:5000/api/v1/product/:id
// ============================================================
export const deleteproduct = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    let product = await Product.findById(id);
    if (!product) {
        return next(new HandeleError("Product Not Found", 404));
    }

    // ✅ Deleting images from Cloudinary
    for (let i = 0; i < product.images.length; i++) {
        if (product.images[i].public_id) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }
    }

    // ✅ Delete product from DB
    await product.deleteOne();

    return res.status(200).json({
        success: true,
        message: "Product Deleted Successfully"
    });
});


// ============================================================
// Delete All Products -- Admin
// DELETE http://localhost:5000/api/v1/products
// ============================================================
export const deleteallproduct = asyncHandler(async (req, res, next) => {
    const products = await Product.find();

    // Delete all images from Cloudinary
    for (let product of products) {
        for (let i = 0; i < product.images.length; i++) {
            if (product.images[i].public_id) {
                await cloudinary.v2.uploader.destroy(product.images[i].public_id);
            }
        }
    }

    // ✅ Delete all products from DB
    await Product.deleteMany();

    return res.status(200).json({
        success: true,
        message: "All Products Deleted Successfully"
    });
});


// ============================================================
// Get All Products with Search, Filter, Pagination
// GET http://localhost:5000/api/v1/products
// ============================================================
export const getallproduct = asyncHandler(async (req, res, next) => {
    // 🌟 FIXED: Changed from 4 to 50 so all your products load on the first page!
    const resultsPerPage = 50; 

    // ✅ Step 1 - Apply search and filter
    const apihelper = new ApiHelper(Product.find().populate('category', 'name'), req.query)
        .search()
        .filter();

    // ✅ Step 2 - Clone query to count total filtered products
    const filteredQuery = apihelper.query.clone();
    const productCount = await filteredQuery.countDocuments();

    // ✅ Step 3 - Calculate total pages
    const totalPages = Math.ceil(productCount / resultsPerPage);

    // ✅ Step 4 - Get current page from URL, default is 1
    const page = Number(req.query.page) || 1;

    // ✅ Step 5 - Check if requested page exists
    if (totalPages > 0 && page > totalPages) {
        return next(new HandeleError(`Page ${page} does not exist. Total pages: ${totalPages}`, 404));
    }

    // ✅ Step 6 - Apply pagination to query
    apihelper.pagination(resultsPerPage);

    // ✅ Step 7 - Execute final query with pagination
    const products = await apihelper.query;

    // ✅ Step 8 - Send response
    res.status(200).json({
        success: true,
        productCount,       // total products in DB after filter
        totalPages,        // total number of pages
        resultsPerPage,  // products shown per page
        currentPage: page, // current page number
        products         // products for current page
    });
});


// ============================================================
// Get Single Product by ID
// GET http://localhost:5000/api/v1/product/:id
// ============================================================
export const getsingleproduct = asyncHandler(async (req, res, next) => {
    // ✅ Find product by ID from URL params and populate category
    const product = await Product.findById(req.params.id).populate('category', 'name description');

    // ✅ If product not found, send 404 error
    if (!product) {
        return next(new HandeleError("Product Not Found", 404));
    }

    return res.status(200).json({
        success: true,
        product
    });
});


// ============================================================
// Create Product Review or Update Review
// ============================================================
export const createProductReview = asyncHandler(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);
    
    if (!product) {
        return next(new HandeleError("Product Not Found", 404));
    }

    const reviewExist = product.reviews.find((r) => r.user?.toString() === req.user._id?.toString());
    
    if (reviewExist) {
        // ✅ Update existing review
        product.reviews.forEach((review) => {
            if (review.user?.toString() === req.user._id?.toString()) {
                review.rating = Number(rating);
                review.comment = comment;
            }
        });
    } else {
        // ✅ Push new review into array
        product.reviews.push(review);
    }
    
    // ✅ Update number of reviews
    product.numOfReviews = product.reviews.length;

    // ✅ Update average rating
    let sum = 0;
    product.reviews.forEach((review) => {
        sum += review.rating;
    });
    
    product.ratings = product.reviews.length > 0 ? sum / product.reviews.length : 0;
    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Review Added/Updated Successfully",
    });
});


// ============================================================
// Admin View Product Reviews
// ============================================================
export const viweproductreview = asyncHandler(async (req, res, next) => {
    const productId = req.query.productId || req.query.id;

    if (!productId) {
        return next(new HandeleError("Product ID is required", 400));
    }

    const product = await Product.findById(productId);
    if (!product) {
        return next(new HandeleError("Product Not Found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
});


// ============================================================
// Admin View All Products
// ============================================================
export const getAllProductByAdmin = asyncHandler(async (req, res, next) => {
    const Products = await Product.find().populate('category', 'name');
    
    res.status(200).json({
        success: true,
        Products
    });
});


// ============================================================
// Delete Review -- Admin
// ============================================================
export const adminDeleteReview = asyncHandler(async (req, res, next) => {
    const productId = req.query?.productId || req.query?.product_id || req.body?.productId;
    const reviewId = req.query?.id || req.query?.reviewId || req.query?.review_id || req.body?.reviewId;

    if (!productId || !reviewId) {
        return next(new HandeleError("Product ID and Review ID are required", 400));
    }

    const product = await Product.findById(productId);
    if (!product) {
        return next(new HandeleError("Product Not Found", 404));
    }

    const reviewExists = product.reviews.some((review) => review._id.toString() === reviewId.toString());
    if (!reviewExists) {
        return next(new HandeleError("Review Not Found", 404));
    }

    const reviews = product.reviews.filter((review) => review._id.toString() !== reviewId.toString());
    const numOfReviews = reviews.length;
    const ratings = numOfReviews > 0 ? reviews.reduce((total, review) => total + review.rating, 0) / numOfReviews : 0;

    product.reviews = reviews;
    product.numOfReviews = numOfReviews;
    product.ratings = ratings;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Review Deleted Successfully"
    });
});