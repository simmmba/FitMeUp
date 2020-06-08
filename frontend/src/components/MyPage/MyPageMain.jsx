import React, { useEffect, useState } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import Header from "../Common/Header";
import "./MyPageMain.scss";
import GeneralThirdTab from "./GeneralThirdTab";
import GeneralFirstTab from "./GeneralFirstTab";
import GeneralSecondTab from "./GeneralSecondTab";
import StylistFirstTab from "./StylistFirstTab";
import StylistSecondTab from "./StylistSecondTab";
import MyInfo from "./MyInfo";
import MyFrequent from "./MyFrequent";
import MyConsult from "./MyConsult";

const MyPageMain = () => {
  const loginUser = JSON.parse(window.sessionStorage.getItem("user"));
  const [generalUserFlag, setGeneralUserFlag] = useState(false);

  return (
    <div>
      <Header />
      <div className="MyPageMain">
        <div className="container">
          <NavLink to="/mypage" className="selectBtn" activeClassName="selectedBtn" exact>
            나의 활동
          </NavLink>
          <NavLink to="/mypage/myconsult" className="selectBtn" activeClassName="selectedBtn">
            상담 현황
          </NavLink>
          <NavLink to="/mypage/myinfo" className="selectBtn" activeClassName="selectedBtn">
            내 정보
          </NavLink>
        </div>
        {/* {loginUser.type === "general" ? ( */}
        <div className="contentBox">
          <GeneralFirstTab />
          <Switch>
            <Route path={`/mypage`} component={MyFrequent} exact={true} />
            <Route path={`/mypage/myconsult`} component={MyConsult} />
            <Route path={`/mypage/myinfo`} component={MyInfo} />
          </Switch>
          {/* <GeneralSecondTab /> */}
          <GeneralThirdTab />
        </div>
        {/* ) : (
          <div className="outline">
            <StylistFirstTab />
            <StylistSecondTab />
            <GeneralThirdTab />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default MyPageMain;
