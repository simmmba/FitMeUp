import sequelize from 'sequelize'
import { Review, User } from '../models'

export const review_statistics = async (req, res) => {
    try {
        const { stylist_id } = req.query;
        
        let month =  new Date().getMonth()+1;
        for (let i = 0; i < 3; i++) {
            const element = array[i];
            
        }
        
        console.log(month);
        


        let query = "select month(createdAt) mon, count(if(score=1,score,null)) 'score_1',\
        count(if(score=2,score,null)) 'score_2',count(if(score=3,score,null))\
        'score_3',count(if(score=4,score,null)) 'score_4',count(if(score=5,score,null)) 'score_5'\
        from review where target = :stylist_id and createdAt > subdate(now(), INTERVAL 3 MONTH)\
        group by mon;";



        let review_info = await Review.sequelize.query(query, {
            replacements: { stylist_id: stylist_id },
            type: sequelize.QueryTypes.SELECT
        })
        // console.log(review_info);
        res.json({state:"Success", info : review_info})
    } catch (err) {
        console.log(err);
        res.status(500).json({ result: "Fail", detail: "500 Internal Server Error" });
    }
}