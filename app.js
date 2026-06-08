import express from 'express';
import cors from 'cors';
import cookie from 'cookie-parser';
import helmet from 'helmet';
import authRoute from './src/routes/auth.route.js';
import cloudinaryUploads from './src/routes/cloudinary.route.js';
import AccountDetails from './src/routes/socialIdentity.route.js';


const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(cookie());

app.get("/",(req,res)=>{
    res.json("Application running successfully");
})

app.use('/api/auth',authRoute);
app.use('/api/uploadCloudinary',cloudinaryUploads);
app.use('/api/accountDetails',AccountDetails);

export default app;
