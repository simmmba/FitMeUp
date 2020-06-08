import React, {useEffect, useState} from "react";
import {NavLink, Route, Switch} from "react-router-dom";
import Header from "../Common/Header";
import "./MyPageMain.scss";
import GeneralThirdTab from "./GeneralThirdTab";
import GeneralFirstTab from "./GeneralFirstTab";
import StylistFirstTab from "./StylistFirstTab";
import MyInfo from "./MyInfo";
import MyFrequent from "./MyFrequent";
import MyConsult from "./MyConsult";
import StylistMyInfo from "./StylistMyInfo";
import StylistStats from "./StylistStats";
import CreditHistory from "./CreditHistory";
import axios from 'axios'

const MyPageMain = () => {
    const loginUser = JSON.parse(window.sessionStorage.getItem("user"));
    const [generalUserFlag, setGeneralUserFlag] = useState(false);
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

    return (
        <div>
            <Header/>
            <div className="MyPageMain">
                {loginUser.type === "general" ? (
                    <div>
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
                        <div className="contentBox">
                            <GeneralFirstTab/>
                            <Switch>
                                <Route path={`/mypage`} component={MyFrequent} exact={true}/>
                                <Route path={`/mypage/myconsult`} component={MyConsult}/>
                                <Route path={`/mypage/myinfo`} component={MyInfo}/>
                            </Switch>
                            {/* <GeneralSecondTab /> */}
                            <GeneralThirdTab/>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="container">
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
    );
};

export default MyPageMain;
