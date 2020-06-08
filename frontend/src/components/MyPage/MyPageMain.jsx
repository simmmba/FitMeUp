import React, { useEffect, useState } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import Header from "../Common/Header";
import "./MyPageMain.scss";
import GeneralThirdTab from "./GeneralThirdTab";
import GeneralFirstTab from "./GeneralFirstTab";
import StylistFirstTab from "./StylistFirstTab";
import StylistSecondTab from "./StylistSecondTab";
import MyInfo from "./MyInfo";
import MyConsult from "./MyConsult";
import MyFrequent from "./MyFrequent";

const MyPageMain = () => {
  const loginUser = JSON.parse(window.sessionStorage.getItem("user"));
  const [generalUserFlag, setGeneralUserFlag] = useState(false);
  const [rightTab, setRightTab] = useState("freq");

  const rightBtn = (e) => {
    setRightTab(e.target.id);
  };

  return (
    <div>
      <Header />
      <div className="MyPageBox">
        <div className="MyPageMain">
          <div className="MyPageMenu">
            <div className="leftMenu"></div>
            <div className="middleMenu">
              <NavLink to="/mypage" className="selectBtn" activeClassName="selectedBtn" exact>
                내 상담
              </NavLink>
              <NavLink to="/mypage/myinfo" className="selectBtn" activeClassName="selectedBtn">
                내 정보
              </NavLink>
            </div>
            <div className="rightMenu">
              <button id="freq" className={rightTab === "freq" ? "selectedBtn" : "selectBtn"} onClick={rightBtn}>
                자주
              </button>
              <button id="msg" className={rightTab === "msg" ? "selectedBtn" : "selectBtn"} onClick={rightBtn}>
                메세지
              </button>
            </div>
          </div>
          {/* {loginUser.type === "general" ? ( */}
          <div className="contentBox">
            <GeneralFirstTab />
            <Switch>
              <Route path={`/mypage`} component={MyConsult} exact={true} />
              <Route path={`/mypage/myinfo`} component={MyInfo} />
            </Switch>
            {rightTab === "freq" ? <MyFrequent /> : <GeneralThirdTab />}
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
    </div>
  );
};

export default MyPageMain;
