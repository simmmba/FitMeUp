import { user } from "../models"

// 유저 생성
export const create_user = async function (req, res, ) {

    try {
        // body로 부터 param 추출
        const {
            type, gender, age, nickname, profile_img, platform, api_id, name, phone,
        } = req.body;

        // 가입된 회원 여부 확인
        const user_exist = await user.findOne({ where: { api_id: api_id } })
        
        if (user_exist) {
            // res.json( {state: "Fail", detail: "user exist"});
            throw new Error("user exist");
        }
        else {
            const new_user = await user.create({
                type, gender, age, nickname, profile_img, platform, api_id, name, phone
            });

            if (new_user) {
                res.json({ state: "Success", user: new_user });
            } else {
                res.json({ state: "Fail", detail: "not create" });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ state: "Fail", detail: "500 Internal Server Error" });
    }
}

export const read_user = async (req, res) => {
    try {

        const { api_id, platform } = req.query
        const user_find = await user.findOne({ where: { api_id, platform } })
        // delete user.dataValues.password
        // delete user.dataValues.auth
        if (user_find) {
            res.json({ state: "Success", user: user_find });
        } else {
            res.json({ state: "Fail", detail: "user not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ state: "Fail", detail: "500 Internal Server Error" });
    }
}

export const update_user = async (req, res) => {
    try {
        const { type, gender, age, nickname, profile_img, platform, api_id, name, phone } = req.body.user;
        
        console.log(req.body);
        
        let user_update = await user.update({ type, gender, age, nickname, profile_img, platform,name, phone }, {
            where: { api_id}
        })
        
        res.json({state :" Success", user: req.body.user})

    } catch (err) {
        console.log(err);
        res.status(500).json({ state: "Fail", detail: "500 Internal Server Error" });
    }
}

export const delete_user = async (req, res) => {
    const {api_id} = req.body
    try {
        let user_delete = await user.destroy({ where: {api_id} })
        res.json({state:"Success"});
    } catch (err) {
        console.log(err);
        res.status(500).json({ state: "Fail", detail: "500 Internal Server Error" });
    }
}









