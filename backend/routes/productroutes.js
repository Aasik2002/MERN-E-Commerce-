import express from "express";
import {getallproduct,getsingleproduct,addproduct,updateproduct,deleteproduct,deleteallproduct} from "../controller/productController.js"
const router = express.Router();

router.route("/products").get(getallproduct).post(addproduct).delete(deleteallproduct);

router.route("/product/:id").get(getsingleproduct).put(updateproduct).delete(deleteproduct);


export default router ;
