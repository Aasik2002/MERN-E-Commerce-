import express from "express";
import {getallproduct,getsingleproduct,addproduct,updateproduct,deleteproduct,deleteallproduct} from "../controller/productController.js"
import { Verifyuser} from "../helper/userAuth.js";
import {roleBasedAccess} from "../helper/userAuth.js";
const router = express.Router();

router.route("/products").get(Verifyuser,getallproduct).post(Verifyuser,roleBasedAccess("admin"),addproduct).delete(Verifyuser,roleBasedAccess("admin"),deleteallproduct);

router.route("/product/:id").get(getsingleproduct).put(Verifyuser,roleBasedAccess("admin"),updateproduct).delete(Verifyuser,roleBasedAccess("admin"),deleteproduct);


export default router ;
