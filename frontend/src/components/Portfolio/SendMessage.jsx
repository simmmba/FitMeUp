import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./SendMessage.scss";
import axios from "axios";

const SendMessage = ({ target, nickname }) => {
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const [show, setShow] = useState(false);
  const [contents, setContents] = useState("");

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => setShow(false);

  const handleContents = (res) => {
    setContents(res.target.value);
  };

  const handleSubmit = () => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/message`,
      data: {
        source: user.id,
        target: target,
        contents: contents,
      },
    })
      .then((res) => {
        alert("쪽지가 전송되었습니다.");
        setShow(false);
      })
      .catch((error) => {
        alert("쪽지 보내기를 실패했습니다");
      });
  };

  return (
    <>
      <button className="message" onClick={handleShow}>
        <img className="send" src="https://image.flaticon.com/icons/png/512/2983/2983788.png" alt="send" />
      </button>

      <Modal className="msgModal" show={show} onHide={handleClose} centered>
        <Modal.Header className="msgHeader" closeButton></Modal.Header>
        <Modal.Body className="msgBody">
          <div className="target">To. {nickname} 스타일리스트</div>
          <textarea className="contents" value={contents} placeholder="내용을 입력하세요" onChange={handleContents}></textarea>
          <button onClick={handleSubmit}>메세지 보내기</button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SendMessage;
