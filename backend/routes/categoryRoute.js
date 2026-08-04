import express from "express";
import { 
    createCategory, 
    getAllCategories, 
    deleteCategory 
} from "../controller/categoryController.js";
import { Verifyuser, roleBasedAccess } from "../helper/userAuth.js";

const router = express.Router();

router.get("/categories", getAllCategories);
router.post("/admin/category/new", Verifyuser, roleBasedAccess("admin"), createCategory);
router.delete("/admin/category/:id", Verifyuser, roleBasedAccess("admin"), deleteCategory);

export default router;