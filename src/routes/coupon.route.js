import { Route, Router } from "express";
import { createCoupon, deleteCoupon, getAllCoupon, updateCoupon } from "../controllers/coupon.controller.js";
import { isloggedIn, authorize } from "../middlewares/auth.middleware.js";
import AuthRoles from "../utils/authRoles.js";

const router = Router()

router.post("/", isloggedIn, authorize(AuthRoles.ADMIN), createCoupon)
router.delete("/:id",  isloggedIn, authorize(AuthRoles.ADMIN, AuthRoles.MODERATOR), deleteCoupon)
router.put("/action/:id",  isloggedIn, authorize(AuthRoles.ADMIN, AuthRoles.MODERATOR), updateCoupon)
router.get("/",  isloggedIn, authorize(AuthRoles.ADMIN, AuthRoles.MODERATOR), getAllCoupon)




export default router;