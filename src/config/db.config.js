import mongoose from 'mongoose';
import { MongoURL } from './config.js';

const runDB = async()=>{
    try{
        await mongoose.connect(MongoURL);
        console.log("MongoDB connected via Backend");
    }catch(err){
        console.log(err);
        process.exit(1);
    }

}

export default runDB;