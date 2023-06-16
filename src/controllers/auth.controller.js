// signup a new user
import user from "../models/user.schema.js"

import asyncHandler from "../service/asyncHandler";
import CustomError from "../utils/CustomError";

export const cookieOptions = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true
}

export const signup = asyncHandler(async(req, res) => {
    // get data from user
    const {name, email, password} = req.body

    //  validation
    if(!name || !email || !password) {
        throw new CustomError("Please add all fileds", 400)
        // throw new error("Got an error")
    }

    //  lets add data to database
    // check the user is exists
    const existinguser = await existinguser.findOne({email})
    if(existinguser) {
        throw new CustomError("User already exists", 400)
    }
    const user = await user.create({
        name,
        email, 
        password
    })

    const token = user.getJWTtoken()
    // safety
    user.password = undefined
    // store this token in user's cookie
    res.cookie("token", token, cookieOptions)
    // send back a response to user
    res.status(200).json({
        success: true,
        token, 
        user,
    })
})
