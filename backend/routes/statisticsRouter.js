import express from 'express'
const statisticsRouter = express.Router();

let statistics = require('../controllers/statisticsConstroller')

statisticsRouter.get('/review',statistics.review_statistics);
statisticsRouter.get('/consult',statistics.consult_statistics);
statisticsRouter.get('/score',statistics.score_statistics);
statisticsRouter.get('/payment',statistics.payment_statistics);

export default statisticsRouter;
