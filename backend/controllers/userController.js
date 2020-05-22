import { User } from "../models"
import {Op} from "sequelize"
// 유저 생성
export const create_user = async function (req, res, ) {

    try {
        // body로 부터 param 추출
        const {
            type, gender, age, nickname, profile_img, platform, api_id, name, belong, occupation, phone,
        } = req.body;

        // 가입된 회원 여부 확인
        const user_exist = await User.findOne({ where: { api_id: api_id } })
        
        if (user_exist) {
            // res.json( {result: "Fail", detail: "user exist"});
            throw new Error("user exist");
        }
        else {
            const new_user = await User.create({
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

export const read_user = async (req, res) => {
    try {

        const { user_id } = req.query
        const user_find = await User.findOne({ where: { id:user_id } })
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
        
        
        let user_update = await User.update({ type, gender, age, nickname, profile_img, platform,name, phone }, {
            where: { api_id}
        })
        
        res.json({result :" Success", user: req.body.user})

    } catch (err) {
        console.log(err);
        res.status(500).json({ result: "Fail", detail: "500 Internal Server Error" });
    }
}

export const delete_user = async (req, res) => {
    const {id} = req.body
    try {
        let user_delete = await User.destroy({ where: {id} })
        res.json({result:"Success"});
    } catch (err) {
        console.log(err);
        res.status(500).json({ result: "Fail", detail: "500 Internal Server Error" });
    }
}

export const login = async (req, res) => {
    try {
        
        const { api_id, platform } = req.query
        let user_find = await User.findOne({ where: { api_id, platform } })
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

export const dup_nickname = async (req,res) => {
    try {
        const {nickname} = req.query
        let is_exist = await User.findOne({where : {nickname}})
        console.log(is_exist);
        
        if(is_exist){
            res.json({result : "Success", isDuplicate : true})
        }else{
            res.json({result : "Success", isDuplicate : false})
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ result: "Fail", detail: "500 Internal Server Error" });
    }
} 

export const stylist_list = async (req, res) => {
    try {
        let list = await User.findAll({where:{type:"stylist"}})
        
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
            stylist_search = await User.findAll({where:{nickname:{[Op.like]:word}, type:"stylist"}})
        }else{
            stylist_search = await User.findAll({where:{
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

export const dup_phone = async (req,res) => {
    try {
        const {phone} = req.query
        let is_exist = await User.findOne({where : {phone}})
        console.log(is_exist);
        
        if(is_exist){
            res.json({result : "Success", isDuplicate : true})
        }else{
            res.json({result : "Success", isDuplicate : false})
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ result: "Fail", detail: "500 Internal Server Error" });
    }
} 

