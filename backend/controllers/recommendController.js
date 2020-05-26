import { User } from '../models'
import { Review } from '../models'
import { Op } from 'sequelize'
import sequelize from 'sequelize'


// 리뷰 생성
export const recommend_by_score = async (req, res) => {
  try {
    // let users = await User.findAll({where:{type:"stylist"},include:[Review]})
    let reviews = await Review.findAll({
      attributes: [['target','id'], [sequelize.fn('round',sequelize.fn('avg',sequelize.col('score')),1), 'avg_score'],[sequelize.fn('count',sequelize.col('*')),'review_cnt']],
      include:{
        model : User,
        attributes: ['profile_img'],
      },
      group :['target'], 
      order:[[sequelize.fn('avg',sequelize.col('score')),'DESC']],
      limit : 9,
    })
    
    for (const r of reviews) {
      r.dataValues.abc = "abc"
      console.log(r.dataValues);
    }

    res.json({result:"Success", reviews:reviews})
  } catch (err) {
    console.log('recommendController.js recommend_by_score method\n ==> ' + err)
    res.status(500).json({ result: 'Fail', detail: '500 Internal Server Error' })
  }
}

