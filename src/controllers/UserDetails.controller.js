import mongoose from "mongoose";
import UserDetailDB from "../modules/userDetails.module.js";

const getUserDetails = async(req , res) =>{
    console.log("User Token verified");


    const UserID = req.user.id;
    console.log(UserID);
    
    const UserDetails = await UserDetailDB.findOne({
        user : UserID
    });
    

    const ID = new mongoose.Types.ObjectId(UserID);
    

    console.log(UserDetails);

    const {fullname , bio , avatar , coverPhoto , gender , dateofbirth , location} = req.body;

    

    try {
        if(!UserDetails){
            const UserDetailSaved = await UserDetailDB.create({
                user : ID, 
                fullname,
                bio,
                avatar,
                coverPhoto,
                gender,
                dateofbirth,
                location,
                isProfileDone : true
            })
            console.log(UserDetailSaved);
        }
        return res.status(200).json({
            message : "User Details created successfully"
        })
    } catch (error) {
        console.log(error);

    }  

}

export {
    getUserDetails
}