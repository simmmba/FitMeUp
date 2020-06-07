import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyPageMain.scss";
import Pagination from "@material-ui/lab/Pagination";
import { Form } from "react-bootstrap";

const GeneralThirdTab = () => {
  const loginUser = JSON.parse(window.sessionStorage.getItem("user"));

  const [messageList, setMessageList] = useState([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [readMode, setReadMode] = useState(false);
  const [message, setMessage] = useState({});
  const [messageType, setMessageType] = useState(true);
  const [replyMode, setReplyMode] = useState(false);
  const [contents, setContents] = useState("");

  useEffect(() => {
    get_received_message();
  }, []);

  const get_received_message = () => {
    setMessageType(true);
    axios
      .get(`${process.env.REACT_APP_URL}/message/received?id=` + loginUser.id)
      .then((res) => {
        setMessageList(res.data.messages);
        setCount(parseInt(res.data.messages.length / 5) + 1);
        setPage(1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const get_sent_message = () => {
    setMessageType(false);
    axios
      .get(`${process.env.REACT_APP_URL}/message/sent?id=` + loginUser.id)
      .then((res) => {
        setMessageList(res.data.messages);
        setCount(parseInt(res.data.messages.length / 5) + 1);
        setPage(1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMessageClick = (mid) => {
    axios.get(`${process.env.REACT_APP_URL}/message?mid=` + mid).then((res) => {
      setMessage(res.data.message);
      setReadMode(true);
    });
  };

  const handleBackBtn = () => {
    setMessage({});
    if (messageType) {
      get_received_message();
    } else {
      get_sent_message();
    }
    setReplyMode(false);
    setReadMode(false);
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleReplyBtn = () => {
    setReplyMode(true);
  };

  const handleSendBtn = () => {
    if (contents === "" || contents.length === 0) {
      alert("내용을 입력해주세요.");
      return;
    }
    axios
      .post(`${process.env.REACT_APP_URL}/message`, {
        source: loginUser.id,
        target: message.source.id,
        contents: contents,
      })
      .then((res) => {
        if (res.data.result === "Success") {
          setReplyMode(false);
          setContents("");
        }
      })
      .catch((err) => {
        alert("메시지 전송 실패");
      });
  };
  const handleContentsChange = (e) => {
    setContents(e.target.value);
  };

  return (
    <div className="one_tab col-3">
      {readMode ? (
        <div>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT1uOFms-ofcQ8ZzpT7yf4plp2tDs4mmNBaQeuNNMJQn3fE1mBM&usqp=CAU" alt="back" className="backButton" onClick={handleBackBtn} />
          <div className="center topMargin">
            <div className="col-4 center">
              <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/cbdef037365169.573db7853cebb.jpg" alt={"Profile Image"} className="smallProfile" />
            </div>
            <div className="col-8">
              <div className="leftAlign">{message.source.nickname}</div>
              <div className="rightAlign smallText">{message.createdAt.substring(0, 10) + " " + message.createdAt.substring(11, 16)}</div>
            </div>
          </div>
          <hr />
          <div className="message_detail">{message.contents}</div>
          {replyMode ? (
            <div className="center">
              <div className="col-9 topMargin">
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Control as="textarea" rows="3" onChange={handleContentsChange} />
                </Form.Group>
              </div>
              <div className="selectBtn" onClick={handleSendBtn}>
                보내기
              </div>
            </div>
          ) : (
            <div className="center">
              {messageType ? (
                <div className="smallSelectBtn" onClick={handleReplyBtn}>
                  회신
                </div>
              ) : (
                <div />
              )}
              <div className="smallSelectBtn" onClick={handleBackBtn}>
                확인
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="messageBox">
            <div className="center">
              <div className="smallSelectBtn" onClick={get_received_message}>
                받은 메시지
              </div>
              <div className="smallSelectBtn" onClick={get_sent_message}>
                보낸 메시지
              </div>
            </div>
            <div>
              {messageList.slice((page - 1) * 5, page * 5).map((m) => {
                if (m) {
                  return (
                    <div className="center" key={m.id} onClick={() => handleMessageClick(m.id)}>
                      <div className="message center">
                        {m.readed ? <div /> : <div className="unread_message">&nbsp;</div>}
                        <div className="col-4 center">
                          <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/cbdef037365169.573db7853cebb.jpg" alt={"Profile Image"} className="smallProfile" />
                        </div>
                        <div className="col-8">
                          <div className="leftAlign">{messageType ? m.source.nickname : m.target.nickname}</div>
                          <div className="leftAlign">{m.contents.length > 15 ? m.contents.substring(0, 15) + ".." : m.contents}</div>
                          <div className="rightAlign smallText">{m.createdAt.substring(0, 10) + " " + m.createdAt.substring(11, 16)}</div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <Pagination className="topMargin center" size={"small"} count={count} color={"secondary"} page={page} variant="outlined" shape="rounded" onChange={handleChange} />
        </div>
      )}
    </div>
  );
};

export default GeneralThirdTab;
