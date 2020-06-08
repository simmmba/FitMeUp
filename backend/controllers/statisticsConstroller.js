import sequelize from 'sequelize'
import { Review, User,Payment, Consult} from '../models'

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
        res.json({ result: "Success", info: score_info })
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

        let consult_info = await Consult.sequelize.query(query, {
            replacements: { stylist_id: stylist_id },
            type: sequelize.QueryTypes.SELECT
        })
        res.json({ result: "Success", info: consult_info })
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
        
        res.json({ result: "Success", info: score_info[0] })
    } catch (err) {
        console.log(err);
        res.status(500).json({ result: "Fail", detail: "500 Internal Server Error" });
    }
}

export const payment_statistics = async (req, res) => {
    try {
        const { stylist_id } = req.query;

        let query = "select month(createdAt) month, sum(if(type like 'income',amount,0)) 'income',\
        sum(if(type like 'checkout',amount,0)) 'checkout'\
        from payment where source = :stylist_id and createdAt > subdate(now(), INTERVAL 3 MONTH)\
        group by month;"

        let payment_info = await Payment.sequelize.query(query, {
            replacements: { stylist_id: stylist_id },
            type: sequelize.QueryTypes.SELECT,
            raw: true
        });
        
        res.json({ result: "Success", info: payment_info })
    } catch (err) {
        console.log(err);
        res.status(500).json({ result: "Fail", detail: "500 Internal Server Error" });
    }
}