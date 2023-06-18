import Product from "../models/product.schema.js"
import formidable from "formidable"
import { s3FileUpload, s3deleteFile} from "../service/imageUpload.js"
import mongoose from "mongoose"
import asyncHandler from "../service/asyncHandler.js"
import CustomError from "../utils/CustomError.js"
import config from "../config/index.js"
import fs from "fs"
import { promises } from "dns"


export const addProduct = asyncHandler(async (req, res) => {
    const form = formidable({multiple: true, keepExtension: true});

    form.parse(req, async function (err, fields, files) {
        if (err) {
            throw new CustomError(err.message || "Something went wrong", 500)
        }

        let productId = new Mongoose.Types.ObjectId().toHexString()

       console.log(fields, files);

       if (
            !fields.name ||
            !fields.price ||
            !fields.description ||
            !fields.collectionId
       ) {
            throw new CustomError ("please fill all the fields", 500)

       }


       let imgArrayResp = Promise.all(
        Object.keys(files).map( async (file, index) => {
            const element = file[fileKey]
            const data = fs.readFileSync(element.filepath)

            const upload = await s3FileUpload({
                bucketName: config.S3_BUCKET_NAME,
                key: `product/${productId}/photo_${index + 1}.png`,
                body: data,
                contentType: element.mimetype
            })
            console.log(upload);
            return{
                secure_url : upload.Location
            }

        })
       )

       let imgArray = await imgArrayResp

       const product = await Product.create({
        _id: productId,
        photo: imgArray,
        ...fields
       })

       if (!product) {
        throw new CustomError("product failed to be created in DB", 400)
       }
       res.status(200).json({
        success:true,
        product,
       })


       //TODO: we will take this tomorrow
    })
})

 export const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    
    if (!products) {
        throw new CustomError("No product found", 404)
    }

    res.status(200).json({
        success: true,
        products

    })
})

export const getProductById = asyncHandler(async (req, res) => {
    const {id: productId} = req.params

    const product = await Product.findById(productId)

    if (!product) {
        throw new CustomError("No product found", 404)
    }
    res.status(200).json({
        success: true,
        product
    })
})

export const getProductByCollectionId = asyncHandler(async (req, res) => {
    const {id: collectionId} = req.params

    const products = await Product.find({collectionId})

    if (!product) {
        throw new CustomError("No product found", 404)
    }
    res.status(200).json({
        success: true,
        product
    })
})

export const deleteProduct = asyncHandler(async (req, res) => {
    const {id: productId} = req.params

    const product = await Product.findById(productId)

    if (!product) {
        throw new CustomError("No product found", 404)
    }

    const deletePhoto = promises.all(
        product.photos.map(async (elem, index) => {
            await s3deleteFile({
            bucketName: config.S3_BUCKET_NAME,
            key:  `products/${product._id.toString()}/photo_${index + 1}.png`
            })
        })

    )

    await deletePhoto;

    await product.remove()

    res.status(200).json({
        success: true,
        message: "Product has been delete successfully"
    })
    

})

