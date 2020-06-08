import React, { useState } from "react";
import { useHistory } from "react-router";
import { Rate } from "antd";
import firebase from "../../firebaseConfig";
import "./Stylist.scss";
import { NavLink, withRouter } from "react-router-dom";
import axios from "axios";

const Stylist = ({ val, filter, stylist_id, category }) => {
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const [roomsRef] = useState(firebase.database().ref("rooms"));
  const [usersRef] = useState(firebase.database().ref("users"));
  const history = useHistory();

  // 유저가 스타일리스트 선택
  const approveConsult = () => {
    // console.log(category);
    let stylistPrice = 0;
    let userCredit = 0;
    if (category === "coordi") stylistPrice = val.coordi_price;
    else stylistPrice = val.my_price;

    axios.get(`${process.env.REACT_APP_URL}/user/myinfo?user_id=` + user.id).then((res) => {
      userCredit = res.data.user.credit;

      if (userCredit < stylistPrice) {
        alert("포인트가 부족합니다. \n충전 후 수락해주세요.");
      } else {
        axios({
          method: "post",
          url: `${process.env.REACT_APP_URL}/payment/checkout`,
          data: { source_id: user.id, target_id: stylist_id, amount: stylistPrice },
        })
          .then((res) => {
            if (res.data.result === "Success") {
              console.log("포인트 출금 성공");

              axios({
                method: "put",
                url: `${process.env.REACT_APP_URL}/consult/apply`,
                data: {
                  user_id: user.id,
                  consult_id: val.consult_id,
                  apply_id: val.id,
                  state: "ACCEPTED",
                },
              })
                .then((res) => {
                  // axios가 잘되면
                  alert("상담 수락이 완료되었습니다");
                  // 채팅 생성
                  createChat();
                })
                .catch((error) => {
                  alert("상담 수락에 실패했습니다");
                });
            } else {
              console.log("포인트 출금 실패");
            }
          })
          .catch((error) => {
            alert("포인트 출금에 실패했습니다.");
          });
      }
    });
  };

  const createChat = async () => {
    const { key } = roomsRef.push();

    const consumer = {
      ...user,
      role: "consumer",
    };

    try {
      let provider = await axios.get(`${process.env.REACT_APP_URL}/user/myinfo?user_id=${val.stylist_id}`).then((res) => {
        if (res.data.result === "Success") {
          return res.data.user;
        } else {
          console.log(res.data.detail);
        }
      });

      provider = {
        ...provider,
        role: "provider",
      };

      const newRoom = {
        id: key,
        consumer: consumer,
        provider: provider,
        lastMessage: " ",
        updated: firebase.database.ServerValue.TIMESTAMP,
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
            .set(newRoom)
            .catch((err) => {
              console.error(err);
            });

          // 스타일리스트 유저 db에 방정보 입력
          usersRef
            .child(provider.id)
            .child("rooms")
            .child(key)
            .set(newRoom)
            .catch((err) => {
              console.error(err);
            });

          history.push("/chatting");
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Stylist_Item">
      <NavLink to={`/portfolio/detail/${val.stylist_id}`}>
        <div className="plus">더보기</div>
      </NavLink>

      {/* 받은 추천 이면 */}
      {filter === "0" && (
        <>
          {/* 아직 수락한게 없으면 수락하기 */}
          {!stylist_id && (
            <div className="apply" onClick={approveConsult}>
              수락하기
            </div>
          )}

          {/* 수락한게 있으면 나이면 */}
          {stylist_id && stylist_id === val.stylist_id && (
            <>
              {/* 진행중이면 */}
              {val.state === "ACCEPTED" && (
                <div className="apply">
                  진행중
                  <br />
                  상담
                </div>
              )}
              {/* 완료면 */}
              {val.state === "COMPLETE" && <div className="apply">상담 왼료</div>}
            </>
          )}
        </>
      )}

      {/* 지정한 상담이면 */}
      {filter === "1" && (
        <>
          {/* 대기중 */}
          {val.state === "REQUESTED" && <div className="apply">대기 중</div>}
          {/* 진행중 */}
          {val.state === "ACCEPTED" && (
            <div className="apply">
              진행중
              <br />
              상담
            </div>
          )}
          {/* 거절 */}
          {val.state === "DENIED" && (
            <div className="apply">
              거절된
              <br />
              상담
            </div>
          )}
          {/* 완료 */}
          {val.state === "COMPLETE" && <div className="apply">상담 왼료</div>}
        </>
      )}

      <div className="listBox">
        {/* <Link to={`/portfolio/detail/${val.stylist_id}`} className="listBox"> */}
        <div className="left">
          <div className="imgBox">
            <img alt="이미지" src={val.portfolio_img} />
          </div>
        </div>
        <div className="detailBox">
          <div className="portfolioBox">
            <div className="portfolioName">{val.portfolio_title}</div>
            <div className="priceBox">
              <div className="price">
                전체 코디 - <b>{val.coordi_price} Point</b>
              </div>
              <div className="price">
                옷장 코디 - <b>{val.my_price} Point</b>
              </div>
            </div>
          </div>

          <div className="nicknameBox">
            <div className="profileImg">
              <img alt="" src={val.profile_img} />
            </div>
            <div>{val.nickname} 스타일리스트</div>
          </div>
          <div className="evalBox">
            <Rate disabled defaultValue={Math.round(val.avg_score * 2) / 2} />
            &nbsp;&nbsp;&nbsp;
            <div className="score">{Math.round(val.avg_score * 10) / 10}</div>
            &nbsp;&nbsp;
            <div className="review">({val.review_cnt}개)</div>
            <div className="consult">{val.consult_cnt}회 상담</div>
          </div>
          <div className="reviewBox">
            <div className="recentReview">최근리뷰</div>
            <b>{val.recent_review !== null && val.recent_review.nickname}</b>
            <span>{val.recent_review !== null ? val.recent_review.contents : "작성된 리뷰가 없습니다."}</span>
          </div>
        </div>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default withRouter(Stylist);
