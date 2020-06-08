import sequelize from 'sequelize'
import { Review, User } from '../models'

export const review_statistics = async (req, res) => {
    try {
        const { stylist_id } = req.query;

        let query = "select month(createdAt) month, count(if(score=1,score,null)) 'score_1',\
        count(if(score=2,score,null)) 'score_2',count(if(score=3,score,null))\
        'score_3',count(if(score=4,score,null)) 'score_4',count(if(score=5,score,null)) 'score_5'\
        from review where target = :stylist_id and createdAt > subdate(now(), INTERVAL 3 MONTH)\
        group by month;";

        let score_info = await Review.sequelize.query(query, {
            replacements: { stylist_id: stylist_id },
            type: sequelize.QueryTypes.SELECT
        })
        console.log(score_info);
        res.json({ state: "Success", info: score_info })
    } catch (err) {
        console.log(err);
        res.status(500).json({ result: "Fail", detail: "500 Internal Server Error" });
    }
}

export const consult_statistics = async (req, res) => {
    try {
        const { stylist_id } = req.query;

        let query = "select month(createdAt) month, count(if(category like 'coordi',category,null))  'coordi',\
        count(if(category like 'my',category,null))  'my'\
        from consult where stylist_id = :stylist_id and state like 'COMPLETE'\
        and createdAt > subdate(now(), INTERVAL 3 MONTH)\
        group by month;";

        let review_info = await Review.sequelize.query(query, {
            replacements: { stylist_id: stylist_id },
            type: sequelize.QueryTypes.SELECT
        })
        console.log(review_info);
        res.json({ state: "Success", info: review_info })
    } catch (err) {
        console.log(err);
        res.status(500).json({ result: "Fail", detail: "500 Internal Server Error" });
    }
}

export const score_statistics = async (req, res) => {
    try {
        const { stylist_id } = req.query;

        let query = "select count(if(score=1,score,null)) 'score_1',\
        count(if(score=2,score,null)) 'score_2',count(if(score=3,score,null))\
        'score_3',count(if(score=4,score,null)) 'score_4',count(if(score=5,score,null)) 'score_5'\
        from review where target = :stylist_id;"

        let score_info = await Review.sequelize.query(query, {
            replacements: { stylist_id: stylist_id },
            type: sequelize.QueryTypes.SELECT,
            raw: true
        });
        console.log(score_info[0]);
        
        res.json({ state: "Success", info: score_info[0] })
    } catch (err) {
        console.log(err);
        res.status(500).json({ result: "Fail", detail: "500 Internal Server Error" });
    }
}