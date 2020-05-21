import { User } from '../models'
import { Review } from '../models'
import { Op } from 'Sequelize'

// 리뷰 생성
export const create_review = (req, res) => {
  try {
    // body로 부터 param 추출
    const { source, target, consult_id, contents, score } = req.body

    // 이미 후기를 등록했는지 확인
    Review.findOne({
      where: {
        consult_id: consult_id,
        source: source.id
      }
    }).then(review => {
      if (review) {
        res.json({ result: 'Fail', message: '이미 후기를 등록했습니다' })
      } else {
        Review.create({
          source: source.id,
          target: target.id,
          consult_id: consult_id,
          contents: contents,
          score: score
        }).then(() => {
          res.json({ result: 'Success' })
        })
      }
    })
  } catch (err) {
    console.log('reviewController.js create_review method\n ==> ' + err)
    res
      .status(500)
      .json({ result: 'Fail', detail: '500 Internal Server Error' })
  }
}

// 리뷰 확인
export const read_reviews = (req, res) => {
  try {
    // path로부터 query 추출
    const { user_id } = req.query

    Review.findAll({
      where: {
        source: user_id
      }
    }).then(reviews => {
      res.json({ result: 'Fail', list: reviews })
    })
  } catch (err) {
    console.log('reviewController.js read_reviews method\n ==> ' + err)
    res
      .status(500)
      .json({ result: 'Fail', detail: '500 Internal Server Error' })
  }
}

// 리뷰 수정
export const read_reviews = (req, res) => {
  try {
    // body로 부터 param 추출
    const { review_id, contents, score } = req.query

    Review.findAll({
      where: {
        source: user_id
      }
    }).then(reviews => {
      res.json({ result: 'Fail', list: reviews })
    })
  } catch (err) {
    console.log('reviewController.js read_reviews method\n ==> ' + err)
    res
      .status(500)
      .json({ result: 'Fail', detail: '500 Internal Server Error' })
  }
}