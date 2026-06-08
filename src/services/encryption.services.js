import jwt from 'jsonwebtoken';
import { RefreshTokenKey , AccessTokenKey } from '../config/config.js';
import { json, response } from 'express';

function generateRefreshToken(userID){
    try {
        return jwt.sign(
            {id : userID},
            RefreshTokenKey,
            { expiresIn : '15m'}
        )
    } catch (err) {
        console.log(err);
        return response.status(500).json({postMessage: "Internal Server Error for Refresh Token"});
    }
}

function generateAccessToken(userID){
    try {
        return jwt.sign(
            {id : userID},
            AccessTokenKey,
            {expiresIn : '15m'}
        )
    } catch (err) {
        console.log(err);
        return response.status(500).json({postMessage: "Internal Server Error for Access Token"});

    }
}

function verifyRefreshToken(token){
    try {
        return jwt.verify(token , RefreshTokenKey);
    } catch (error) {
        console.log(error);
        return response.status(409).json({postMessage: "User Refresh token is outdated"});

    }
}

function verifyAccessToken(token){
    try {
        return jwt.verify(token , AccessTokenKey);
    } catch (err) {
        console.log(err);
        return response.status(409).json({postMessage: "User Access token is outdated"});

    }
}


export {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
}