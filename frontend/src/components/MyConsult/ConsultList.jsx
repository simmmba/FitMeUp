import React, { useState } from "react";
import "./ConsultList.scss";
import axios from "axios";

import { NavLink } from "react-router-dom";

const ConsultList = ({ filter, consult }) => {
  const [apply, setApply] = useState(true);
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  // const history = useHistory();
  const [request, setRequest] = useState("");

  // 스타일리스트가 상담 수락, 거절
  const handleRequest = (res) => {
    // 확인 메세지
    let message = "";
    const request = res.target.id;
    if (request === "ACCEPTED") message = "해당 상담을 수락하시겠습니까?";
    else message = "해당 상담을 거절하시겠습니까?";

    if (window.confirm(message)) {
      axios({
        method: "put",
        url: `${process.env.REACT_APP_URL}/consult/recv_confirm`,
        data: {
          stylist_id: user.id,
          consult_id: consult.id,
          state: request,
        },
      })
        .then((res) => {
          // 상담 수락한 경우
          console.log(res);
          if (request === "ACCEPTED") {
            setRequest("ACCEPTED");
          } else {
            setRequest("DENIED");
          }
        })
        .catch((error) => {
          alert("설정에 실패했습니다");
        });
    }
  };

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
    <div className="ConsultList">
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
              src={consult.ConsultImages[0]}
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

      {user.type !== "general" ? (
        // 스타일리스트
        <>
          <NavLink
            to={{
              pathname: "/consult/detail/" + consult.id,
            }}
          >
            <div className="plus">더보기</div>
          </NavLink>
          {filter === "0" ? (
            <>
              {/* // 받은 상담 */}
              {consult.state === "REQUESTED" && request === "" && (
                <>
                  <div className="apply" id="ACCEPTED" onClick={handleRequest}>
                    상담 수락
                  </div>
                  <div
                    className="apply cancel"
                    id="DENIED"
                    onClick={handleRequest}
                  >
                    상담 거절
                  </div>
                </>
              )}
              {/* 승인된 상담 */}
              {(consult.state === "ACCEPTED" || request === "ACCEPTED") && (
                // 채팅으로 이동 시키기
                <div className="apply">
                  승인한
                  <br />
                  상담
                </div>
              )}
              {/* 완료된 상담 */}
              {consult.state === "COMPLETE" && (
                <div className="apply cancel complete">상담 완료</div>
              )}
              {/* 거절한 상담 */}
              {(consult.state === "DENIED" || request === "DENIED") && (
                // 채팅으로 이동 시키기
                <div className="apply cancel complete">
                  거절한
                  <br />
                  상담
                </div>
              )}
            </>
          ) : (
            // 보낸 상담
            <>
              {/* 대기 중 */}
              {consult.state === "REQUESTED" && (
                <>
                  {apply ? (
                    <div className="apply" onClick={clickApply}>
                      신청 취소
                    </div>
                  ) : (
                    <div className="apply cancel" onClick={clickApply}>
                      다시 신청
                    </div>
                  )}
                </>
              )}
              {/* 거절 */}
              {consult.state === "DENIED" && (
                <div className="apply denied">상담 거절</div>
              )}

              {/* 받음 */}
              {consult.state === "ACCEPTED" && (
                // 채팅으로 url 연결하기
                <div className="apply">승인된<br/>상담</div>
              )}

              {/* 완료 */}
              {consult.state === "COMPLETE" && (
                // 채팅으로 url 연결하기
                <div className="apply cancel complete">상담 완료</div>
              )}
            </>
          )}
        </>
      ) : (
        // 일반 유저
        <>
          <NavLink
            to={{
              pathname: "/consult/detail/" + consult.id,
            }}
          >
            <div className="plus">
              자세히
              <br />
              보기
            </div>
          </NavLink>
          <div className="apply" onClick={deleteConsult}>
            상담삭제
          </div>
        </>
      )}
    </div>
  );
};

export default ConsultList;
