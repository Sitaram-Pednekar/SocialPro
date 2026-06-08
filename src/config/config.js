import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const MongoURL = process.env.MONGO_URL;
const RefreshTokenKey = process.env.REFRESH_TOKEN_SECRET_KEY;
const AccessTokenKey = process.env.ACCESSTOKEN_SECRET_KEY;
const CloudinaryName = process.env.CLOUDINARY_CLOUD_NAME;
const CloudinaryAPIKey = process.env.CLOUDINARY_API_KEY;
const CloudinaryAPISecretKey = process.env.CLOUDINARY_API_SECRET;


export default PORT;
export {
    MongoURL,
    RefreshTokenKey,
    AccessTokenKey,
    CloudinaryName,
    CloudinaryAPIKey,
    CloudinaryAPISecretKey
};