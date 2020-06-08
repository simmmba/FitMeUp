import express from 'express'
const statisticsRouter = express.Router();

let statistics = require('../controllers/statisticsConstroller')

statisticsRouter.get('/review',statistics.review_statistics);

export default statisticsRouter;
