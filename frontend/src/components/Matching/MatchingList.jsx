import React, { useState } from "react";
import "./MatchingList.scss";
import axios from "axios";

import { NavLink } from "react-router-dom";
import { useEffect } from "react";

const MatchingList = ({ match }) => {
  const [apply, setApply] = useState(false);
  const user = JSON.parse(window.sessionStorage.getItem("user"));

  useEffect(() => {
    // 지원한 상태면
    if (match.applied === "yes") {
      setApply(true);
    }
  }, [match.applied]);

  const clickApply = () => {
    // 이미 상담 신청되어 있으면 취소
    if (apply) {
      axios({
        method: "delete",
        url: `${process.env.REACT_APP_URL}/consult/apply`,
        data: {
          user_id: user.id,
          consult_id: match.id,
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
          consult_id: match.id,
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

  return (
    <div className="MatchingList">
      <div className="style_conditions">
        <div className="items profile_items">
          <img
            alt="style"
            className="profile"
            src={match.req_user.profile_img}
          />
        </div>

        {/* 닉네임 */}
        <div className="items name">
          <div>{match.req_user.nickname}</div>
        </div>
        <div className={match.category === "coordi" ? "items male" : "items"}>
          <div>{match.category === "coordi" ? "코디" : "내 옷"}</div>
        </div>

        {/* 성별 */}
        <div className="items">
          <div>{match.gender}</div>
        </div>

        {/* 나이 */}
        <div className="items">
          <div>{match.age}세</div>
        </div>

        {/* 키, 몸무게 */}
        {match.height !== null && match.height !== null && (
          <div className="items">
            <div>
              {match.height === null ? "-" : match.height}cm
              <br />
              {match.height === null ? "-" : match.weight}kg
            </div>
          </div>
        )}

        {/* 상, 하의 사이즈 */}
        {match.top !== "" && match.bottom !== "" && (
          <div className="items">
            <div>
              상 : {match.top === "" ? "-" : match.top}
              <br />하 : {match.bottom === "" ? "-" : match.bottom}
            </div>
          </div>
        )}

        {/* 원하는 스타일 */}
        <div className="items">
          <img
            alt="style"
            className="styleimg"
            src={"/img/wantStyle/" + match.ConsultWants[0].img}
          />
        </div>

        {/* 평소 내 스타일 */}
        {match.ConsultImages.length !== 0 && (
          <div className="items">
            <img
              alt="style"
              className="styleimg"
              src={match.ConsultImages[0]}
            />
          </div>
        )}

        {/* 예산 */}
        {match.budget !== null && (
          <div className="items">
            <div>
              {match.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
            </div>
          </div>
        )}

        {/* 요구 사항 */}
        {/* {match.contents !== "" && (
          <div className="items">
            <div className="content">{match.contents}</div>
          </div>
        )} */}

        {/* 문의 시간 */}
        <div className="items">
          <div>
            {match.start_time === 0 && match.end_time === 24 ? (
              <>시간 무관</>
            ) : (
              <>
                {match.start_time}시 ~ <br />
                {match.end_time}시
              </>
            )}
          </div>
        </div>
      </div>
      <NavLink
        to={{
          pathname: "/consult/detail/" + match.id,
        }}
      >
        <div className="plus">더보기</div>
      </NavLink>
      {apply ? (
        <div className="apply cancel" onClick={clickApply}>
          신청취소
        </div>
      ) : (
        <div className="apply" onClick={clickApply}>
          상담신청
        </div>
      )}
    </div>
  );
};

export default MatchingList;
