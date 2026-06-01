import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter product Name"],
    },
    description: {
        type: String,
        required: [true, "Please Enter product Description"],
    },
    price: {
        type: Number,
        required: [true, "Please Enter product Price"],
        maxLength: [7, "Price cannot exceed 8 characters"],
    },
    ratings: {
        type: Number,
        default: 0, 
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        }

    ],
    category: {
        type: String,
        required: [true, "Please Enter product Category"],
    },
    stock: {
        type: Number,
        required: [true, "Please Enter product Stock"],
        maxLength: [5, "Stock cannot exceed 5 characters"],
        default: 1,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

export default mongoose.model("Product", ProductSchema);