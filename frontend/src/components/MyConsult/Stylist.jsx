import React from "react";
import { Rate } from "antd";
import "./Stylist.scss";
import { NavLink, withRouter } from "react-router-dom";
import axios from "axios";

const Stylist = ({ val, filter, stylist_id }) => {
  const user = JSON.parse(window.sessionStorage.getItem("user"));

  // 유저가 스타일리스트 선택
  const approveConsult = () => {
    axios({
      method: "put",
      url: `${process.env.REACT_APP_URL}/consult/apply`,
      data: {
        user_id: user.id,
        consult_id: val.consult_id,
        apply_id : val.id,
        state: "ACCEPTED"
      },
    })
      .then((res) => {
        // axios가 잘되면
        alert("상담 수락이 완료되었습니다");
        // 채팅으로 연결하기
      })
      .catch((error) => {
        alert("상담 수락에 실패했습니다");
      });
  }

  return (
    <div className="Stylist_Item">
      <NavLink to={`/portfolio/detail/${val.stylist_id}`}>
        <div className="plus">더보기</div>
      </NavLink>

      {/* 받은 추천 이면 */}
      {filter === "0" && (
        <>
          {/* 아직 수락한게 없으면 수락하기 */}
          {!stylist_id && <div className="apply" onClick={approveConsult}>수락하기</div>}

          {/* 수락한게 있으면 나이면 */}
          {stylist_id && stylist_id === val.stylist_id && (
            <>
              {/* 진행중이면 */}
              {val.state === "ACCEPTED" && (
                <div className="apply">진행중<br/>상담</div>
              )}
              {/* 완료면 */}
              {val.state === "COMPLETE" && (
                <div className="apply">상담 왼료</div>
              )}
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
          {val.state === "ACCEPTED" && <div className="apply">진행중<br/>상담</div>}
          {/* 거절 */}
          {val.state === "DENIED" && <div className="apply">거절된<br/>상담</div>}
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
            <span>
              {val.recent_review !== null
                ? val.recent_review.contents
                : "작성된 리뷰가 없습니다."}
            </span>
          </div>
        </div>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default withRouter(Stylist);
