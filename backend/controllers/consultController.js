import { Consult } from "../models";
import { ConsultWant } from "../models";
import { ConsultImage } from "../models";
import { User } from "../models";
import { Apply } from "../models";
import { Op } from "sequelize";
import consultRouter from "../routes/consultRouter";

// 상담요청 생성
export const create_consult = (req, res) => {
  try {
    // body로 부터 param 추출
    const {
      target,
      req_user,
      category,
      gender,
      top,
      bottom,
      want,
      current_img,
      height,
      weight,
      budget,
      contents,
      start_time,
      end_time,
    } = req.body;

    // 특정 대상이 존재할 경우 올바른 대상인지 확인
    if (target) {
      User.findOne({ where: { api_id: target } }).then((user) => {
        if (!user) {
          console.log(
            "consultController.js's create_consult method occurred error. Couldn't find target."
          );
          throw new Error(
            "You select a wrong target. It is a incorrect stylist."
          );
        }
      });
    }

    // 상담 생성
    Consult.create({
      stylist_id: target,
      user_id: req_user,
      category: category,
      gender: gender,
      top: top,
      bottom: bottom,
      height: height,
      weight: weight,
      budget: budget,
      contents: contents,
      start_time: start_time,
      end_time: end_time,
    }).then(async (consult) => {
      // consult_want 테이블에 want 개수만큼 레코드 생성
      await want.forEach((e) => {
        ConsultWant.create({
          consult_id: consult.dataValues.id,
          want: e,
        });
      });
      // consult_image 테이블에 image 개수만큼 레코드 생성
      await current_img.forEach((e) => {
        ConsultImage.create({
          consult_id: consult.dataValues.id,
          image_path: "",
        });
      });
      res.json({ result: "Success" });
    });
  } catch (err) {
    console.log("consultController.js create_consult method\n ==> " + err);
    res
      .status(500)
      .json({ result: "Fail", detail: "500 Internal Server Error" });
  }
};

// 상담 내용 불러오기
export const read_consult = (req, res) => {
  try {
    // query 추출
    const { consult_id, user_id } = req.query;

    Consult.findOne({ where: { id: consult_id } }).then(async (consult) => {
      let want = [];
      let current_img = [];

      // 원하는 스타일 얻어오기
      await ConsultWant.findAll({ where: { consult_id: consult_id } }).then(
        async (wants) => {
          await wants.forEach((e) => {
            want.push(e.dataValues.want);
          });
          consult.dataValues.want = want;
        }
      );

      // 이미지 경로 얻어오기
      await ConsultImage.findAll({
        where: { consult_id: consult_id },
      }).then(async (images) => {
        await images.forEach((e) => {
          current_img.push(e.dataValues.image_path);
        });
        consult.dataValues.current_img = current_img;
      });

      // 이미 신청한 요청인지 확인 -- temp
      res.json({ result: "Success", consult: consult });
    });
  } catch (err) {
    console.log("consultController.js read_consult method\n ==> " + err);
    res
      .status(500)
      .json({ result: "Fail", detail: "500 Internal Server Error" });
  }
};

// 상담요청 수정
export const update_consult = (req, res) => {
  try {
    // param 추출
    const {
      consult_id,
      target,
      req_user,
      category,
      gender,
      top,
      bottom,
      want,
      current_img,
      height,
      weight,
      budget,
      contents,
      start_time,
      end_time,
    } = req.body;

    // 상담 수정
    Consult.update(
      {
        stylist_id: target,
        user_id: req_user,
        category: category,
        gender: gender,
        top: top,
        bottom: bottom,
        height: height,
        weight: weight,
        budget: budget,
        contents: contents,
        start_time: start_time,
        end_time: end_time,
      },
      {
        where: { id: consult_id },
      }
    ).then(async () => {
      // consult_want 테이블에서 consult_id에 해당하는 레코드 삭제 후 재생성
      await ConsultWant.destroy({
        where: { consult_id: consult_id },
      }).then(() => {
        want.forEach((e) => {
          ConsultWant.create({
            consult_id: consult_id,
            want: e,
          });
        });
      });
      // consult_image 테이블에서 consult_id에 해당하는 레코드 삭제 후 재생성
      await ConsultImage.destroy({
        where: { consult_id: consult_id },
      }).then(() => {
        current_img.forEach((e) => {
          ConsultImage.create({
            consult_id: consult_id,
            image_path: "",
          });
        });
      });
      res.json({ result: "Success" });
    });
  } catch (err) {
    console.log("consultController.js update_consult method\n ==> " + err);
    res
      .status(500)
      .json({ result: "Fail", detail: "500 Internal Server Error" });
  }
};
// 상담요청 삭제
export const delete_consult = (req, res) => {
  try {
    // param 추출
    const { consult_id, user_id } = req.body;

    Consult.destroy({
      where: { id: consult_id, user_id: user_id },
    }).then(() => {
      res.json({ result: "Success" });
    });
  } catch (err) {
    console.log("consultController.js delete_consult method\n ==> " + err);
    res
      .status(500)
      .json({ result: "Fail", detail: "500 Internal Server Error" });
  }
};
// 스타일리스트 지정 없이 요청한 전체 상담리스트
export const read_consults = (req, res) => {
  try {
    Consult.findAll({
      where: { state: "wait" },
    }).then((consults) => {
      res.json({ result: "Success", list: consults });
    });
  } catch (err) {
    console.log("consultController.js read_consults method\n ==> " + err);
    res
      .status(500)
      .json({ result: "Fail", detail: "500 Internal Server Error" });
  }
};
// 내가 상담요청한 목록
export const read_myconsults = (req, res) => {
  try {
    const { user_id } = req.query;
    Consult.findAll({
      where: { user_id: user_id },
    }).then((consults) => {
      res.json({ result: "Success", list: consults });
    });
  } catch (err) {
    console.log("consultController.js read_myconsults method\n ==> " + err);
    res
      .status(500)
      .json({ result: "Fail", detail: "500 Internal Server Error" });
  }
};
// 상담 검색 -- temp
export const search_consults = (req, res) => {
  try {
    const { option, keyword } = req.query;
    const word = "%" + keyword + "%";
  } catch (err) {
    console.log("consultController.js search_consults method\n ==> " + err);
    res
      .status(500)
      .json({ result: "Fail", detail: "500 Internal Server Error" });
  }
};
// 스타일리스트에게 요청한 상담리스트
export const read_recv_consults = (req, res) => {
  try {
    const { stylist_id } = req.query;
    Consult.findAll({
      where: { stylist_id: user_id },
    }).then((consults) => {
      res.json({ result: "Success", list: consults });
    });
  } catch (err) {
    console.log("consultController.js read_recv_consults method\n ==> " + err);
    res
      .status(500)
      .json({ result: "Fail", detail: "500 Internal Server Error" });
  }
};
// 스타일리스트에게 요청한 상담 수락/거절
export const update_recv_consults = (req, res) => {
  try {
    const { stylist_id, consult_id, state } = req.body;

    Consult.update(
      {
        state: state,
      },
      {
        where: { id: consult_id },
      }
    ).then(() => {
      res.json({ result: "Success" });
    });
  } catch (err) {
    console.log(
      "consultController.js update_recv_consults method\n ==> " + err
    );
    res
      .status(500)
      .json({ result: "Fail", detail: "500 Internal Server Error" });
  }
};
// 상담요청에 대한 지원생성
export const create_apply = (req, res) => {
  try {
    const { stylist_id, consult_id, contents } = req.body;
    Apply.create({
      stylist_id: stylist_id,
      consult_id: consult_id,
      contents: contents,
    }).then(() => {
      res.json({ result: "Success" });
    });
  } catch (err) {
    console.log("consultController.js create_apply method\n ==> " + err);
    res
      .status(500)
      .json({ result: "Fail", detail: "500 Internal Server Error" });
  }
};
// 지원리스트
export const read_applies = (req, res) => {
  try {
    const { user_id } = req.query;
    Apply.findAll({
      where: { stylist_id: user_id },
    }).then((applies) => {
      res.json({ result: "Success", list: applies });
    });
  } catch (err) {
    console.log("consultController.js read_applies method\n ==> " + err);
    res
      .status(500)
      .json({ result: "Fail", detail: "500 Internal Server Error" });
  }
};
// 지원 수정
export const update_apply = (req, res) => {
  try {
    const { apply_id, contents } = req.body;
    Apply.update(
      {
        contents: contents,
      },
      {
        where: { id: apply_id },
      }
    ).then(() => {
      res.json({ result: "Success" });
    });
  } catch (err) {
    console.log("consultController.js update_apply method\n ==> " + err);
    res
      .status(500)
      .json({ result: "Fail", detail: "500 Internal Server Error" });
  }
};
// 지원 삭제
export const delete_apply = (req, res) => {
  try {
    const { apply_id } = req.body;
    Apply.destroy({
      where: { id: apply_id },
    }).then(() => {
      res.json({ result: "Success" });
    });
  } catch (err) {
    console.log("consultController.js read_applies method\n ==> " + err);
    res
      .status(500)
      .json({ result: "Fail", detail: "500 Internal Server Error" });
  }
};
