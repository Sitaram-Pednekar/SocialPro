import mongoose from "mongoose";
import UserDB from "../modules/user.module.js";
import UserDetailDB from "../modules/userDetails.module.js";
import AccountDetail from "../modules/socialRelate.module.js";
import PerformanceCount from "../modules/contentStatics.module.js";

const FollowStatus = async(req , res)=>{
    //status = following/unfollowing/follower/unfollower/blocked/unblocked/closefriend
    const { userUsername , status } = req.body;
    if(!userUsername){
        return res.status(404).json({
            message : "User not found"
        })
    }

    const UsernameID = await UserDB.findById(req.user.id);
    const Username = UsernameID.username;
    const receiverUser = await UserDB.findOne({
        username : userUsername
    });


    if(!UsernameID){
        return res.status(404).json({
            message : "User not found in application"
        });
    }

    if(!receiverUser){
        return res.status(404).json({
            message : "Package receiver not found"
        });
    }


    const ID = UsernameID._id;
    const receiverID = receiverUser._id;
    // const UserID = mongoose.Schema.Types.ObjectId(ID);
    // const receiverUserID = mongoose.Types.ObjectId(receiverID);
    // console.log(receiverUserID);

    const findUser = await UserDetailDB.findOne({
        user : req.user.id
    })
    const findreceiverUser = await UserDetailDB.findOne({
        user : receiverID
    })


    if(!findUser){
        return res.status(404).json({
            message : "User not found"
        });
    }
    if(!findreceiverUser){
        return res.status(404).json({
            message : "Receiver user not found"
        });
    }
    
    const isProfileVerified = findUser?.isProfileDone;

    if(!isProfileVerified){
        return res.status(400).json({
            message : "First complete profile"
        });
    }

    const account = await AccountDetail.findOne({
        user :ID
    });

    const userContent = await PerformanceCount.findOne({
        user : ID
    })
    
    const receiverContent = await PerformanceCount.findOne({
        user : receiverID
    })


    const receiverAccount = await AccountDetail.findOne({
        user : receiverID
    });




    if(!account){
        
        const createAccountDetails = await AccountDetail.create({
            user : ID
        });

    }
    if(!receiverAccount){
        const createAccountDetails = await AccountDetail.create({
            user : receiverID
        });
    }
    
    if(!userContent){
        const createUserContentStatics = await PerformanceCount.create({
            user : ID
        })
    }

    if(!receiverContent){
        const createReceiverContentStatics = await PerformanceCount.create({
            user : receiverID
        })
    }

    const userContentStatics = await PerformanceCount.findOne({
        user : ID
    })
    
    const receiverContentStatics = await PerformanceCount.findOne({
        user : receiverID
    })

    const followStatus = await AccountDetail.findOne({
            user : ID
    })
    const receiverFollowStatus = await AccountDetail.findOne({
        user : receiverID
    })
    

    const following = async()=>{
        if(followStatus.following.includes(userUsername)){
            return res.status(409).json({
               message : "Already followed"
            })
        }
        if(followStatus.blockedUser.includes(userUsername)){
            return res.status(409).json({
                message : "User is blocked by you. Can't follow"
            })
        }
        if(receiverFollowStatus.blockedUser.includes(Username)){
            return res.status(409).json({
                message : `${Username} blocked you.`    
            })
        }
        followStatus.following.push(userUsername);
        await followStatus.save();
        userContentStatics.followingCount += 1;
        await userContentStatics.save();


        receiverFollowStatus.followers.push(userUsername);
        receiverFollowStatus.notification.push(`${Username} followed you.`);
        await receiverFollowStatus.save();
        receiverContentStatics.followersCount += 1;
        await receiverContentStatics.save();
        
                
        return res.status(200).json({
            message : "Followed"
        })

    }

    const unfollowing = async()=> {
        if(!(followStatus.following.includes(userUsername))){
            return res.status(409).json({
                message : "Didn't followed yet"
            })
        }
        followStatus.following.pull(userUsername);
        await followStatus.save();
        if(followStatus.closeFriends.includes(userUsername)){
            followStatus.closeFriends.pull(userUsername);
            await followStatus.save();
            console.log("Before:", userContentStatics.closefriendCount);
            userContentStatics.closefriendCount -= 1;
            console.log("After:", userContentStatics.closefriendCount);
            await userContentStatics.save();

        }
        userContentStatics.followingCount -= 1;
        await userContentStatics.save();


        receiverFollowStatus.followers.pull(userUsername);
        receiverFollowStatus.notification.push(`${Username} unfollowed you.`);
        await receiverFollowStatus.save();

        receiverContentStatics.followersCount -= 1;
        await receiverContentStatics.save();

        return res.status(200).json({
            message : "User successfully unfollowed"
        })
        
        return res.status(200).json({
            message : "unfollowed"
        })

    }

    const blocked = async()=>{
        if(findreceiverUser.user.equals(receiverID)){
            if(followStatus.blockedUser.includes(userUsername)){
                return res.status(404).json({
                    message : "User already blocked"
                })
            }
            if(followStatus.closeFriends.includes(userUsername)){
                return res.status(404).json({
                    message : "User in close friend."
                })
            }
                
            followStatus.blockedUser.push(userUsername);
            if(followStatus.followers.includes(userUsername)){
                followStatus.followers.pull(userUsername);
                receiverFollowStatus.following.pull(Username);

            }
            if(followStatus.following.includes(userUsername)){
                followStatus.following.pull(userUsername);
                receiverFollowStatus.followers.pull(Username);
            }
                
            await followStatus.save();
            userContentStatics.blockedUserCount += 1;
            await userContentStatics.save();

            receiverFollowStatus.notification.push(`${Username} blocked you.`);
            await receiverFollowStatus.save();
            return res.status(200).json({
                message : "blocked successfully"
            });
        }
        return res.status(404).json({
            message : "User not found for block"
        });
            
            
    }

    const unblocked = async()=>{
        
        if(findreceiverUser.user.equals(receiverID)){
            if(!(followStatus.blockedUser.includes(userUsername))){
                return res.status(404).json({
                        message : "User is not blocked"
                   })
            }
            followStatus.blockedUser.pull(userUsername);
            await followStatus.save();
            receiverFollowStatus.notification.push(`${Username} unblocked you.`);
            await receiverFollowStatus.save();

            userContentStatics.blockedUserCount -= 1;
            await userContentStatics.save();

            return res.status(200).json({
                message : "User successfuly unblocked"
            })
        }
        return res.status(404).json({
            message : "User not found for unblock"
        });

        
    }

    const closefriend = async()=>{
        if(findreceiverUser.user.equals(receiverID)){
            if((followStatus.closeFriends.includes(userUsername))){
                return res.status(403).json({
                        message : "User already in closefriend"
                  })
            }
            if(!(followStatus.following.includes(userUsername))){
                return res.status(403).json({
                    message : "User is not followed by you for adding in close friend"
                })
            }
            

            followStatus.closeFriends.push(userUsername);
            await followStatus.save();
            receiverFollowStatus.notification.push(`${Username} added to close friend you.`);
            await receiverFollowStatus.save();

            userContentStatics.closefriendCount += 1;
            await userContentStatics.save();

            return res.status(200).json({
                message : "User successfully added in close friend"
            })
        }
        return res.status(404).json({
            message : "User not found for closeFriend"
        });

        
    }

    const unclosedfriend = async()=>{
        if(findreceiverUser.user.equals(receiverID)){
            if(!(followStatus.closeFriends.includes(userUsername))){
                return res.status(403).json({
                    message : "User not in closefriend"
                })
            }
            followStatus.closeFriends.pull(userUsername);
            await followStatus.save();
            receiverFollowStatus.notification.push(`${Username} removed you from close friend.`);
            await receiverFollowStatus.save();

            userContentStatics.closefriendCount -= 1;
            await userContentStatics.save();
            
            return res.status(200).json({
                message : "User successfully added in close friend"
            })
        }
        return res.status(404).json({
            message : "User not found for closeFriend"
        });
    }

    switch(status) {
        case "following" :
            return await following();


        case "unfollowing" :
            return await unfollowing();


        case "blocked" :
            return await blocked();
    

        case "unblocked" :
            return await unblocked();


        case "closefriend" :
            return await closefriend();


        case "unclosedfriend" :
            return await unclosedfriend();

        default :
            return res.status(409).json({
                message : "Incorrect statement passed"
            })
    }
    

}


export {
    FollowStatus
}