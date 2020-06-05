import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { inject, observer } from "mobx-react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import "./ConsultRequireModal.scss";

const ConsultRequireModal = ({ setConsult, reset, stylist_id, stylist_nickname, coordi_price, my_price, consult, setStylist, setPrice }) => {
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [finishedShow, setFinishedShow] = useState(false);
  const [creditShow, setCreditShow] = useState(false);
  const [resultShow, setResultShow] = useState(false);
  const [remainPoint, setRemainPoint] = useState(user.credit);
  const [usePoint, setUsePoint] = useState(0);
  console.log(user);

  const handleRequire = () => {
    // 포인트가 있는지 확인
    if ((consult.category === "coordi" && user.credit < coordi_price) || (consult.category === "my" && user.credit < my_price)) {
      setFinishedShow(false);
      setCreditShow(true);
    } else {
      // 상담 요청
      axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/consult/req`,
        data: {
          stylist_id: stylist_id,
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

          // 상담 이미지 등록
          axios({
            method: "post",
            url: `${process.env.REACT_APP_URL}/upload/consult?consult_id=${id}`,
            data: img,
          })
            .then(() => {
              console.log("사진 등록 성공");
              const price = consult.category === "coordi" ? coordi_price : my_price;
              setUsePoint(price);

              // 포인트 출금
              axios({
                method: "post",
                url: `${process.env.REACT_APP_URL}/payment/checkout`,
                data: { source_id: user.id, target_id: stylist_id, amount: price },
              })
                .then((res) => {
                  console.log(res);
                  console.log("포인트 출금 성공");
                  setRemainPoint(res.data.credit);
                  setFinishedShow(false);
                  setResultShow(true);
                  reset();
                })
                .catch((error) => {
                  alert("포인트 출금에 실패했습니다.");
                });
            })
            .catch((error) => {
              alert("사진 등록에 실패했습니다.");
            });
        })
        .catch((error) => {
          alert("상담 요청에 실패했습니다.");
        });
    }
  };

  const handleShow = () => {
    if (consult.finished) {
      setFinishedShow(true);
    } else {
      setShow(true);
    }
  };

  const handleClose = () => {
    if (show) {
      setShow(false);
    } else if (finishedShow) {
      setFinishedShow(false);
    } else if (resultShow) {
      setResultShow(false);
    } else if (creditShow) {
      setCreditShow(false);
    }
  };

  return (
    <div className="PortfolioConsultRequireModal">
      <div className="apply" onClick={handleShow}>
        상담 신청하기
      </div>

      {/* 추천 선택, 상담 내용 작성하러 가기 모달 */}
      <Modal className="m" show={show} onHide={handleClose} centered>
        <Modal.Header className="mHeader" closeButton></Modal.Header>
        <Modal.Body className="body">
          <div className="mentionTop">스타일리스트에게 상담 받기 위해</div>
          <div className="mentionTop">원하는 서비스를 선택해주세요!</div>
          <div className="mentionBottom">47,505명의 스타일리스트가 활동 중이에요.</div>
          <button
            className="selectBtn"
            onClick={() => {
              if (user) {
                if (user.credit < coordi_price) {
                  setShow(false);
                  setCreditShow(true);
                } else {
                  setConsult("category", "coordi");
                  setStylist(stylist_id);
                  setPrice(coordi_price);
                  reset();
                  history.push("/consult");
                }
              } else {
                alert("로그인 후 핏미업 서비스를 이용해보세요!");
                setShow(false);
                history.push("/login");
              }
            }}
          >
            코디 추천 받기
          </button>
          <button
            className="selectBtn"
            onClick={() => {
              if (user) {
                if (user.credit < my_price) {
                  setShow(false);
                  setCreditShow(true);
                } else {
                  setConsult("category", "my");
                  setStylist(stylist_id);
                  setPrice(my_price);
                  reset();
                  history.push("/consult");
                }
              } else {
                alert("로그인 후 핏미업 서비스를 이용해보세요!");
                setShow(false);
                history.push("/login");
              }
            }}
          >
            내 옷 추천 받기
          </button>
          <br />
          <br />
        </Modal.Body>
      </Modal>

      {/* 스타일리스트에게 작성한 상담 내용 전송 모달 */}
      <Modal className="m" show={finishedShow} onHide={handleClose} centered>
        <Modal.Header className="mHeader" closeButton></Modal.Header>
        <Modal.Body className="body">
          <div className="mentionTop">작성한 상담 요청이 있습니다.</div>
          <div className="mentionTop">요청을 전송하시겠습니까?</div>
          <br />
          <br />
          <button className="selectBtn" onClick={handleRequire}>
            작성한 내용 전송하기
          </button>
          <button
            className="selectBtn"
            onClick={() => {
              setFinishedShow(false);
              setShow(true);
            }}
          >
            새로운 요청 작성하기
          </button>
          <br />
          <br />
        </Modal.Body>
      </Modal>

      {/* 요청 성공 모달 */}
      <Modal className="m" show={resultShow} onHide={handleClose} centered>
        <Modal.Header className="mHeader" closeButton></Modal.Header>
        <Modal.Body className="body">
          <div className="mentionTop">{stylist_nickname} 스타일리스트에게</div>
          <div className="mentionTop">상담요청 되었습니다.</div>
          <br />
          <br />
          <div className="mentionTop">
            사용 포인트 : <big>{usePoint}</big> Point
          </div>
          <div className="mentionTop">
            잔여 포인트 : <big>{remainPoint}</big> Point
          </div>
          <br />
          <br />
          <Link to={"/"} className="selectBtn">
            메인으로 돌아가기
          </Link>
          <button
            className="selectBtn"
            onClick={() => {
              history.goBack();
            }}
          >
            목록으로 돌아가기
          </button>
          <br />
          <br />
        </Modal.Body>
      </Modal>

      {/* 포인트 부족 모달 */}
      <Modal className="m" show={creditShow} onHide={handleClose} centered>
        <Modal.Header className="mHeader" closeButton></Modal.Header>
        <Modal.Body className="body">
          <div className="mentionTop">포인트가 부족합니다.</div>
          <br />
          <div className="mentionTop">
            보유 포인트 : <big>{user.credit}</big> Point
          </div>
          <br />
          <br />
          <Link to={"/mypage"} className="selectBtn">
            포인트 충전하기
          </Link>
          <button
            className="selectBtn"
            onClick={() => {
              history.goBack();
            }}
          >
            목록으로 돌아가기
          </button>
          <br />
          <br />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default inject(({ consultRequire }) => ({
  setConsult: consultRequire.setConsult,
  reset: consultRequire.reset,
  consult: consultRequire.consult,
  stylist: consultRequire.stylist,
  setStylist: consultRequire.setStylist,
  setPrice: consultRequire.setPrice,
}))(observer(ConsultRequireModal));
