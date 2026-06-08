/*

| Field             | Purpose                |
| ----------------- | ---------------------- |
| refreshToken      | session management     |
| passwordChangedAt | invalidate old JWTs    |
| loginAttempts     | brute-force protection |
| accountLocked     | security lock          |
| twoFactorEnabled  | 2FA auth               |


*/

import mongoose from "mongoose";



const securityConcern = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "UserDB"
    },
    refreshToken : {
        type : [String]
    },
    passwordChangedAt : {
        type : String
    },
    loginAttempts : {
        type : Number,
        default : 5
    },
    accountLocked : {
        type : Boolean,
        default : false
    },
    twoFactorEnabled : {
        type : Boolean,
        default : false
    }
},{timestamps : true});

const Security = mongoose.model("Security",securityConcern);

export default Security;