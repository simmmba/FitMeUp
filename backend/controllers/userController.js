import { User, Portfolio, Portfolio_tags, Consult, Review } from '../models'
import { Op } from 'sequelize'
import sequelize from 'sequelize'

// 유저 생성
export const create_user = async function (req, res, ) {

    try {
        // body로 부터 param 추출
        let {
            type, gender, age, nickname, profile_img, platform, api_id, name, belong, occupation, phone,
        } = req.body;

        // 가입된 회원 여부 확인
        const user_exist = await User.findOne({ where: { api_id: api_id } })

        if (user_exist) {
            // res.json( {result: "Fail", detail: "user exist"});
            throw new Error("user exist");
        }
        else {
            phone = phone == '' ? null : phone;
            const new_user = await User.create({
                type, gender, age, nickname, profile_img, platform, api_id, name, belong, occupation, phone
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
        const user_find = await User.findOne({ where: { id: user_id } })
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
        const { type, gender, age, nickname, profile_img, platform, api_id, name, phone, height, weight, top, bottom } = req.body;


        let user_update = await User.update({ type, gender, age, nickname, profile_img, platform, name, phone, height, weight, top, bottom }, {
            where: { api_id }
        })

        res.json({ result: " Success", user: req.body.user })

    } catch (err) {
        console.log(err);
        res.status(500).json({ result: "Fail", detail: "500 Internal Server Error" });
    }
}

export const delete_user = async (req, res) => {
    const { id } = req.body
    try {
        let user_delete = await User.destroy({ where: { id } })
        res.json({ result: "Success" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ result: "Fail", detail: "500 Internal Server Error" });
    }
}

export const login = async (req, res) => {
    try {

        const { api_id, platform } = req.body
        let user_find = await User.findOne({ where: { api_id, platform } })
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

export const join_check = async (req, res) => {
    try {

        const { api_id, platform } = req.body
        let user_find = await User.findOne({ where: { api_id, platform } })
        if (user_find) {
            res.json({ result: "Success", detail: "Yes" });
        } else {
            res.json({ result: "Success", detail: "No" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ result: "Fail", detail: "500 Internal Server Error" });
    }
}



export const dup_nickname = async (req, res) => {
    try {
        const { nickname } = req.query
        let is_exist = await User.findOne({ where: { nickname } })

        if (is_exist) {
            res.json({ result: "Success", isDuplicate: true })
        } else {
            res.json({ result: "Success", isDuplicate: false })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ result: "Fail", detail: "500 Internal Server Error" });
    }
}

export const stylist_list = async (req, res) => {
    try {
        let list = await User.findAll({ where: { type: "stylist" } })

        res.json({ result: "Success", stylists: list })

    } catch (err) {
        console.log(err);
        res.status(500).json({ result: "Fail", detail: "500 Internal Server Error" });
    }
}

export const search = async (req, res) => {
    try {
        const { option, keyword, filter } = req.query;

        let stylist_search;
        let word = '%' + keyword + '%'
        if (option === "nickname") {
            stylist_search = await User.findAll({ where: { nickname: { [Op.like]: word }, type: "stylist" } })
            let search_list = new Array();
            
            // for (let i = 0; i < stylist_search.length;i++){
            //     search_list[search_list.length] = stylist_search[i].dataValues;
            // }
            for (const s of stylist_search) {
                search_list.push(s.dataValues)
            }
            console.log(search_list.length);
            console.log(typeof(search_list));
            
            search_list.sort( function(a, b) {
                // console.log(a.dataValues);
                // let stylist_id = a.dataValues.id;
                // avg_score = await Review.findOne({ 
                //     attributes : [[sequelize.fn('avg', sequelize.col('score'))]],
                //     where: { stylist_id: stylist_id } ,
                //     group : ['stylist_id'],
                //     order : [[sequelize.fn('avg', sequelize.col('score')),'DESC']]
                // })

                // a.dataValues.avg_score = avg_score;
                // b.dataValues.avg_score = avg_score;
                console.log(b.id - a.id);
                return  b.id - a.id;
            });
            console.log(search_list);
            


            // let test = await User.findAll({
            //     attributes : [[sequelize.fn('round', sequelize.fn('avg', sequelize.col('score')), 1), 'avg_score']],
            //     include: [{ model: Portfolio , include:[Portfolio_tags]}, { model: Review }, { model: Consult }],
            //     where: { nickname: { [Op.like]: word }, type: "stylist" },
            //     group : ['user.id']
            // })

            // console.log(test[0]);

        } else if (option === "tag") {
            console.log(word);

            let test = await User.findAll({
                include: [
                    {
                        model: Portfolio,
                        include: [{ model: Portfolio_tags, where: { tag: { [Op.like]: word } } }],
                        require: true
                    },
                    // { model: Review }, 
                    // { model: Consult }
                ],
                where: { type: "stylist" },
            })

            // for (const t of test[0].dataValues.Portfolios[0].dataValues.Portfolio_tags) {
            //     console.log(t.dataValues);
            // }



            // stylist_search = await User.findAll({
            //     where: {
            //         [Op.or]: [
            //             { nickname: { [Op.like]: word } },
            //             { name: { [Op.like]: word } },
            //             { belong: { [Op.like]: word } }
            //         ]
            //         , type: "stylist"
            //     }
            // })
        }
        res.json({ result: "Success", stylists: stylist_search })

    } catch (err) {
        console.log(err);
        res.status(500).json({ result: "Fail", detail: "500 Internal Server Error" });
    }
}

export const dup_phone = async (req, res) => {
    try {
        const { phone } = req.query
        let is_exist = await User.findOne({ where: { phone } })
        console.log(is_exist);

        if (is_exist) {
            res.json({ result: "Success", isDuplicate: true })
        } else {
            res.json({ result: "Success", isDuplicate: false })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ result: "Fail", detail: "500 Internal Server Error" });
    }
}

