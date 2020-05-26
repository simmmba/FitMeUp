import { Portfolio, Portfolio_tags } from '../models'

export const get_detail = async function(req, res) {
    try {
        const { stylist_id } = req.query
        const p = await Portfolio.findOne({
            where: {stylist_id: stylist_id}
        })
        p.dataValues.tag = await Portfolio_tags.findAll({
            where: {
                portfolio_id: p.id
            }
        })
        if(p) {
            return res.status(200).json({
                result: "Success",
                portfolio: p
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


export const get_list = async function(req, res) {
    try {
        const { stylist_id } = req.query
        const portfolio_list = await Portfolio.findAll({
            where: {stylist_id: stylist_id}
        })
        if(portfolio_list) {
            return res.status(200).json({
                result: "Success",
                portfolios: portfolio_list
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