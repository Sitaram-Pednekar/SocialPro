import mongoose from "mongoose";

const postingContent = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "UserDB",
        required : [true]
    },
    postDetails : {
        type : [String],
        description 

    },
    likes : {

    }
})