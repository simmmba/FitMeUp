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

      r.dataValues.consult_cnt = 0;
      let consult_cnt = await Consult.findOne({ 
        attributes: [[sequelize.fn('count', sequelize.col('*')),'consult_cnt']],
        where : {stylist_id : stylist_id}
      });

      if(consult_cnt)
        r.dataValues.consult_cnt = consult_cnt.dataValues.consult_cnt;

        r.dataValues.portfolio_title=""
        r.dataValues.portfolio_img = "";
        let portfolio = await Portfolio.findOne({
          where: {stylist_id: stylist_id }
        })
      if(portfolio){
        
        r.dataValues.portfolio_title = portfolio.dataValues.title;
        r.dataValues.portfolio_img = portfolio.dataValues.main_img;
      }
    }
    let test = [];

    
    for (let index = 0; index < 9; index++) {
      test.push(recommends[0])
    }
    

    res.json({ result: "Success", recommends: test })
  } catch (err) {
    console.log('recommendController.js recommend_by_score method\n ==> ' + err)
    res.status(500).json({ result: 'Fail', detail: '500 Internal Server Error' })
  }
}

// 상담   기준 추천
export const recommend_by_consult = async (req, res) => {
  try {
    let recommends = await Consult.findAll({ 
      attributes: [['stylist_id','id'], [sequelize.fn('count', sequelize.col('*')),'consult_cnt']],
      where :{stylist_id : {[Op.ne]:null}},
      group : ['stylist_id'],
      include : [User],
      order : [[sequelize.fn('count', sequelize.col('*')),'DESC']],
      limit :9,
    })

    for (const r of recommends) {
      let stylist_id = r.dataValues.id;

      r.dataValues.avg_score = 0;
      r.dataValues.review_cnt = 0;
      let avg_score = await Review.findOne({ 
        attributes: [[sequelize.fn('round', sequelize.fn('avg', sequelize.col('score')), 1), 'avg_score'], [sequelize.fn('count', sequelize.col('*')), 'review_cnt']],
        where : {target: stylist_id}
      });
      if(avg_score){
        r.dataValues.avg_score = avg_score.dataValues.avg_score;
        r.dataValues.review_cnt = avg_score.dataValues.review_cnt;
      }

      r.dataValues.portfolio_title = "";
      r.dataValues.portfolio_img = "";
      let portfolio = await Portfolio.findOne({
        where: {stylist_id: stylist_id }
      });
      if(portfolio){

        r.dataValues.portfolio_title = portfolio.dataValues.title;
        r.dataValues.portfolio_img = portfolio.dataValues.main_img;
      }
    }
    
    let test = [];

    
    for (let index = 0; index < 9; index++) {
      test.push(recommends[0])
    }

    res.json({ result: "Success", recommends: test })
  } catch (err) {
    console.log('recommendController.js recommend_by_consult method\n ==> ' + err)
    res.status(500).json({ result: 'Fail', detail: '500 Internal Server Error' })
  }
}

