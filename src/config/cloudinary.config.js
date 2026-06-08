import {v2 as cloudinary} from 'cloudinary';
import { CloudinaryAPIKey, CloudinaryAPISecretKey, CloudinaryName } from './config.js';

cloudinary.config({
    cloud_name: CloudinaryName,
    api_key : CloudinaryAPIKey,
    api_secret : CloudinaryAPISecretKey,
})

export default cloudinary;