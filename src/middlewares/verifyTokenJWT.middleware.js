import { verifyAccessToken } from "../services/encryption.services.js";

export const verifyToken = async(req , res , next )=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(404).json({
            message : "The user is Unauthenticated"
        })
    }

    try {
        const Verified = verifyAccessToken(token);
        req.user = Verified;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Something went wrong"
        })
    }
}