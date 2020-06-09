import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { inject, observer } from "mobx-react";
import axios from "axios";
import { OverlayTrigger, Popover, Modal } from "react-bootstrap";
import "./ResultModal.scss";

const ResultModal = ({ setConsult, consult, reset, setKeyword, stylist, setStylist, price, setPrice }) => {
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [resultShow, setResultShow] = useState(false);
  const [remainPoint, setRemainPoint] = useState(user.credit);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    if (show) {
      setShow(false);
    } else if (resultShow) {
      setResultShow(false);
      setStylist(null);
      setPrice(0);
      reset();
      history.push("/");
    }
  };

  const handleRequire = (success) => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/consult/req`,
      data: {
        stylist_id: stylist,
        user_id: user.id,
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
          .then(() => {
            console.log("사진 등록 성공");

            if (success) {
              setResultShow(true);
            } else {
              alert("현재 활동 중인 스타일리스트에게 상담 요청되었습니다. \n스타일리스트의 연락을 기다려주세요.");
              reset();
            }
          })
          .catch((error) => {
            alert("사진 등록에 실패했습니다.");
          });
      })
      .catch((error) => {
        alert("상담 요청에 실패했습니다.");
      });
  };

  const handleClick = () => {
    if (stylist !== null) {
      // 포인트 출금
      axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/payment/checkout`,
        data: { source_id: user.id, target_id: stylist, amount: price },
      })
        .then((res) => {
          if (res.data.result === "Success") {
            console.log("포인트 출금 성공");
            setRemainPoint(res.data.credit);
            handleRequire(true);
          } else {
            console.log("포인트 출금 실패");
          }
        })
        .catch((error) => {
          alert("포인트 출금에 실패했습니다.");
        });
    } else {
      alert("현재 활동 중인 스타일리스트에게 상담 요청되었습니다. \n스타일리스트의 연락을 기다려주세요.");
      reset();
    }
  };

  const handleSearch = () => {
    setKeyword(consult.want[0].val);
    setConsult("finished", true);
  };

  return (
    <>
      <button className="reqBtn" onClick={stylist === null ? handleShow : handleClick}>
        상담 요청하기
      </button>

      {/* 요청 모달 */}
      <Modal className="m" show={show} onHide={handleClose} centered>
        <Modal.Header className="mHeader" closeButton></Modal.Header>
        <Modal.Body className="body">
          <div className="Result">
            <div className="service">원하는 방식을 선택해 주세요</div>
            <OverlayTrigger
              placement="right"
              overlay={
                <Popover id="popover-basic">
                  <Popover.Title as="h3">스타일리스트 기다리기!</Popover.Title>
                  <Popover.Content>
                    모든 스타일리스트들에게 <br />
                    나의 상담 내용이 게시됩니다. <br />
                    스타일리스트의 연락을 기다려주세요.
                  </Popover.Content>
                </Popover>
              }
            >
              <Link to="/" className="reqBtn" onClick={() => handleRequire(false)}>
                스타일리스트 기다리기!
              </Link>
            </OverlayTrigger>
            <OverlayTrigger
              placement="right"
              overlay={
                <Popover id="popover-basic">
                  <Popover.Title as="h3">스타일리스트 알아보기!</Popover.Title>
                  <Popover.Content>
                    작성한 내용에 맞는 <br />
                    스타일리스트를 검색해 <br />
                    직접 상담 요청할 수 있습니다.
                  </Popover.Content>
                </Popover>
              }
            >
              <Link to="/search" className="reqBtn" onClick={handleSearch}>
                스타일리스트 알아보기!
              </Link>
            </OverlayTrigger>
            <br />
            <br />
          </div>
        </Modal.Body>
      </Modal>

      {/* 요청 성공 모달 */}
      <Modal className="m" show={resultShow} onHide={handleClose} centered>
        <Modal.Header className="mHeader" closeButton></Modal.Header>
        <Modal.Body className="body">
          <div className="mentionTop">스타일리스트에게</div>
          <div className="mentionTop">상담요청 되었습니다.</div>
          <br />
          <br />
          <div className="mentionTop">
            사용 포인트 : <big>{price}</big> Point
          </div>
          <div className="mentionTop">
            잔여 포인트 : <big>{remainPoint}</big> Point
          </div>
          <br />
          <br />
          <Link
            to={"/"}
            className="selectBtn"
            onClick={() => {
              setStylist(null);
              setPrice(0);
              reset();
            }}
          >
            메인으로 돌아가기
          </Link>
          <br />
          <br />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default inject(({ consultRequire, search }) => ({
  reset: consultRequire.reset,
  consult: consultRequire.consult,
  stylist: consultRequire.stylist,
  price: consultRequire.price,
  setConsult: consultRequire.setConsult,
  setStylist: consultRequire.setStylist,
  setPrice: consultRequire.setPrice,
  setKeyword: search.setKeyword,
}))(observer(ResultModal));
