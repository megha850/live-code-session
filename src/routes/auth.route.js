import {Router} from "express";
import { isloggedIn } from "../middlewares/auth.middleware";
import AuthRoles from "../utils/authRoles";

const router = Router()


router.post("/signup", signUp)
router.post("/login", login)
router.get("/logout", logout)

router.get("/profile", isloggedIn, getProfile)


export default router;