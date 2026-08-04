import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide category name"],
      trim: true,
      unique: true,
      maxLength: [50, "Category name cannot exceed 50 characters"]
    },
    description: {
      type: String,
      trim: true
    },
    image: {
      public_id: {
        type: String
      },
      url: {
        type: String
      }
    }
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);