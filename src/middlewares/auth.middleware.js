import User from   "../models/user.schema";
import  Jwt  from "jsonwebtoken";
import asyncHandler from "../service/asyncHandler.js";
import config from "../config.js";
import CustomError from "../utils/CustomError";



export const isloggedIn = asyncHandler(async(req, res, next) => {
    let token;
    
    if (req.cookies.token || (req.headers.authorization && req.headers.authorization.startwith("Bearer")) ) {
        token = req.cookies.token || req.headers.authorization.split(" ")[1]
        // token = "Bearer"
    }

    if (!token) {
        throw new CustomError("Not authorized to access this resource", 401)
    }


    try {
        const decodedJWTPayload = Jwt.verify(token, config.JWT_SECRET);

         req.user = await User.findById(decodedJWTPayload._id, "name, email role")
         next()

    } catch (error) {
        throw new CustomError("Not authorized to access this resourses", 401)
    }

})

export const authorize = (...requiredRoles) => asyncHandler( async (req, res, next) => 
{
    if (!requiredRoles.includes(req.user.role)) {
        throw new CustomError("You are not authorized to access this resourse")
    }
    next()
})