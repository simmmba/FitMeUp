import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import Modal from "react-bootstrap/Modal";
import "./Main.scss";
import Counter from "../Supermarket/Counter3";
import SuperMarket from "../Supermarket/SuperMarket";
import Header from "../Common/Header";

const Main = ({ setConsult, reset }) => {
  const [login, setLogin] = useState(false);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    // 로그인 확인하기
    if (window.sessionStorage.getItem("user")) {
      setLogin(true);
    }
  }, []);

  return (
    <>
      <Header></Header>
      <div className="Main">
        <div className="Main_">
          <Link to="/match">
            <div className="stylelist_btn">현재 상담 요청 내역</div>
          </Link>
        </div>
        <button className="reqBtn" onClick={handleShow}>
          실시간 상담 요청
        </button>

        <Modal className="m" show={show} onHide={handleClose}>
          <Modal.Header className="mHeader" closeButton></Modal.Header>
          <Modal.Body className="body">
            <div className="mentionTop">스타일리스트에게 상담 받기 위해</div>
            <div className="mentionTop">원하는 서비스를 선택해주세요!</div>
            <div className="mentionBottom">
              47,505명의 스타일리스트가 활동 중이에요.
            </div>
            <Link
              className="selectBtn"
              to={`/consult`}
              onClick={() => {
                setConsult("category", "코디 추천");
                reset();
              }}
            >
              코디 추천 받기
            </Link>
            <Link
              className="selectBtn"
              to={`/consult`}
              onClick={() => {
                setConsult("category", "내 옷 추천");
                reset();
              }}
            >
              내 옷 추천 받기
            </Link>
            <br />
            <br />
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default inject(({ consultRequire }) => ({
  setConsult: consultRequire.setConsult,
  reset: consultRequire.reset,
}))(observer(Main));
