import express from 'express';
import { loginUser, registerUser } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/verifyTokenJWT.middleware.js';
import { getUserDetails } from '../controllers/UserDetails.controller.js';

const Router = express.Router();

Router.route('/register').post(registerUser);
Router.route('/login').post(loginUser);

Router.route('/profile').post(verifyToken,getUserDetails);

export default Router;