import { User, PortfolioImage,ReviewImage, ConsultImage } from '../models'
import multer from 'multer'
import path from 'path'

export const upload_profile = async (req, res) => {
    try {

        const {user_id} = req.body;
        const file = req.file;
        
        const user = await User.update(
            {profile_img : process.env.IMAGE_URL+file.filename},
            {where :{ id:user_id}}
        )

        res.json({state:'Success'})
    }catch(err){
        console.log('uploadController.js upload_profile method\n ==> ' + err)
        res
          .status(500)
          .json({ result: 'Fail', detail: '500 Internal Server Error' })
    }
}

export const upload_portfolio = async (req, res) => {
    try {
        const {portfolio_id} = req.body;
        const files = req.files;
        for (const file of files) {
            let file_path = process.env.IMAGE_URL+file.filename

            const portfolioImage = await PortfolioImage.create(
                {portfolio_id : portfolio_id, image_path : file_path}
            )
        }
        res.json({state:'Success'})
    }catch(err){
        console.log('uploadController.js upload_portfolio method\n ==> ' + err)
        res
          .status(500)
          .json({ result: 'Fail', detail: '500 Internal Server Error' })
    }
}

export const upload_review = async (req, res) => {
    try {
        const {review_id} = req.body;
        const files = req.files;
        for (const file of files) {
            let file_path = process.env.IMAGE_URL+file.filename
            
            const reviewImage = await ReviewImage.create(
                {review_id : review_id, image_path : file_path}
            )
        }
        res.json({state:'Success'})
    }catch(err){
        console.log('uploadController.js upload_review method\n ==> ' + err)
        res
          .status(500)
          .json({ result: 'Fail', detail: '500 Internal Server Error' })
    }
}

export const upload_consult = async (req, res) => {
    try {
        const {consult_id} = req.body;
        const files = req.files;
        if(consult_id == null){
            throw new Error('wrong consult_id');
        }
        for (const file of files) {
            let file_path = process.env.IMAGE_URL+file.filename
            
            const consultImage = await ConsultImage.create(
                {consult_id : consult_id, image_path : file_path}
            )
        }
        res.json({state:'Success'})
    }catch(err){
        console.log('uploadController.js upload_review method\n ==> ' + err)
        res
          .status(500)
          .json({ result: 'Fail', detail: '500 Internal Server Error' })
    }
}


export const upload_img = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, process.env.IMAGE_PATH);
        },
        filename: function (req, file, cb) {
            cb(null, new Date().valueOf() + path.extname(file.originalname));
        }
    })
});