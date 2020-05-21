import express from "express"
const reviewRouter = express.Router();

let review = require('../controllers/reviewController')

reviewRouter.post("/write", review.create_review);
reviewRouter.put("/write", review.update_review);
reviewRouter.delete("/write", review.delete_review);
reviewRouter.get("/write", review.read_reviews);

reviewRouter.get("/receive", review.read_receive_reviews);

export default reviewRouter;