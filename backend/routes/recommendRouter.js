import express from "express"
const recommendRouter = express.Router();

let recommend = require('../controllers/recommendController')

recommendRouter.get("/score", recommend.recommend_by_score);
// recommendRouter.get("/recommend/review", recommend.recommend_by_review);

export default recommendRouter;