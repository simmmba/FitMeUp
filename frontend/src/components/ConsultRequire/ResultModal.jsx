import React, { useState } from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import Modal from "react-bootstrap/Modal";
import "./ResultModal.scss";

const ResultModal = ({ setConsult, reset }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleClick = () => {
    alert("현재 활동 중인 스타일리스트에게 상담 요청되었습니다. \n스타일리스트의 연락을 기다려주세요.");
  };

  return (
    <>
      {/* <div className="finalBtn"> */}
      <button className="reqBtn" onClick={handleShow}>
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
            <Link to="/" className="reqBtn">
              스타일리스트를 추천받아 직접 요청하기
            </Link>
            {/* <Link className="mainBtn" to={`/`}>
              메인으로
            </Link> */}
            <br />
            <br />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default inject(({ consultRequire }) => ({
  setConsult: consultRequire.setConsult,
  reset: consultRequire.reset,
}))(observer(ResultModal));
