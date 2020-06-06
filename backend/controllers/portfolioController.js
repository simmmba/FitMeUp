import { Portfolio, Portfolio_tags, Payment, Review, PortfolioImage } from '../models'

export const get_detail = async function(req, res) {
    try {
        const { stylist_id } = req.query
        const p = await Portfolio.findOne({
            include :[PortfolioImage],
            where: {stylist_id: stylist_id}
        })

        
        p.dataValues.tag = await Portfolio_tags.findAll({
            where: {
                portfolio_id: p.id
            }
        })

        const paymentList = await Payment.findAll({
            where: {target: stylist_id}
        })

        let totalAmount = 0
        let paymentCount = 0
        paymentList.forEach(p => {
            totalAmount += p.amount
            paymentCount++
        })
        let paymentAvg = 0
        if(paymentCount !== 0) {
            paymentAvg = totalAmount / paymentCount
        }

        const reviewList = await Review.findAll({
            where: {target: stylist_id}
        })
        let totalScore = 0;
        let reviewCount = 0;
        reviewList.forEach(r => {
            totalScore += r.score
            reviewCount++
        })
        let scoreAvg = 0
        if(reviewCount !== 0) {
            scoreAvg = totalScore / reviewCount
        }

        if(p) {
            return res.status(200).json({
                result: "Success",
                portfolio: p,
                paymentAvg: paymentAvg,
                paymentCount: paymentCount,
                scoreAvg: scoreAvg,
                reviewCount: reviewCount
            })
        } else {
            return res.status(200).json({
                result: "Fail",
                detail: "Not Exist"
            })
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            result: "Fail",
            detail: "500 Internal Server Error"
        })
    }
}


export const create_portfolio = async function(req, res) {
    try {
        const { stylist_id, title, contents, tags } = req.body
        let p = await Portfolio.create({stylist_id, title, contents})

        for (const t of tags) {
            await Portfolio_tags.create({portfolio_id: p.id, tag: t})
        }

        p.dataValues.tags = await Portfolio_tags.findAll({
            where: {
                portfolio_id: p.id
            }
        })
        return res.status(200).json({
            result: "Success",
            portfolio: p
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            result: "Fail",
            detail: "500 Internal Server Error"
        })
    }
}


export const update_portfolio = async function(req, res) {
    try {
        const { stylist_id } = req.body
        await Portfolio.destroy({
            where: {
                stylist_id: stylist_id
            }
        })
        return create_portfolio(req, res)
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            result: "Fail",
            detail: "500 Internal Server Error"
        })
    }
}


export const delete_portfolio = async function(req, res) {
    try {
        const { stylist_id } = req.body
        await Portfolio.destroy({
            where: {
                stylist_id: stylist_id
            }
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            result: "Fail",
            detail: "500 Internal Server Error"
        })
    }
}