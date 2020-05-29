import { Review, ReviewImage, Consult, User } from "../models";
import { Op } from "sequelize";

// 리뷰 생성
export const create_review = (req, res) => {
  try {
    // body로 부터 param 추출
    const { user_id, consult_id, contents, score, images } = req.body;

    // 이미 후기를 등록했는지 확인
    Review.findOne({
      where: {
        consult_id: consult_id,
        user_id: user_id,
      },
    }).then((review) => {
      if (review) {
        res.json({ result: "Fail", message: "이미 후기를 등록했습니다" });
      } else {
        Consult.findOne({ where: { id: consult_id, user_id: user_id } }).then(
          (consult) => {
            if (!consult) {
              res.json({
                result: "Fail",
                Message: "해당 상담에 대한 사용자가 아닙니다",
              });
              return;
            }
            Review.create({
              user_id: user_id,
              target: consult.stylist_id,
              consult_id: consult_id,
              contents: contents,
              score: score,
            })
              .then(() => {
                // 이미지 등록
                if (images) {
                  for (const image of images) {
                    ReviewImage.create({
                      consult_id: consult_id,
                      image_path: image,
                    });
                  }
                }
              })
              .then(() => {
                res.json({ result: "Success" });
              });
          }
        );
      }
    });
  } catch (err) {
    console.log("reviewController.js create_review method\n ==> " + err);
    res
      .status(500)
      .json({ result: "Fail", detail: "500 Internal Server Error" });
  }
};

// 리뷰 확인
export const read_reviews = (req, res) => {
  try {
    // path로부터 query 추출
    const { user_id } = req.query;

    Review.findAll({
      where: {
        user_id: user_id,
      },
      include: [
        {
          model: ReviewImage,
        },
      ],
    }).then((reviews) => {
      res.json({ result: "Success", list: reviews });
    });
  } catch (err) {
    console.log("reviewController.js read_reviews method\n ==> " + err);
    res
      .status(500)
      .json({ result: "Fail", detail: "500 Internal Server Error" });
  }
};

// 리뷰 수정
export const update_review = (req, res) => {
  try {
    // body로 부터 param 추출
    const { review_id, contents, score, images } = req.body;

    Review.update(
      {
        contents: contents,
        score: score,
      },
      {
        where: {
          id: review_id,
        },
      }
    )
      .then(() => {
        // 기존 이미지 삭제
        ReviewImage.destroy({ where: { review_id: review_id } }).then(() => {
          // 이미지 업데이트
          if (images) {
            for (const image of images) {
              ReviewImage.create({
                review_id: review_id,
                image_path: image,
              });
            }
          }
        });
      })
      .then(() => {
        res.json({ result: "Success" });
      });
  } catch (err) {
    console.log("reviewController.js update_review method\n ==> " + err);
    res
      .status(500)
      .json({ result: "Fail", detail: "500 Internal Server Error" });
  }
};

// 리뷰 삭제
export const delete_review = (req, res) => {
  try {
    // body로 부터 param 추출
    const { review_id } = req.body;

    Review.destroy({
      where: {
        id: review_id,
      },
    }).then(() => {
      res.json({ result: "Success" });
    });
  } catch (err) {
    console.log("reviewController.js delete_review method\n ==> " + err);
    res
      .status(500)
      .json({ result: "Fail", detail: "500 Internal Server Error" });
  }
};

// 나에게 등록된 리뷰 불러오기
export const read_receive_reviews = (req, res) => {
  try {
    // path로 부터 query 추출
    const { user_id } = req.query;

    Review.findAll({
      where: { target: user_id },
      order: [["createdAt", "DESC"]],
    }).then((reviews) => {
      res.json({ result: "Success", list: reviews });
    });
  } catch (err) {
    console.log("reviewController.js read_receive_reviews method\n ==> " + err);
    res
      .status(500)
      .json({ result: "Fail", detail: "500 Internal Server Error" });
  }
};
