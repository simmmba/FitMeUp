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
            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/cbdef037365169.573db7853cebb.jpg"
          />
        </div>
        <div className="items name">
          {/* <div>김복남살인사전의</div> */}
          <div>{match.id}</div>
        </div>
        <div className={match.gender === "male" ? "items male" : "items"}>
          {match.gender === "male" ? <div>남</div> : <div>여</div>}
        </div>
        <div className="items">
          <div>27세</div>
        </div>
        <div className="items">
          <div>
            {match.height === "" ? "-" : match.height}cm
            <br />
            {match.weight === "" ? "-" : match.weight}kg
          </div>
        </div>
        <div className="items">
          <div>
            상 : {match.top === "" ? "-" : match.top}
            <br />하 : {match.bottom === "" ? "-" : match.bottom}
          </div>
        </div>

        <div className="items">
          <img
            alt="style"
            className="styleimg"
            src="https://t1.daumcdn.net/liveboard/fashionn/4d8277a2f3c945c5b678d076f559ccad.JPG"
          />
        </div>
        <div className="items">
          <img
            alt="style"
            className="styleimg"
            src="https://platum.kr/wp-content/uploads/2014/05/unnamed3.png"
          />
        </div>
        <div className="items">
          <div>
            {match.budget === ""
              ? "-"
              : match.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            원
          </div>
        </div>
        <div className="items">
          <div className="content">{match.contents}</div>
        </div>
        <div className="items">
          <div>
            {match.start_time}시 ~ <br />
            {match.end_time}시
          </div>
        </div>
      </div>
      <NavLink to="/consult/detail">
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
