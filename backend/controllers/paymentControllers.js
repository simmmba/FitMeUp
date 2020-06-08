import { User, Payment } from "../models"
import { Op } from "sequelize"

export const charge = async function (req, res, ) {

    try {
        // body로 부터 param 추출
        const { user_id, amount } = req.body;
        let credit = await User.findOne({ attributes: ['credit'], where: { id: user_id },raw:true})
        let credit_charged = parseInt(credit.credit) + parseInt(amount);
        let user = User.update({ credit: credit_charged }, { where: { id: user_id } })
        let payment = await Payment.create({ source: user_id, type: "charge", amount })
        

        res.json({ result: "Success" , credit:credit_charged })
    } catch (err) {
        console.log(err);
        res.status(500).json({ result: "Fail", detail: "500 Internal Server Error" });
    }
}

export const checkout = async (req, res) => {
    try {
        const { source_id, target_id, amount } = req.body
        
        let current_credit = await User.findOne({ attributes: ['credit'], where: { id: source_id }, raw:true })
        let checkout_credit = parseInt(current_credit.credit) - parseInt(amount);
        
        if (checkout_credit >= 0) {
            // 사용자 결제
            let user = User.update({ credit: checkout_credit }, { where: { id: source_id } })
            let payment = await Payment.create({ source: source_id,target : target_id, type: "checkout", amount })
            
            // 스타일리스트
            let stylist_credit = await User.findOne({ attributes: ['credit'], where: { id: target_id } })
            let stylist_checkout_credit = parseInt(stylist_credit.dataValues.credit) + parseInt(amount)
            let stylist = User.update({ credit: stylist_checkout_credit }, { where: { id: target_id } })
            let stylist_payment = await Payment.create({ source: target_id, target: source_id, type: "income", amount })
            
            res.json({ result : "Success" , credit : checkout_credit})
        } else {
            res.json({ result : "Fail", detail :"Amount exceeds currunt credit"})
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ result: "Fail", detail: "500 Internal Server Error" });
    }
}

export const withdraw = async (req, res) => {
    try {
        const {source_id, amount} = req.body;
        let current_credit = await User.findOne({ attributes: ['credit'], where: { id: source_id } ,raw:true})
        let withdraw_credit = parseInt(current_credit.credit) - parseInt(amount);
        
        if(withdraw_credit >= 0){
            let user = User.update({ credit: withdraw_credit }, { where: { id: source_id } })
            let payment = await Payment.create({ source: source_id, type: "withdraw", amount })
            res.json({result:"Success" , credit : withdraw_credit})
        }else{
            res.json({ result : "Fail", detail :"Amount exceeds currunt credit"})
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ result: "Fail", detail: "500 Internal Server Error" });
    }
}
    
export const payment_list = async (req,res) => {
    try {
        const {user_id} = req.query;
        
        let payments = await Payment.findAll({
            where : {source : user_id},
            // order :[['createdAt','DESC']],
            raw : true
        })

        for (const payment of payments) {
            let user_id = payment.source;
            let stylist_id = payment.target;
            let user,stylist;
            
            if(user_id)
                user = await User.findOne({where :{id : user_id}})
            if(stylist_id)
                stylist= await User.findOne({where : { id: stylist_id}})

            payment.user = user ? user : null;
            payment.stylist = stylist ? stylist : null;
        }

        res.json({result : "Success", payments : payments})
    } catch (err) {
        console.log(err);
        res.status(500).json({ result: "Fail", detail: "500 Internal Server Error" });
    }
}
