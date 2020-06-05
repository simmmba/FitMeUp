import { Portfolio, Portfolio_tags, Payment, Review, PortfolioImage, User, Consult } from '../models'
import sequelize from 'sequelize'
import { Op } from 'sequelize'

export const get_detail = async function (req, res) {
    try {
        const { stylist_id } = req.query
        let p = await Portfolio.findOne({
            include: [Portfolio_tags, PortfolioImage, User],
            where: { stylist_id: stylist_id },
        })
        if (p) {
            let payment_info = await Payment.findOne({
                attributes: [
                    [sequelize.fn('round', sequelize.fn('avg', sequelize.col('amount')), 0), 'avg_amount'],
                    [sequelize.fn('count', sequelize.col('amount')), 'amount_cnt']
                ],
                where: { source: stylist_id, type: { [Op.like]: 'income' } },
                raw: true
            })

            let review_info = await Review.findOne({
                attributes: [
                    [sequelize.fn('round', sequelize.fn('avg', sequelize.col('score')), 1), 'avg_score'],
                    [sequelize.fn('count', sequelize.col('*')), 'review_cnt']
                ],
                where: { target: stylist_id },
                raw: true
            })
            console.log(review_info);
            review_info.avg_score = review_info.avg_score ? review_info.avg_score : 0;
            
            
            let consult_info = await Consult.findOne({
                attributes: [
                    [sequelize.fn('count', sequelize.col('*')), 'consult_cnt']
                ],
                where: { stylist_id: stylist_id },
                raw: true
            })

            res.json({
                result: "Success",
                portfolio: p,
                avg_scroe: review_info.avg_score,
                review_cnt: review_info.review_cnt,
                consult_cnt: consult_info.consult_cnt
            })
        } else {
            res.status(200).json({
                result: "Success",
                detail: "no portfolio"
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


export const create_portfolio = async function (req, res) {
    try {
        const { stylist_id, title, contents, tags, my_price, coordi_price } = req.body
        let p = await Portfolio.create({ stylist_id, title, contents })

        for (const t of tags) {
            await Portfolio_tags.create({ portfolio_id: p.id, tag: t })
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


export const update_portfolio = async function (req, res) {
    try {
        const { portfolio_id, title, contents, tags, my_price, coordi_price } = req.body
        
        let update = await Portfolio.update(
            { title, contents, tags, my_price, coordi_price },
            {where :{id : portfolio_id}}
        )

        let tags_delete = await Portfolio_tags.destroy({ where: {id : portfolio_id}})

        for (const t of tags) {
            await Portfolio_tags.create({ portfolio_id: p.id, tag: t })
        }

        return res.status(200).json({result: "Success"})

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            result: "Fail",
            detail: "500 Internal Server Error"
        })
    }
}


export const delete_portfolio = async function (req, res) {
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