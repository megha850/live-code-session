import { Route, Router } from "express";
import { createCollection, deleteCollection, getAllCollection, updatedCollection } from "../controllers/collection.controller.js";
import { isloggedIn, authorize } from "../middlewares/auth.middleware.js";
import AuthRoles from "../utils/authRoles.js";
import router from "./coupon.route.js";
const router = Router()

router.post("/", isloggedIn, authorize(AuthRoles.ADMIN), createCollection)
router.put("/:id",isloggedIn, authorize(AuthRoles.ADMIN), createCollection)

// delete a single collection 
router.delete("/:id",isloggedIn, authorize(AuthRoles.ADMIN), deleteCollection)

// get all Collention
router.get("/", getAllCollection)