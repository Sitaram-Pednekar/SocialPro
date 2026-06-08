import express from 'express';
import UserDB from '../modules/user.module.js';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from '../services/encryption.services.js';
import Security from '../modules/security.module.js';

const registerUser = async (req,res)=>{
    const {username , password , email} = req.body;
    if(!username || !password || !email){
        res.status(404).json({
            message : "User credentials not found"
        });
    }
    const UserData = await UserDB.findOne({
        $or : [
            {username : username },
            {email : email}
        ]
    })
    if(UserData){
        return res.status(409).json({
            message : "User already exist try using different email or password"
        });
    }
    console.log(username);
    try{
        const UserSaved = await UserDB.create({
            username,
            password,
            email

        });
        return res.status(201).json({
            message : "User Credentials saved successfully"
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({
            message : "Internal server error"
        });
    }

}
const loginUser = async (req,res)=>{
    const {username , password , email} = req.body;
    
    try {
        const userData = await UserDB.findOne({
            $or : [
                { username : username},
                { email : email}
            ]
        });
        console.log(userData);
        const ID = userData._id;


        if(!userData){
            return res.status(404).json({
                message : "User Not found"
            });
        }

        
        const isMatched = await bcrypt.compare(password , userData.password);
        
        if(!isMatched){
            res.status(404).json({
                message : "User password is wrong"
            })
        }


        
        const AccessToken = generateAccessToken(userData._id);
        const RefreshToken = generateRefreshToken(userData._id);


        const SecuritySaving = await Security.create({
            user : ID,
            refreshToken : RefreshToken
        })

        res.cookie('jwt',RefreshToken , {
            httpOnly : true,
            secure : true , 
            sameSize : 'Strict',
            maxAge : 7 * 60 * 60 * 24 * 1000 //7d
        });


        return res.status(200).json({
            message : "Successful",
            user : userData,
            token : AccessToken
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Internal Server Error"
        });
    }
}




export {
    registerUser,
    loginUser
}