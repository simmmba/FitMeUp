import express from "express"
const uploadRouter = express.Router();

let upload = require('../controllers/uploadController')

uploadRouter.post("/profile", upload.upload_img.single('img'), upload.upload_profile);
uploadRouter.post("/portfolio", upload.upload_img.array('img'), upload.upload_portfolio);
uploadRouter.post("/review", upload.upload_img.array('img'), upload.upload_review);
uploadRouter.post("/consult", upload.upload_img.array('img'), upload.upload_consult);


export default uploadRouter;