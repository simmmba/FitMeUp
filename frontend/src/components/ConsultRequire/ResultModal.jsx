import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { inject, observer } from "mobx-react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import "./ResultModal.scss";

const ResultModal = ({ consult, reset, setKeyword }) => {
  const history = useHistory();
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleClick = () => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/consult/req`,
      data: {
        stylist_id: consult.stylist_id,
        user_id: JSON.parse(window.sessionStorage.getItem("user")).id,
        category: consult.category, // 코디 추천 / 내옷 코디
        gender: consult.gender, // 1-1. 성별 (필수)
        age: consult.age, // 1-2. 나이 (필수)
        top: consult.top, // 2-1. 상의 사이즈 (선택, 성별에 따라 다르게 보이도록)
        bottom: consult.bottom, // 2-2. 하의 사이즈 (선택, 성별에 따라 다르게 보이도록)
        height: consult.height, // 2-3. 키 (선택)
        weight: consult.weight, // 2-4. 몸무게 (선택)
        want: consult.want, // 3. 원하는 스타일 (필수, 성별에 따라 다르게 보이도록)
        budget: consult.budget, // 5. 예산 (선택)
        start_time: consult.start_time, // 6-1. 상담 가능 시작 시간 (선택)
        end_time: consult.end_time, // 6-2. 상담 가능 종료 시간 (선택)
        contents: consult.contents, // 7. 추가 참고사항(직업, 특수 목적 등)
      },
    })
      .then((res) => {
        const id = res.data.consult.id;
        const currImg = consult.current_img;

        let img = new FormData();
        // 이미지 추가
        for (let i = 0; i < currImg.length; i++) {
          img.append("img", currImg[i]);
        }

        axios({
          method: "post",
          url: `${process.env.REACT_APP_URL}/upload/consult?consult_id=${id}`,
          data: img,
        })
          .then((res) => {
            console.log("사진 등록 성공");
          })
          .catch((error) => {
            alert("사진 등록에 실패했습니다.");
          });
      })
      .catch((error) => {
        alert("상담 요청에 실패했습니다.");
      });

    if (consult.stylist_id !== null) {
      alert("선택한 스타일리스트에게 상담 요청되었습니다. \n스타일리스트의 연락을 기다려주세요.");
      reset();
      history.push("/");
    } else {
      alert("현재 활동 중인 스타일리스트에게 상담 요청되었습니다. \n스타일리스트의 연락을 기다려주세요.");
    }
  };

  const handleSearch = () => {
    setKeyword(consult.want[0].val);
  };

  return (
    <>
      {/* <div className="finalBtn"> */}
      <button className="reqBtn" onClick={consult.stylist_id === null ? handleShow : handleClick}>
        상담 요청하기
      </button>
      {/* </div> */}

      <Modal className="m" show={show} onHide={handleClose} centered>
        <Modal.Header className="mHeader" closeButton></Modal.Header>
        <Modal.Body className="body">
          <div className="Result">
            <div className="service">원하는 요청을 선택해 주세요</div>
            <Link to="/" className="reqBtn" onClick={handleClick}>
              스타일리스트의 상담 연락 기다리기
            </Link>
            <Link to="/search" className="reqBtn" onClick={handleSearch}>
              스타일리스트를 추천받아 직접 요청하기
            </Link>
            <br />
            <br />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default inject(({ consultRequire, search }) => ({
  consult: consultRequire.consult,
  reset: consultRequire.reset,
  setKeyword: search.setKeyword,
}))(observer(ResultModal));
