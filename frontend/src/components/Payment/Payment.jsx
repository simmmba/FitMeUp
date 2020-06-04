import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import "./Payment.scss";

import { Form } from "react-bootstrap";
import { METHODS_FOR_INICIS } from "./constants";

const Payment = () => {
  const history = useHistory();
  const methods = METHODS_FOR_INICIS;
  const [show, setShow] = useState(false);
  const [ongoing, setOngoing] = useState(false);
  const [price, setPrice] = useState(0);
  const [payMethod, setPayMethod] = useState("card");
  const [result, setResult] = useState("");
  const [credit, setCredit] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();

    if (Number(price) < 200) {
      alert("최소 충전 금액은 200원 입니다.");
      document.getElementById("price").value = "";
      document.getElementById("price").focus();
    } else if (Number(price) % 100 !== 0) {
      alert("100원 단위로 충전 가능합니다.");
      document.getElementById("price").value = "";
      document.getElementById("price").focus();
    } else {
      /* 가맹점 식별코드 */
      const userCode = "imp18020611";

      const data = {
        pg: "html5_inicis",
        pay_method: payMethod,
        merchant_uid: `pay_${new Date().getTime()}`,
        name: "핏미업 포인트 충전",
        amount: price,
        buyer_name: JSON.parse(window.sessionStorage.getItem("user")).nickname,
        buyer_tel: null,
        buyer_email: null,
        escrow: "checked",
      };

      /* 웹 환경일때 */
      const { IMP } = window;
      IMP.init(userCode);
      IMP.request_pay(data, callback);
    }
  }

  function callback(res) {
    // console.log(res);
    setOngoing(true);

    // 충전 금액 db에 적용
    if (res.success) {
      setResult(res);

      axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/payment/charge`,
        data: {
          user_id: JSON.parse(window.sessionStorage.getItem("user")).id,
          amount: res.paid_amount,
        },
      })
        .then((res) => {
          // console.log(res);
          setCredit(res.data.credit);
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      setResult(res);
    }
  }

  const handlePayMethod = (e) => {
    setPayMethod(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleShow = () => {
    setShow(true);
    setResult("");
    setOngoing(false);
    setPayMethod("card");
    setPrice(0);
  };

  const handleClose = () => setShow(false);

  const handleRetry = () => {
    setResult("");
    setOngoing(false);
    setPayMethod("card");
    setPrice(0);
  };

  const handlePointHistory = () => {
    setShow(false);
    history.push("/mypage");
  };

  const Payment = (
    <div className="Payment">
      <div className="title">핏미업 포인트 충전하기</div>
      <Form.Group className="box">
        <Form.Label className="subject">결제 수단</Form.Label>
        <Form.Control className="content" as="select" id="pg" onChange={handlePayMethod}>
          {methods.map((method) => {
            const { value, label } = method;
            return (
              <option value={value} key={value}>
                {label}
              </option>
            );
          })}
        </Form.Control>
      </Form.Group>

      <Form.Group className="box">
        <Form.Label className="subject">충전 금액 (원)</Form.Label>
        <Form.Control className="content" id="price" type="number" step="100" onChange={handlePrice} min="200" placeholder="100원 단위로 충전 가능합니다." />
      </Form.Group>

      <button className="chargeBtn" onClick={handleSubmit}>
        충전하기
      </button>
    </div>
  );

  const PaymentResult = result.success ? (
    <div className="successBox">
      <div className="result">
        <b>{result.paid_amount} Point</b>
      </div>
      <div className="result">충전 완료</div>
      <a href={result.receipt_url} target="_blank" rel="noopener noreferrer">
        결제 영수증
      </a>
      <div className="point">{credit} Point</div>
      <div className="explain">사용 가능합니다.</div>
      <div className="btnBox">
        <button className="btn" onClick={handleRetry}>
          더 충전하기
        </button>
        <button className="btn" onClick={handlePointHistory}>
          포인트 내역 보기
        </button>
      </div>
    </div>
  ) : (
    <div className="failBox">
      <div className="result">포인트 충전 실패</div>
      <div className="explain">{result.error_msg}</div>
      <button className="btn" onClick={handleRetry}>
        다시 충전하기
      </button>
    </div>
  );

  return (
    <>
      <button className="smallSelectBtn" onClick={handleShow}>
        충전하기
      </button>

      <Modal className="m" show={show} onHide={handleClose} centered>
        <Modal.Header className="mHeader" closeButton></Modal.Header>
        <Modal.Body className="mbody">{!ongoing ? Payment : PaymentResult}</Modal.Body>
      </Modal>
    </>
  );
};

export default Payment;
