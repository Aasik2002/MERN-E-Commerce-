import express from "express";
import {getallproduct,getsingleproduct,addproduct,updateproduct,deleteproduct,deleteallproduct,createProductReview,viweproductreview, getAllProductByAdmin, adminDeleteReview} from "../controller/productController.js"
import { Verifyuser} from "../helper/userAuth.js";
import {roleBasedAccess} from "../helper/userAuth.js";
const router = express.Router();

/*
router.get("/products",getallproduct);
router.post("/products",addproduct);
router.get("/product/:id",getsingleproduct);
router.put("/product/:id",updateproduct);
router.delete("/product/:id",deleteproduct);
router.delete("/products",deleteallproduct);
*/

//User Side 
router.get("/products",getallproduct);
router.get("/product/:id",getsingleproduct);

//User review
router.put("/review",Verifyuser,createProductReview);

//Admin Side
router.post("/products",Verifyuser,roleBasedAccess("admin"),addproduct);
router.put("/product/:id",Verifyuser,roleBasedAccess("admin"),updateproduct);
router.delete("/product/:id",Verifyuser,roleBasedAccess("admin"),deleteproduct);
router.delete("/products",Verifyuser,roleBasedAccess("admin"),deleteallproduct);

//Adminview all products
router.route("/admin/reviews").get(Verifyuser,roleBasedAccess("admin"),viweproductreview).delete(Verifyuser,roleBasedAccess("admin"),adminDeleteReview);
router.route("/admin/products").get(Verifyuser,roleBasedAccess("admin"),getAllProductByAdmin);



export default router ;
