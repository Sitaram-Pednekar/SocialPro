import validator from 'validator';
import mongoose, { model } from "mongoose";
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        unique : [true , "The username is already taken try using different"],
        required : [true , "The usernamed is not found"],
        min : [3 , 'The minimal value is {MIN}']
    },
    password : {
        type : String, 
        required : [true , "Please put password in db"]
    },
    email :{
        type : String,
        required : [true,"The email is not found, put in db"],
        unique : [true , "The username is already taken try using different"],
        validate : {
            validator : validator.isEmail,
            message : "Please put valid email in db"
        }
    },
    refreshToken : [{
        type : [String]
    }]


    
},{timestamps : true})

UserSchema.pre('save',async function() {
    if(!this.isModified('password')) return ;

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
        
    } catch (error) {
        console.log(error);
        
    }
})


const UserDB = mongoose.model("UserDB",UserSchema);

export default UserDB;
