//Counts for performance.
/*

| Field            | Purpose               |
| ---------------- | --------------------- |
| postsCount       | total posts           |
| followersCount   | total followers       |
| followingCount   | total following       |
| likesReceived    | total likes           |
| subscribersCount | paid/free subscribers |


*/

import mongoose from "mongoose";


const performance = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "UserDB"
    },
    postsCount : {
        type : Number,
        default : 0
    },
    followersCount : {
        type : Number,
        default : 0
    },
    followingCount : {
        type : Number,
        default : 0
    },
    likesReceived : {
        type : Number,
        default : 0
    },
    subscribersCount : {
        type : Number,
        default : 0
    },
    blockedUserCount : {
        type : Number,
        default : 0
    },
    closefriendCount : {
        type : Number,
        default : 0
    }
    
})

const PerformanceCount = mongoose.model("PerformanceCount", performance);
export default PerformanceCount;