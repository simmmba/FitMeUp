import { Consult } from "../models"
import { User } from "../models"
import {Op} from "Sequelize"

// 상담요청 생성
export const create_consult = (req, res) => {
    try {
        // body로 부터 param 추출
        const {
            target, req_user, category, gender, top, bottom, want, current_img, height, weight, price, contents, start_time, end_time
        } = req.body;

        // 특정 대상이 존재할 경우 올바른 대상인지 확인
        if(target){
            User.findOne({where:{api_id:target.api_id}})
                .then((user) =>{
                    if(target['type'] !== 'stylist' || !user){
                        console.log("consultController.js's create_consult method occurred error. Couldn't find target.")
                        throw new Error("You select a wrong target. It is a incorrect stylist.")
                    }
                })
        }
        
        Consult.create({
            target : target? target.user_id:null,
            req_user : req_user.user_id,
            category,
            gender,
            top,
            bottom,
            height,
            weight,
            price,
            contents,
            start_time,
            end_time
        }).then(()=>{
            res.json({result:"Success"})
        })
    } catch (err) {
        console.log("consultController.js create_consult method\n ==> " +err);
        res.status(500).json({ result: "Fail", detail: "500 Internal Server Error" });
    }
}
// 상담요청 수정
export const update_consult = (req, res) => {
    try{
        // 파라미터 추출
        const {
            consult_id, target, req_user, category, gender, top, bottom, want, current_img, height, weight, price, contents, start_time, end_time
        } = req.body;

        Consult.update({
            target : target?target.user_id:null,
            req_user : req_user.user_id,
            category,
            gender,
            top,
            bottom,
            height,
            weight,
            price,
            contents,
            start_time,
            end_time
        },{
            where:{consult_id : consult_id}
        }).then(() => {
            res.json({result:"Success"})
        })
    }catch(err){
        console.log("consultController.js update_consult method\n ==> " +err);
        res.status(500).json({ result: "Fail", detail: "500 Internal Server Error" });
    }
}
// 상담요청 삭제
export const delete_consult = (req, res) => {
    try{
        // 파라미터 추출
        const {
            consult_id, user_id
        } = req.body;

        Consult.destroy({
            where:{consult_id : consult_id, req_id : user_id}
        }).then(() => {
                res.json({result:"Success"})
            })
    }catch(err){
        console.log("consultController.js delete_consult method\n ==> " +err);
        res.status(500).json({ result: "Fail", detail: "500 Internal Server Error" });
    }
}
// 스타일리스트 지정 없이 요청한 전체 상담리스트
export const read_consults = (req, res) => {
    try{
        Consult.findAll({
            where:{state:'wait'}
        })
            .then((consults) => {
                res.json({result:"Success", list: consults})
            })
    }catch(err){
        console.log("consultController.js read_consults method\n ==> " +err);
        res.status(500).json({ result: "Fail", detail: "500 Internal Server Error" });
    }
}
// 내가 상담요청한 목록
export const read_myconsults = (req, res) => {
    try{
        const {user_id} = req.query;
        Consult.findAll({
            where:{req_id:user_id}
        })
            .then((consults) => {
                res.json({result:"Success", list: consults})
            })
    }catch(err){
        console.log("consultController.js read_myconsults method\n ==> " +err);
        res.status(500).json({ result: "Fail", detail: "500 Internal Server Error" });
    }
}
// 상담 검색
export const search_consults = (req, res) => {
    try{
        const {option, keyword} = req.query;
        Consult.findAll({
            where:{req_id:user_id}
        })
            .then((consults) => {
                res.json({result:"Success", list: consults})
            })
    }catch(err){
        console.log("consultController.js read_myconsults method\n ==> " +err);
        res.status(500).json({ result: "Fail", detail: "500 Internal Server Error" });
    }
}
// 스타일리스트에게 요청한 상담리스트
export const read_recv_consults = (req, res) => {}
// 스타일리스트에게 요청한 상담 수락/거절
export const update_recv_consults = (req, res) => {}
// 상담요청에 대한 지원생성
export const create_apply = (req, res) => {}
// 지원리스트
export const read_applies = (req, res) => {}
// 지원 수정
export const update_apply = (req, res) => {}
// 지원 삭제
export const delete_apply = (req, res) => {}



export const read_user = async (req, res) => {
    try {

        const { user_id } = req.query
        const user_find = await user.findOne({ where: { id:user_id } })
        // delete user.dataValues.password
        // delete user.dataValues.auth
        if (user_find) {
            res.json({ result: "Success", user: user_find });
        } else {
            res.json({ result: "Fail", detail: "user not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ result: "Fail", detail: "500 Internal Server Error" });
    }
}

export const update_user = async (req, res) => {
    try {
        const { type, gender, age, nickname, profile_img, platform, api_id, name, phone } = req.body;

        console.log(req.body);

        let user_update = await user.update({ type, gender, age, nickname, profile_img, platform,name, phone }, {
            where: { api_id}
        })

        res.json({result :" Success", user: req.body.user})

    } catch (err) {
        console.log(err);
        res.status(500).json({ result: "Fail", detail: "500 Internal Server Error" });
    }
}

export const delete_user = async (req, res) => {
    const {api_id} = req.body
    try {
        let user_delete = await user.destroy({ where: {api_id} })
        res.json({result:"Success"});
    } catch (err) {
        console.log(err);
        res.status(500).json({ result: "Fail", detail: "500 Internal Server Error" });
    }
}

export const login = async (req, res) => {
    try {

        const { api_id, platform } = req.query
        let user_find = await user.findOne({ where: { api_id, platform } })
        // delete user.dataValues.password
        // delete user.dataValues.auth
        if (user_find) {
            res.json({ result: "Success", user: user_find });
        } else {
            res.json({ result: "Fail", detail: "user not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ result: "Fail", detail: "500 Internal Server Error" });
    }
}

export const duplicate = async (req,res) => {

    try {
        const {nickname} = req.query
        let is_exist = await user.findOne({where : {nickname}})
        console.log(is_exist);

        if(is_exist){
            res.json({result : "Success", isDuplicate : false})
        }else{
            res.json({result : "Success", isDuplicate : true})
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ result: "Fail", detail: "500 Internal Server Error" });
    }

}

export const stylist_list = async (req, res) => {
    try {
        let list = await user.findAll({where:{type:"stylist"}})

        res.json({result : "Success", stylists : list})

    } catch (err) {
        console.log(err);
        res.status(500).json({ result: "Fail", detail: "500 Internal Server Error" });
    }
}

export const search = async (req, res) => {
    try {
        const {option, keyword} = req.query;
        let stylist_search;
        let word = '%'+keyword+'%'
        if(option === "nickname"){
            stylist_search = await user.findAll({where:{nickname:{[Op.like]:word}, type:"stylist"}})
        }else{
            stylist_search = await user.findAll({where:{
                    [Op.or]:[
                        {nickname:{[Op.like]:word}},
                        {name:{[Op.like]:word}},
                        {belong:{[Op.like]:word}}
                    ]
                    ,type:"stylist"
                }})
        }
        res.json({result:"Success", stylists:stylist_search})

    } catch (err) {
        console.log(err);
        res.status(500).json({ result: "Fail", detail: "500 Internal Server Error" });
    }
}



