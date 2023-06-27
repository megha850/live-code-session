import asyncHandler from "../service/asyncHandler";
import CustomError from "../utils/CustomError";






export const createCoupon = asyncHandler(async (req, res) => {
    const {code, discount} = req.body

    if (!code || !discount) {
        throw new CustomError("code and discount are required", 400)
    }

    // Ckeck id code already exists

    const coupon = await Coupon.create({
        code,
        discount
    })

    res.status(200).json({
        success: true,
        message: "coupon created successfully",
        coupon
    })
})

export const updateCoupon = asyncHandler(async (req, res) => {
    const {id: couponId} = req.params
    const {action} = req.body

    // action is boolean or not

    const coupon = await Coupon.findByIdandUpdate(
        couponId,
        {
            active: action
        },
        {
            new: true,
            runValidators: true
        }
    )
    if (!coupon) {
    throw new CustomError("coupon not found", 404)
    }

    res.status(200).json({
        success: true,
        message: "Coupon updated",
        coupon
    })
})

export const deleteCoupon = asyncHandler(async(req, res) => {
    const {id: couponId} = req.params

    const coupon = await Coupon.findByIdandUpdate(couponId)
    if (!coupon) {
    throw new CustomError("coupon not found", 404)
    }

    res.status(200).json({
        success: true,
        message: "Coupon delete",
        coupon
    })

})

export const getAllCoupon = asyncHandler(async (req, res) => {
    const allCoupons = await Coupon.find();

    if (!allCoupons) {
        throw new CustomError("No coupons found", 400)
    }

    res.status(200).json({
        success: true,
        allCoupons
    })
})
