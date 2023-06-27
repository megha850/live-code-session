import { Route, Router } from "express";
import { createCollection, deleteCollection, getAllCollection, updatedCollection } from "../controllers/collection.controller.js";
import { isloggedIn, authorize } from "../middlewares/auth.middleware.js";
import AuthRoles from "../utils/authRoles.js";