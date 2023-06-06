import mongoose from "mongoose";
const collectionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: ["true", "Please provide a collection name"],
            trim: true,
            maxLength : [
                120,
                "Collection name should be "
            ]
        }
    },
    {timestamps: true}
);

export default mongoose.model("Collection", collectionSchema)

//collections 