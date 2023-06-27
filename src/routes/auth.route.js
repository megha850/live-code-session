import {Router} from "express";
import {  getProfile, login, logout, signup, forgotPassword, resetPassword } from "../controllers/auth.controller.js"
import { isloggedIn } from "../middlewares/auth.middleware";
import AuthRoles from "../utils/authRoles";

const router = Router()


router.post("/signup", signUp)
router.post("/login", login)
router.get("/logout", logout)

router.get("password/forgot/", forgotPassword)
router.get("password/forgot/:token", resetPassword)

router.get("/profile", isloggedIn, getProfile)


export default router;