// signup a new user
import { json } from "express";
import user from "../models/user.schema.js"

import asyncHandler from "../service/asyncHandler";
import CustomError from "../utils/CustomError";

export const cookieOptions = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true
}

/***********************************************
 * @SIGNUP
 * @route http://localhost:5000/api/auth/signup
 * @description User signUp controller for creating new user
 * @returns User Object 
 ************************************************/

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

export const login = asyncHandler(async (req, res) => {
   const {email, password} = req.body

// validation
if (!email || !password) {
    throw new CustomError("Please fill the field", 400)
}
const User = user.findOne({email}).select("+password")

if (!User) {
    throw new CustomError("Invalid Credentials", 400)
}

  const ispasswordMatched = await User.comparePassword(password)

  if (ispasswordMatched) {
    const token = user.getJWTtoken()
    User.password = undefined
    res.cookie("token", token, cookieOptions)
    return res.status(200).json({
        success: true,
        token,
        user
    })
  }
  throw new CustomError("password is incorrect", 400)
})

export const logout = asyncHandler(async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logged out"
    })
})