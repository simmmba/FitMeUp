import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import firebase from "../../firebaseConfig";
import "./ConsultDetail.scss";
import axios from "axios";

import Header from "../Common/Header";

const ConsultDetail = (props) => {
  const [apply, setApply] = useState(false);
  const [list] = useState([
    ["성별", ""],
    ["나이", "세"],
    ["키", "cm"],
    ["몸무게", "kg"],
    ["상의", ""],
    ["하의", ""],
  ]);
  const [wantImg, setWantImg] = useState([]);
  const [myImg, setMyImg] = useState([]);
  const [requser, setRequser] = useState({});
  const [category, setCategory] = useState("");
  const [state, setState] = useState("");
  const [stylist, setStylelist] = useState("");
  const [budget, setBudget] = useState("");
  const [contents, setContents] = useState("");
  const [time, setTime] = useState({
    start_time: 0,
    end_time: 0,
  });
  const [roomsRef] = useState(firebase.database().ref("rooms"));
  const [usersRef] = useState(firebase.database().ref("users"));

  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const url = window.location.href.split("/");
  const history = useHistory();

  useEffect(() => {
    req_list();
  }, []);

  // axios로 리스트를 부름
  const req_list = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL}/consult/req?consult_id=${url[url.length - 1]}&user_id=${user.id}`,
    })
      .then((res) => {
        list[0].push(res.data.consult.gender);
        list[1].push(res.data.consult.age);
        list[2].push(res.data.consult.height);
        list[3].push(res.data.consult.weight);
        list[4].push(res.data.consult.top);
        list[5].push(res.data.consult.bottom);

        setTime({
          ...time,
          start_time: res.data.consult.start_time,
          end_time: res.data.consult.end_time,
        });
        setBudget(res.data.consult.budget);
        setContents(res.data.consult.contents);

        setWantImg(res.data.consult.ConsultWants);
        setMyImg(res.data.consult.ConsultImages);
        setRequser(res.data.consult.req_user);
        setCategory(res.data.consult.category);
        if (res.data.consult?.applied !== "no") setApply(true);
        setState(res.data.consult.state);
        if (res.data.consult.stylist_id) setStylelist(res.data.consult.stylist_id);
      })
      .catch((error) => {
        alert("상담 요청 내역을 가져오는데 실패했습니다.");
      });
  };

  const clickApply = () => {
    // 이미 상담 신청되어 있으면 취소
    if (apply) {
      axios({
        method: "delete",
        url: `${process.env.REACT_APP_URL}/consult/apply`,
        data: {
          user_id: user.id,
          consult_id: url[url.length - 1],
        },
      })
        .then((res) => {
          alert("상담 신청 취소가 완료되었습니다");
          setApply(!apply);
        })
        .catch((error) => {
          alert("상담 신청 취소를 실패했습니다");
        });
    }
    // 상담 신청하기
    else {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/consult/apply`,
        data: {
          stylist_id: user.id,
          consult_id: url[url.length - 1],
          contents: "",
        },
      })
        .then((res) => {
          // axios가 잘되면
          alert("상담 신청이 완료되었습니다");
          setApply(!apply);
        })
        .catch((error) => {
          alert("상담 신청을 실패했습니다");
        });
    }
  };

  const deleteConsult = () => {
    if (window.confirm("해당 상담을 삭제하시겠습니까?")) {
    }
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_URL}/consult/req`,
      data: {
        user_id: user.id,
        consult_id: url[url.length - 1],
      },
    })
      .then((res) => {
        // axios가 잘되면
        alert("상담 삭제가 완료되었습니다");
        history.goBack();
      })
      .catch((error) => {
        alert("상담 삭제를 실패했습니다");
      });
  };

  // 스타일리스트가 상담 수락, 거절
  const handleRequest = () => {
    // 확인 메세지
    const request = url[url.length - 1];

    axios({
      method: "put",
      url: `${process.env.REACT_APP_URL}/consult/recv_confirm`,
      data: {
        stylist_id: user.id,
        consult_id: request,
        state: "ACCEPTED",
      },
    })
      .then((res) => {
        // 상담 수락한 경우
        alert("상담을 수락했습니다");
        // history로 채팅으로 이동
        createChat(request);
      })
      .catch((error) => {
        alert("설정에 실패했습니다");
      });
  };

  const createChat = async (consult_id) => {
    const { key } = roomsRef.push();

    const consumer = {
      ...requser,
      role: "consumer",
    };

    const provider = {
      ...user,
      role: "provider",
    };

    const newRoom = {
      id: key,
      consumer: consumer,
      provider: provider,
      lastMessage: ' ',
      updated: firebase.database.ServerValue.TIMESTAMP,
      consultId: consult_id,
      status : '진행 중'
    };

    // 새 채팅룸 생성
    roomsRef
      .child(key)
      .update(newRoom)
      .then(() => {
        // 소비자 정보 입력
        roomsRef
          .child(key)
          .child("users")
          .child(consumer.id)
          .set(consumer)
          .catch((err) => {
            console.error(err);
          });
        // 스타일리스트 정보 입력
        roomsRef
          .child(key)
          .child("users")
          .child(provider.id)
          .set(provider)
          .catch((err) => {
            console.error(err);
          });

        // 소비자 유저 db에 방정보 입력
        usersRef
          .child(consumer.id)
          .child("rooms")
          .child(key)
          .set({...newRoom, target:provider})
          .catch((err) => {
            console.error(err);
          });

        // 스타일리스트 유저 db에 방정보 입력
        usersRef
          .child(provider.id)
          .child("rooms")
          .child(key)
          .set({...newRoom, target:consumer})
          .catch((err) => {
            console.error(err);
          });

        history.push("/chatting");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Header></Header>
      <div className="ConsultDetail">
        <div className="processing">
          <div className="position">
            <br />
            <div className="type">{category === "coordi" ? "스타일리스트의 PICK" : "내 옷장에서 PICK"}</div>
            <div className="user">
              <img alt="style" className="profile" src={requser.profile_img} />
              <span className="nickname">{requser.nickname}</span>
            </div>

            {state === "REQUESTED" && (
              <>
                {user.type === "stylist" ? (
                  <>
                    {stylist !== "" ? (
                      // 지정한 경우
                      <div className="apply" onClick={handleRequest}>
                        상담 수락하기
                      </div>
                    ) : (
                      <>
                        {apply ? (
                          <div className="apply" onClick={clickApply}>
                            상담 신청 취소하기
                          </div>
                        ) : (
                          <div className="apply" onClick={clickApply}>
                            상담 신청하기
                          </div>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  // 사용자 입장에서
                  <div className="apply" onClick={deleteConsult}>
                    상담 삭제하기
                  </div>
                )}
              </>
            )}

            {state === "COMPLETE" && (
              <>{user.type !== "stylist" || (user.type === "stylist" && user.id === stylist) ? <div className="apply complete">상담 완료</div> : <div className="apply complete">상담 거절</div>}</>
            )}

            {state === "ACCEPTED" && (
              <>{user.type !== "stylist" || (user.type === "stylist" && user.id === stylist) ? <div className="apply complete">상담 진행 중</div> : <div className="apply complete">상담 거절</div>}</>
            )}
            {state === "DENIED" && <div className="apply complete">상담 거절</div>}
          </div>
        </div>

        <div className="total_consult">
          <div className="title">상담 상세 내용</div>
          {/* 시간 */}
          <span className="ctime">* 연락 가능 시간 : </span>
          <span className="ctime">
            {time.start_time === 0 && time.end_time === 24 ? (
              "언제나"
            ) : (
              <>
                {time.start_time}시 ~ {time.end_time}시
              </>
            )}
          </span>
          {/* 문자로 된 정보 */}
          <div className="text_info">
            {/* 신체 정보 */}
            <table className="consult_info">
              <thead>
                <tr>
                  {list.map((item) => (
                    <th key={item[0]}>{item[0]}</th>
                  ))}
                  <th>예산</th>
                </tr>
                <tr>
                  {list.map((item, index) => (
                    <td key={index}>{item[2] ? item[2] + "" + item[1] : "-"}</td>
                  ))}
                  {budget === null ? <td>-</td> : <td>{budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</td>}
                </tr>
              </thead>
            </table>

            {/* 추가 정보 */}
            {contents && (
              <div className="row">
                <div className="contents">{contents}</div>
              </div>
            )}
          </div>
          {/* 이미지로 된 정보 */}
          <div className="img_info">
            <div className="sub_title">원하는 스타일</div>
            <div>
              {wantImg.map((img, index) => (
                <img key={index} alt="style" className="styleimg" src={"/img/wantStyle/" + img.img} />
              ))}
            </div>
            {myImg.length !== 0 && (
              <>
                <div className="sub_title">평소 입는 스타일</div>
                <div>
                  {myImg.map((img, index) => (
                    <img key={index} alt="style" className="styleimg" src={img.image_path} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsultDetail;

// link state 활용법
// https://medium.com/@bopaiahmd.mca/how-to-pass-props-using-link-and-navlink-in-react-router-v4-75dc1d9507b4
