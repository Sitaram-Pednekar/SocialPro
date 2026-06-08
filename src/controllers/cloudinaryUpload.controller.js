import cloudinary from "../config/cloudinary.config.js";
import UserDetailDB from "../modules/userDetails.module.js";
import { uploadToCloudinary } from "../utils/helperUpload.utils.js";

const uploadAvatar = async(req , res)=>{
    try{
        const filePath = req.file.path;
        const folderName = "Avatars";
        const UserID = req.user.id;

        if(!UserID){
            return res.status(404).json({
                message : "User not found"
            })
        }
        console.log(UserID)
        
        const url = await uploadToCloudinary(filePath , folderName);
        if(!url){
            console.log("URL not found");
        }
        const uploadURL = await UserDetailDB.findOne({
            user : UserID
        })
        

        uploadURL.avatar = url;
        await uploadURL.save();

        console.log(uploadURL);

        return res.status(201).json({
            message : "Successfully uploaded the avatar",
            url
        })
    }catch(err){
        console.log(err);
        return res.status(409).json({
            message : "The request get some conflict"
        })
    }

}

const uploadCoverPages = async(req,res)=>{
    try{
        const folderName = "CoverPages";
        const UserID = req.user.id;
        const URLs = [];

        const uploadURL = await UserDetailDB.findOne({
            user : UserID
        })


        for(const file of req.files){
            console.log("Processing file item:", file);
            const path = file.path;
            const url = await uploadToCloudinary(path,folderName);
            if(url){
                URLs.push(url);
            }
            if(!url){
                return res.status(409).json({
                    message : "The request got some conflicts"
                })
            }
        }

        uploadURL.coverPhotos.push(...URLs);
        await uploadURL.save();
        console.log(uploadURL);

        return res.status(201).json({
            message : "Successfully uploaded the coverPage",
            URLs
        })

    }catch(err){
        console.log(err);
        return res.status(409).json({
            message : "The request get some conflict"
        })
    }
}

export {
    uploadAvatar,
    uploadCoverPages,
}