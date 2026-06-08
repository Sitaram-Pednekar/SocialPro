//about the account

import mongoose from "mongoose";

const AccountDetails = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "UserDB",
        required : [true, "Username not found"],
        unique : [true]
    },
    followers : [{
        type : [String]
    }],
    following : [{
        type : [String],

    }],
    blockedUser : [{
        type : [String],
        unique : [true , "User already blocked"]
    }],
    closeFriends : [{
        type : [String],
        unique : [true , "user already exists in close friend"]

    }],
    notification : [{
        type : [String]
    }]
})

const AccountDetail = mongoose.model("AccountDetail",AccountDetails);


export default AccountDetail;