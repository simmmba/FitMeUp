import React, {useEffect, useState} from "react"
import Header from "../Common/Header"
import './MyPageMain.scss'
import GeneralThirdTab from './GeneralThirdTab'
import GeneralFirstTab from "./GeneralFirstTab";
import GeneralSecondTab from "./GeneralSecondTab";

const MyPageMain = () => {

    const loginUser = JSON.parse(window.sessionStorage.getItem('user'))
    console.log(loginUser)

    return (
        <div>
            <Header/>
            <div className="MyPageMain">
                <div className="processing"/>
                <div className="container topMargin">
                    <div className="selectBtn">프로필</div>
                    <div className="selectBtn">상담 현황</div>
                </div>
                {loginUser.type==="general"?
                    (
                        <div className="outline">
                            <GeneralFirstTab />
                            <GeneralSecondTab />
                            <GeneralThirdTab/>
                        </div>
                    ):
                    (<div className="MyPage">
                        <div>Stylist My Page</div>
                    </div>)}
            </div>
        </div>
    )
}

export default MyPageMain;