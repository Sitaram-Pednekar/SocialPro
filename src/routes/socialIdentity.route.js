import express from 'express';
import { verifyToken } from '../middlewares/verifyTokenJWT.middleware.js';
import { FollowStatus } from '../controllers/profileDetails.controller.js';

const Router = express.Router();

Router.route('/accountDetails').post(verifyToken,FollowStatus);

export default Router;