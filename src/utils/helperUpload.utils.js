import { error } from "console";
import cloudinary from "../config/cloudinary.config.js";
import fs from 'fs';

export const uploadToCloudinary = async(filePath , folderName)=>{
    try {

        if(!filePath){
            throw new Error("File path is undefined or missing");
        }

       const result = await cloudinary.uploader.upload(filePath,{
        folder : folderName
       });

       if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
       return result.secure_url;

    } catch (error) {
        console.error("Cloudinary upload helper error:", error.message);
        
        // Safely delete file on failure only if the path exists locally
        if (filePath && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        
        throw error;
    }

}