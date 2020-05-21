import React from "react";
import "./MatchingList.scss";

import { MdRemoveCircleOutline } from "react-icons/md";
import { NavLink } from "react-router-dom";

const MatchingList = ({match}) => {



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
          <div>다니다니는너무착</div>
        </div>
        <div className="items gender">
          <div>남</div>
        </div>
        <div className="items">
          <div>27세</div>
        </div>
        <div className="items">
          <div>
            171cm
            <br />
            70kg
          </div>
        </div>
        <div className="items">
          <div>
            상 : 32
            <br />하 : 33
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
          <div>50,000원</div>
        </div>
        <div className="items">
          <div className="content">
            결혼식에 갈 때 입을 옷 좀요 바람핀 전남자친구놈입니다ㅂㄷㅂㄷ
          </div>
        </div>
        <div className="items">
          <div>
            7:00 ~ <br />
            24:00
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
