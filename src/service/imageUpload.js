import s3 from "../config/s3.config.js";

export const s3FileUpload = async ({bucketName, key, body, contentType}) => {
    await s3.upload({
        bucketName,
        key: key,
        Body: body,
        ContentType: contentType
    })
    .promise()
}
export const s3deleteFile = async ({bucketName, key}) => {
    await s3.deleteObject({
        bucketName,
        key: key,
        
    })
    .promise()
}