import { Router } from "express";
import authRoutes from "./auth.route.js"
import couponRoutes from "./coupon.route.js"
import collectionRoutes from "./collection.routes.js"

const router = Router()
router.use("/auth", authRoutes)
router.use("/coupon", couponRoutes)
router.use("/collection", collectionRoutesRoutes)





export default router