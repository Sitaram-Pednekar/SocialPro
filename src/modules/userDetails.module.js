import mongoose from "mongoose";
import UserDB from "./user.module.js";

const UserDetails = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "UserDB"
    },
    fullname : {
        type : String,
        required : [true, "Full name must needed"],
        min : [2 , "This is minimal value"]
    },
    bio : {
        type : String , 
        min : [5 , "This is minimal value"]
    },
    avatar : {
        type : String, 
        default : 'default.png'
    },
    coverPhotos : [{
        type : [String]
    }],
    gender : {
        type : String,
        required : [true,"Need to know Identity (gender)"],
        enum : {
            values : ["male" , "female" , "other" ],
            message : "{values} is not valid"
        }
    },
    dateofbirth : {
        type : Date,
        required : [true,"Need to know identity (date of birth)"],

    },
    location : {
        type : String , 
        required : true
    },
    isProfileDone : {
        type : Boolean,
        default : false
    }
    

})

const UserDetailDB = mongoose.model("UserDetailDB", UserDetails);

export default UserDetailDB;