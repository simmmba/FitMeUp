import { User, Review, Portfolio, PortfolioImage, Consult } from '../models'
import { Op } from 'sequelize'
import sequelize from 'sequelize'


// 평점 기준 추천
export const recommend_by_score = async (req, res) => {
  try {
    let recommends = await Review.findAll({
      attributes: [['target', 'id'], [sequelize.fn('round', sequelize.fn('avg', sequelize.col('score')), 1), 'avg_score'], [sequelize.fn('count', sequelize.col('*')), 'review_cnt']],
      include: {
        model: User,
      },
      group: ['target'],
      order: [[sequelize.fn('avg', sequelize.col('score')), 'DESC']],
      limit: 9,
    })

    for (const r of recommends) {
      let stylist_id = r.dataValues.id;
      let portfolio = await Portfolio.findOne({
        where: {stylist_id: stylist_id }
      })
      r.dataValues.portfolio_title = portfolio.dataValues.title
      
      let portfolio_id = portfolio.dataValues.id;
      let portfolio_img = await PortfolioImage.findOne({
        where: {portfolio_id: portfolio_id }
      })
      r.dataValues.portfolio_img = portfolio_img.dataValues.image_path

    }

    res.json({ result: "Success", recommends: recommends })
  } catch (err) {
    console.log('recommendController.js recommend_by_score method\n ==> ' + err)
    res.status(500).json({ result: 'Fail', detail: '500 Internal Server Error' })
  }
}

// 상담 기준 추천
export const recommend_by_consult = async (req, res) => {
  try {
    let recommends = await Consult.findAll({ 
      attributes: [['stylist_id','id'], [sequelize.fn('count', sequelize.col('*')),'cunsult_cnt']],
      where :{stylist_id : {[Op.ne]:null}},
      group : ['stylist_id'],
      include : [User],
      order : [[sequelize.fn('count', sequelize.col('*')),'DESC']],
      limit :9,
    })

    for (const r of recommends) {
      let stylist_id = r.dataValues.id;
      let portfolio = await Portfolio.findOne({
        where: {stylist_id: stylist_id }
      })
      r.dataValues.portfolio_title = portfolio.dataValues.title
      
      let portfolio_id = portfolio.dataValues.id;
      let portfolio_img = await PortfolioImage.findOne({
        where: {portfolio_id: portfolio_id }
      })
      r.dataValues.portfolio_img = portfolio_img.dataValues.image_path
    }
    


    res.json({ result: "Success", recommends: recommends })
  } catch (err) {
    console.log('recommendController.js recommend_by_consult method\n ==> ' + err)
    res.status(500).json({ result: 'Fail', detail: '500 Internal Server Error' })
  }
}

