import React, { useState } from "react";
import "./ConsultList.scss";
import axios from "axios";

import { NavLink } from "react-router-dom";
import { useEffect } from "react";

const ConsultList = ({ consult }) => {
  const [apply, setApply] = useState(false);
  const user = JSON.parse(window.sessionStorage.getItem("user"));

  useEffect(() => {
    // 지원한 상태면
    if (consult.applied) {
      setApply(true);
    }
  }, []);

  const clickApply = () => {
    // 이미 상담 신청되어 있으면 취소
    if (apply) {
      axios({
        method: "delete",
        url: `${process.env.REACT_APP_URL}/consult/apply`,
        data: {
          user_id: user.id,
          consult_id: consult.id,
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
          consult_id: consult.id,
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
    <div className="consultingList">
      <div className="style_conditions">
        <div className="items profile_items">
          <img
            alt="style"
            className="profile"
            src={consult.req_user.profile_img}
          />
        </div>

        {/* 닉네임 */}
        <div className="items name">
          <div>{consult.req_user.nickname}</div>
        </div>
        <div className={consult.category === "coordi" ? "items male" : "items"}>
          <div>{consult.category === "coordi" ? "코디" : "내 옷"}</div>
        </div>

        {/* 성별 */}
        <div className="items">
          {consult.gender === "male" ? <div>남</div> : <div>여</div>}
        </div>

        {/* 나이 */}
        <div className="items">
          <div>{consult.age}세</div>
        </div>

        {/* 키, 몸무게 */}
        {consult.height !== null && consult.height !== null && (
          <div className="items">
            <div>
              {consult.height === null ? "-" : consult.height}cm
              <br />
              {consult.height === null ? "-" : consult.weight}kg
            </div>
          </div>
        )}

        {/* 상, 하의 사이즈 */}
        {consult.top !== "" && consult.bottom !== "" && (
          <div className="items">
            <div>
              상 : {consult.top === "" ? "-" : consult.top}
              <br />하 : {consult.bottom === "" ? "-" : consult.bottom}
            </div>
          </div>
        )}

        {/* 원하는 스타일 */}
        <div className="items">
          <img
            alt="style"
            className="styleimg"
            src={"/img/wantStyle/" + consult.ConsultWants[0].img}
          />
        </div>

        {/* 평소 내 스타일 */}
        {consult.ConsultImages.length !== 0 && (
          <div className="items">
            <img
              alt="style"
              className="styleimg"
              src={consult.ConsultImages[0]}
            />
          </div>
        )}

        {/* 예산 */}
        {consult.budget !== null && (
          <div className="items">
            <div>
              {consult.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
            </div>
          </div>
        )}

        {/* 요구 사항 */}
        {consult.contents !== "" && (
          <div className="items">
            <div className="content">{consult.contents}</div>
          </div>
        )}
        {/* 문의 시간 */}
        <div className="items">
          <div>
            {consult.start_time === 0 && consult.end_time === 24 ? (
              <>시간 무관</>
            ) : (
              <>
                {consult.start_time}시 ~ <br />
                {consult.end_time}시
              </>
            )}
          </div>
        </div>
      </div>
      <NavLink
        to={{
          pathname: "/consult/detail/" + consult.id,
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

export default ConsultList;
