import React from "react";
import "./MatchingList.scss";

import { MdRemoveCircleOutline } from "react-icons/md";
import { NavLink } from "react-router-dom";

const MatchingList = ({ match }) => {
  // const [apply, setApply] = useState(match.);

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
        {/* 성별 */}
        <div className={match.gender === "male" ? "items male" : "items"}>
          {match.gender === "male" ? <div>남</div> : <div>여</div>}
        </div>
        {/* 나이 */}
        <div className="items">
          <div>{match.age}세</div>
        </div>
        {/* 키, 몸무게 */}
        <div className="items">
          <div>
            {match.height === "" ? "-" : match.height}cm
            <br />
            {match.weight === "" ? "-" : match.weight}kg
          </div>
        </div>
        {/* 상, 하의 사이즈 */}
        <div className="items">
          <div>
            상 : {match.top === "" ? "-" : match.top}
            <br />하 : {match.bottom === "" ? "-" : match.bottom}
          </div>
        </div>
        {/* 원하는 스타일 */}
        <div className="items">
          <img alt="style" className="styleimg" src={match.ConsultWants[0]} />
        </div>
         {/* 평소 내 스타일 */}
        {match.ConsultImages.length !== 0 && (
          <div className="items">
            <img
              alt="style"
              className="styleimg"
              src="https://platum.kr/wp-content/uploads/2014/05/unnamed3.png"
            />
          </div>
        )}

        {/* 예산 */}
        <div className="items">
          <div>
            {match.budget === ""
              ? "-"
              : match.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            원
          </div>
        </div>
        {/* 요구 사항 */}
        {match.contents !== "" && (
          <div className="items">
            <div className="content">{match.contents}</div>
          </div>
        )}
        {/* 문의 시간 */}
        <div className="items">
          <div>
            {match.start_time}시 ~ <br />
            {match.end_time}시
          </div>
        </div>
      </div>
      <NavLink
        to={{
          pathname: "/consult/detail",
          params: {
            consult: match.id,
          },
        }}
      >
        <div className="plus">더보기</div>
      </NavLink>
      <div className="apply">상담하기</div>
      <div className="remove">
        <MdRemoveCircleOutline />
      </div>
    </div>
  );
};

export default MatchingList;
