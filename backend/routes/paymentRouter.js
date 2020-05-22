import express from "express"
const paymentRouter = express.Router()

let payment = require('../controllers/paymentControllers')

paymentRouter.post('/charge',payment.charge)
paymentRouter.post('/checkout',payment.checkout)
paymentRouter.post('/withdraw',payment.withdraw)
paymentRouter.get('/list',payment.payment_list)

export default paymentRouter