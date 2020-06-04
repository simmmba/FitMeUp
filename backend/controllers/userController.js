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

        res.json({ result: "Success", user: req.body.user })

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
        let { option, keyword, sort } = req.query;
        let stylist_search;
        let search_list;
        option = option ? option : '';
        keyword = keyword ? keyword : '';
        sort = sort ? sort : 'avg_score';

        let word = '%' + keyword + '%'
        if (option === "nickname") {
            stylist_search = await User.findAll({
                where: {
                    nickname: { [Op.like]: word },
                    type: "stylist"
                },
                raw: true
            })
            console.log(stylist_search);

        } else if (option === "tag") {
            let query = "select * from user \
                                where (type = 'stylist') and user.id in (select stylist_id \
                                from portfolio join portfolio_tags\
                                on portfolio.id = portfolio_tags.portfolio_id\
                                where tag like :word)"


            stylist_search = await User.sequelize.query(
                query, {
                replacements: { word: word },
                type: sequelize.QueryTypes.SELECT
            });
        } else {
            let query = "select * from user \
                                where type = 'stylist' and (nickname like :word or user.id in (select stylist_id \
                                from portfolio join portfolio_tags\
                                on portfolio.id = portfolio_tags.portfolio_id\
                                where tag like :word))"


            stylist_search = await User.sequelize.query(
                query, {
                replacements: { word: word },
                type: sequelize.QueryTypes.SELECT
            });
        }
        search_list = await add_info(stylist_search);

        sort_list(search_list, sort);

        res.json({ result: "Success", stylists: search_list })
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

export const most_consulting = async (req,res) =>{
    const {user_id} = req.query;
    let stylist_list = await User.findAll({
        
    })
}

const add_info = async (stylist_search) => {
    let add_list = new Array();

    // 평점, 상담 수, 리뷰 수, 최근 리뷰, 포트폴리오 이미지, 타이틀 붙여 줄 것
    for (const s of stylist_search) {
        let user_id = s.id;
        // 최근 리뷰 달기
        let review = await Review.findOne({
            where: { target: user_id },
            order: ['createdAt'],
            limit: 1,
            raw: true
        })

        if(review){
            let review_user_id = review.id;
            let nickname = await User.findOne({
                where :{id : review_user_id},
                attributes: ['nickname'],
                raw: true
            })
            review.nickname = nickname.nickname;
        }


        s.recent_review = review;
        // 포트폴리오 이미지 타이틀 달기 
        let portfolio = await Portfolio.findOne({
            where: {stylist_id: user_id},
            raw:true
        })
        
        s.portfolio_img = portfolio ? portfolio.main_img : null;
        s.portfolio_title = portfolio ? portfolio.title : null;

        //평점 달기, 리뷰 수 달기
        let review_info = await Review.findOne({
            attributes: [
                [sequelize.fn('avg', sequelize.col('score')), 'avg_score'],
                [sequelize.fn('count', sequelize.col('*')), 'review_cnt'],
            ],
            where: { target: user_id },
            group: ['target'],
            raw: true
        })
        let avg_score = review_info ? review_info.avg_score : 0;
        let review_cnt = review_info ? review_info.review_cnt : 0;
        s.avg_score = avg_score;
        s.review_cnt = review_cnt;
        // 상담 수 달기
        let consult_info = await Consult.findOne({
            attributes: [
                [sequelize.fn('count', sequelize.col('*')), 'consult_cnt']
            ],
            where: { stylist_id: user_id },
            group: ['stylist_id'],
            raw: true
        })

        let consult_cnt = consult_info ? consult_info.consult_cnt : 0;
        s.consult_cnt = consult_cnt;

        add_list.push(s)
    }

    return add_list;
}
//정렬
const sort_list = (list, method) => {
    if (method === 'review_cnt') {
        list.sort((a, b) => {
            return b.review_cnt - a.review_cnt;
        })
    }  else if (method === 'consult_cnt') {
        list.sort((a, b) => {
            return b.consult_cnt - a.consult_cnt;
        })
    } else {
        list.sort((a, b) => {
            return b.avg_score - a.avg_score;
        })
    }


}