import Collection from "../models/collection.schema.js"
import asyncHandler from "../service/asyncHandler.js"
import CustomError from "../utils/CustomError.js"

export const createCollection = asyncHandler(async(req, res) => {
    const {name} = req.body

    if (!name) {
        throw new CustomError("Collection name is required", 400)
        name
    }
    res.status(200).json({
        success: true,
        message: "Collection was created successfully",
        Collection
    })

})

export const updatedCollection = asyncHandler(async(req, res) => {
    const {name} = req.body
    const {id: collectionId} = req.params

    if (!name) {
        throw new CustomError("Collection name is required", 400)
        name
    }

    let updatedCollection = await Collection.findByIdUpdate(collectionId, {
        name
    }, {
        new: true,
        runVaildators: true
    })

    if (!updatedCollection) {
        throw new CustomError("Collection not found", 400)
        
    }

    res.status(200).json({
        success: true,
        message: "Collection updated successfully",
        updatedCollection
    })

})

export const deleteCollection = asyncHandler(async(req, res) => {
 
    const {id: collectionId} = req.params

   const collectionToDelete = await Collection.findById(collectionId)

    if (!collectionToDelete) {
        throw new CustomError("Collection to be deleted not found", 400)
       
    }
    await collectionToDelete.remove()

    res.status(200).json({
        success: true,
        message: "Collection deleted successfully",
        
    })

})
export const getAllCollection = asyncHandler(async(req, res) => {
 
 

   const collections = await Collection.find()

    if (!collections) {
        throw new CustomError(" No Collection  found", 400)
       
    }
   

    res.status(200).json({
        success: true,
        collections
        
    })

})