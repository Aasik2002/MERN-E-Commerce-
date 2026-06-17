import express from "express";
import { roleBasedAccess, Verifyuser } from "../helper/userAuth.js";
import { CreateNewOrder, getOrderDetails, getAllOrderDetails, getAllOrderByAdmin, AdminDeleteOrders } from "../controller/orderContrller.js";

const router = express.Router();

router.route("/new/order").post(Verifyuser,CreateNewOrder);
router.route("/order/:id").get(Verifyuser,getOrderDetails);
router.route("/orders/users").get(Verifyuser,getAllOrderDetails);


//Admin
router.route("/admin/orders").get(Verifyuser, roleBasedAccess("admin"), getAllOrderByAdmin);
router.route("/admin/order/:id").delete(Verifyuser,roleBasedAccess("admin"),AdminDeleteOrders)
export default router;