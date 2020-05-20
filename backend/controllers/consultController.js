import { Consult } from "../models"
import { User } from "../models"
import {Op} from "Sequelize"
// 유저 생성
export const create_consult = async function (req, res, err) {

    try {
        // body로 부터 param 추출
        const {
            target, req_user, category, gender, top, bottom, want, current_img, height, weight, price, contents, start_time, end_time
        } = req.body;

        //////// 요청 대상 확인
        // 특정 대상이 존재할 경우
        if(target){
            const {
                type, gender, age, nickname, profile_img, platform, api_id, name, belong, occupation, phone,
            } = target;
            // 올바른 대상인지 확인
            const user_exist = await User.findOne({where:{api_id:api_id}})
            if(type !== 'stylist' || !user_exist){
                console.log("consultController.js's create_consult method occurred error. Couldn't find target.")
                throw new Error("You select a wrong target. It is a incorrect stylist.")
            }else{
                Consult.create({

                })
            }
        }
        // 특정 대상이 존재하지 않은 경우
        else {
            const new_consult = await consult.create({
                type, gender, age, nickname, profile_img, platform, api_id, name, belong, occupation,phone
            });

            if (new_user) {
                res.json({ result: "Success", user: new_user });
            } else {
                res.json({ result: "Fail", detail: "not create" });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ result: "Fail", detail: "500 Internal Server Error" });
    }
}
// 상담요청 생성
export const update_consult = (req, res) => {}
// 상담요청 삭제
export const delete_consult = (req, res) => {}
// 스타일리스트 지정 없이 요청한 전체 상담리스트
export const read_consults = (req, res) => {}
// 내가 상담요청한 목록
export const read_myconsults = (req, res) => {}
// 상담 검색
export const search_consults = (req, res) => {}
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



