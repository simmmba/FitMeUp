import React from "react";
import "./ConsultListDetail.scss";
import axios from "axios";

import { NavLink } from "react-router-dom";
// import { useEffect } from "react";

const ConsultListDetail = ({ consult }) => {
  const user = JSON.parse(window.sessionStorage.getItem("user"));

  // 상담 삭제하기
  const deleteConsult = () => {
    if (window.confirm("해당 상담을 삭제하시겠습니까?")) {
      axios({
        method: "delete",
        url: `${process.env.REACT_APP_URL}/consult/req`,
        data: {
          user_id: user.id,
          consult_id: consult.id,
        },
      })
        .then((res) => {
          // axios가 잘되면
          alert("상담 삭제가 완료되었습니다");
          window.location.reload();
        })
        .catch((error) => {
          alert("상담 삭제를 실패했습니다");
        });
    }
  };

  return (
    <div className="ConsultListDetail">
      <div className="style_conditions">
        {user.type !== "general" && (
          <>
            <div className="items profile_items">
              <img
                alt="style"
                className="profile"
                src={consult.req_user.profile_img}
              />
            </div>
            {/* 닉네임*/}
            <div className="items name">
              <div>{consult.req_user.nickname}</div>
            </div>
          </>
        )}

        {/* 어떤 종류인지 */}
        <div className={consult.category === "coordi" ? "items male" : "items"}>
          <div>{consult.category === "coordi" ? "코디" : "내 옷"}</div>
        </div>

        {/* 성별 */}
        <div className="items">
          <div>{consult.gender}</div>
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
              src={consult.ConsultImages[0].image_path}
            />
          </div>
        )}

        {/* 예산 */}
        {consult.budget !== null && (
          <div className="items">
            <div>
              {consult.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              원
            </div>
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
      <div className="apply" onClick={deleteConsult}>
        상담삭제
      </div>
    </div>
  );
};

export default ConsultListDetail;
