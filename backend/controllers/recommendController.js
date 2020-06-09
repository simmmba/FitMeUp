import { User, Review, Portfolio, PortfolioImage, Consult } from '../models'
import { Op } from 'sequelize'
import sequelize from 'sequelize'


// 평점 기준 추천
export const recommend_by_score = async (req, res) => {
  try {

    let query = "select user.id, if(avg(score) is not null, round(avg(score),1), 0) avg_score\
                from user left outer join review on user.id = review.target\
                where type like 'stylist' group by user.id order by avg_score desc limit 9;"

    let recommends = await User.sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT
    })

    for (const r of recommends) {
      let stylist_id = r.id;
      let user = await User.findOne({ where: { id: stylist_id }, raw: true });
      r.User = user;
      r.consult_cnt = 0;

      let consult_cnt = await Consult.findOne({
        attributes: [[sequelize.fn('count', sequelize.col('*')), 'consult_cnt']],
        where: { stylist_id: stylist_id },
        raw: true
      });


      if (consult_cnt)
        r.consult_cnt = consult_cnt.consult_cnt;

      r.portfolio_title = ""
      r.portfolio_img = "";
      let portfolio = await Portfolio.findOne({
        where: { stylist_id: stylist_id },
        raw: true
      })
      if (portfolio) {
        r.portfolio_title = portfolio.title;
        r.portfolio_img = portfolio.main_img;
      }
    }

    res.json({ result: "Success", recommends: recommends })
  } catch (err) {
    console.log('recommendController.js recommend_by_score method\n ==> ' + err)
    res.status(500).json({ result: 'Fail', detail: '500 Internal Server Error' })
  }
}

// 상담   기준 추천
export const recommend_by_consult = async (req, res) => {
  try {

    let query = "select user.id, if(count(consult.id), count(consult.id), 0) consult_cnt\
                 from user left outer join consult on user.id = consult.stylist_id\
                where type like 'stylist' group by user.id order by consult_cnt desc limit 9;"

    let recommends = await User.sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT
    })

    for (const r of recommends) {
      let stylist_id = r.id;

      let user = await User.findOne({ where: { id: stylist_id }, raw: true });
      r.User = user;

      r.avg_score = 0;
      r.review_cnt = 0;
      let avg_score = await Review.findOne({
        attributes: [[sequelize.fn('round', sequelize.fn('avg', sequelize.col('score')), 1), 'avg_score'], [sequelize.fn('count', sequelize.col('*')), 'avg_cnt']],
        where: { target: stylist_id },
        raw: true
      });
      if (avg_score) {
        r.avg_score = avg_score.avg_score;
        r.avg_cnt = avg_score.avg_cnt;
      }

      r.portfolio_title = "";
      r.portfolio_img = "";
      let portfolio = await Portfolio.findOne({
        where: { stylist_id: stylist_id },
        raw : true
      });
      if (portfolio) {
        r.portfolio_title = portfolio.title;
        r.portfolio_img = portfolio.main_img;
      }
    }

    res.json({ result: "Success", recommends: recommends })
  } catch (err) {
    console.log('recommendController.js recommend_by_consult method\n ==> ' + err)
    res.status(500).json({ result: 'Fail', detail: '500 Internal Server Error' })
  }
}