import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import "./Withdraw.scss";

import { Form } from "react-bootstrap";

const Withdraw = () => {
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [ongoing, setOngoing] = useState(false);
  const [price, setPrice] = useState(0);
  const [credit, setCredit] = useState(0);

  useEffect(() => {
    get_user();
  }, []);

  const get_user = () => {
    axios.get(`${process.env.REACT_APP_URL}/user/myinfo?user_id=` + user.id).then((res) => {
      setCredit(res.data.user.credit);
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (credit < Number(price)) {
      alert("보유한 포인트를 확인해 주세요.");
      document.getElementById("price").value = "";
      document.getElementById("price").focus();
    } else if (Number(price) < 1000) {
      alert("출금 가능 최소 금액은 1000원 입니다.");
      document.getElementById("price").value = "";
      document.getElementById("price").focus();
    } else if (Number(price) % 1000 !== 0) {
      alert("1000원 단위로 출금 가능합니다.");
      document.getElementById("price").value = "";
      document.getElementById("price").focus();
    } else {
      // 출금 금액 db에 적용
      axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/payment/withdraw`,
        data: {
          source_id: user.id,
          amount: price,
        },
      })
        .then((res) => {
          console.log(res);
          setCredit(res.data.credit);
          setOngoing(true);
        })
        .catch((error) => {
          alert(error);
        });
    }
  }

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleShow = () => {
    setShow(true);
    setOngoing(false);
    setPrice(0);
  };

  const handleClose = () => {
    setShow(false);
    window.location.reload(true);
  };

  const handleRetry = () => {
    setOngoing(false);
    setPrice(0);
  };

  const handlePointHistory = () => {
    setShow(false);
    history.push("/mypage/credit");
    window.location.reload(true);
  };

  const WithdrawReq = (
    <div className="Withdraw">
      <div className="title">핏미업 포인트 출금하기</div>
      <div className="pointBox">
        <div className="subject">보유 포인트</div>
        <div className="hold">
          <b>{credit}</b>&nbsp;Point
        </div>
      </div>

      <Form.Group className="box">
        <Form.Label className="subject">출금 요청 포인트</Form.Label>
        <Form.Control className="content" id="price" type="number" step="1000" onChange={handlePrice} min="1000" placeholder="1000 Point 단위로 출금 가능합니다." />
      </Form.Group>

      <button className="chargeBtn" onClick={handleSubmit}>
        출금하기
      </button>
    </div>
  );

  const WithdrawResult = (
    <div className="successBox">
      <div className="result">
        <b>{price} Point</b>
      </div>
      <div className="result">출금 완료</div>
      <div className="point">{credit} Point</div>
      <div className="explain">남았습니다.</div>
      <div className="btnBox">
        <button className="btn" onClick={handleRetry}>
          더 출금하기
        </button>
        <button className="btn" onClick={handlePointHistory}>
          포인트 내역 보기
        </button>
      </div>
    </div>
  );

  return (
    <>
      <button className="smallSelectBtn" onClick={handleShow}>
        출금하기
      </button>

      <Modal className="m" show={show} onHide={handleClose} centered>
        <Modal.Header className="mHeader" closeButton></Modal.Header>
        <Modal.Body className="mbody">{!ongoing ? WithdrawReq : WithdrawResult}</Modal.Body>
      </Modal>
    </>
  );
};

export default Withdraw;
