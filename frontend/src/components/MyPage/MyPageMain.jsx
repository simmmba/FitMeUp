import React, {useEffect, useState} from "react";
import {NavLink, Route, Switch} from "react-router-dom";
import Header from "../Common/Header";
import "./MyPageMain.scss";
import GeneralThirdTab from "./GeneralThirdTab";
import GeneralFirstTab from "./GeneralFirstTab";
import StylistFirstTab from "./StylistFirstTab";
import MyInfo from "./MyInfo";
import MyConsult from "./MyConsult";
import MyFrequent from "./MyFrequent";
import StylistMyInfo from "./StylistMyInfo";
import StylistStats from "./StylistStats";
import CreditHistory from "./CreditHistory";
import axios from 'axios'

const MyPageMain = () => {
  const loginUser = JSON.parse(window.sessionStorage.getItem("user"));
  const [generalUserFlag, setGeneralUserFlag] = useState(false);
  const [rightTab, setRightTab] = useState("freq");
    const [isPortfolioExist, setIsPortfolioExist] = useState(true);

    useEffect(() => {
        if(loginUser.type==="stylist") {
            axios.get(`${process.env.REACT_APP_URL}/portfolio/check?stylist_id=` + loginUser.id)
                .then(res => {
                    if(res.data.isExist==="true") {
                        setIsPortfolioExist(true)
                    } else {
                        setIsPortfolioExist(false)
                    }
                })
        }
    }, [])

  const rightBtn = (e) => {
    setRightTab(e.target.id);
  };

  return (
    <div>
      <Header />
      <div className="MyPageBox">
        <div className="MyPageMain">
            {loginUser.type==="general"?(
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
            ):(<div/>)}
           {loginUser.type === "general" ? (
          <div className="contentBox">
            <GeneralFirstTab />
            <Switch>
              <Route path={`/mypage`} component={MyConsult} exact={true} />
              <Route path={`/mypage/myinfo`} component={MyInfo} />
                <Route path={`/mypage/credit`} component={CreditHistory}/>
            </Switch>
            {rightTab === "freq" ? <MyFrequent /> : <GeneralThirdTab />}
          </div>
           ) : (
               <div>
                   <div className="MyPageMenu">
                       <div className="middleMenu">
                           <NavLink to="/mypage" className="selectBtn" activeClassName="selectedBtn" exact>
                               통계
                           </NavLink>
                           <NavLink to="/mypage/myinfo" className="selectBtn" activeClassName="selectedBtn">
                               내 정보
                           </NavLink>
                           {isPortfolioExist?(
                               <NavLink to={`/portfolio/detail/` + loginUser.id} className="selectBtn" activeClassName="selectedBtn">
                                   포트폴리오 보기
                               </NavLink>
                           ):(
                               <NavLink to={`/portfolio/write`} className="selectBtn" activeClassName="selectedBtn">
                                   포트폴리오 작성
                               </NavLink>
                           )}
                       </div>
                   </div>
                   <div className="contentBox">
                       <StylistFirstTab/>
                       <Switch>
                           <Route path={`/mypage`} component={StylistStats} exact={true}/>
                           <Route path={`/mypage/myinfo`} component={StylistMyInfo}/>
                           <Route path={`/mypage/credit`} component={CreditHistory}/>
                       </Switch>
                       {/*<StylistSecondTab/>*/}
                       <GeneralThirdTab/>
                   </div>
               </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default MyPageMain;
