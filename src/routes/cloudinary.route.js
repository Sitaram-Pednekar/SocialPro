import express from 'express';
import { verifyToken } from '../middlewares/verifyTokenJWT.middleware.js';
import { uploadAvatar, uploadCoverPages} from '../controllers/cloudinaryUpload.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const Router = express.Router();

Router.route('/cloudinaryUploadAvatars').post(verifyToken,upload.single('avatar'),uploadAvatar);
Router.route('/cloudinaryUploadCoverPages').post(verifyToken,upload.array('CoverPage', 5), uploadCoverPages);

export default Router;