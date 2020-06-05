import express from "express"
const portfolioRouter = express.Router();

let portfolio = require('../controllers/portfolioController')

portfolioRouter.get('', portfolio.get_detail)
portfolioRouter.post('', portfolio.create_portfolio)
portfolioRouter.put('', portfolio.update_portfolio)
portfolioRouter.delete('', portfolio.delete_portfolio)

export default portfolioRouter