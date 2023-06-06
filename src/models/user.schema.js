import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles.js";
import bcrypt from "bcrypt.js"
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: ["true", "Name must be less than 50 chars"]
    },
    email: {
        type: String,
        required: ["true", "Email is required"],
    },
    password: {
        type: String,
        required: ["true", "Password is required"],
        minLength: [8, "password must be at least 8 chars"],
        select: false
    },
    role: {
        type: String,
        enum: Object.values(AuthRoles)
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date
}, {timestamps: true})

// Encrypt the password before saving: HOOKS

userSchema.pre("save", async function(next){
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
    
})

userSchema.methods = {
    // compare password 
    comparePassword: async function(enteredPassword){
       return await bcrypt.compare(enteredPassword, this.password)
    }
}

export default mongoose.model("user", userSchema)