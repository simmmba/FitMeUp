import React, {useEffect, useState} from "react"
import Header from "../Common/Header"
import './MyPageMain.scss'
import GeneralThirdTab from './GeneralThirdTab'
import GeneralFirstTab from "./GeneralFirstTab";
import GeneralSecondTab from "./GeneralSecondTab";
import StylistFirstTab from "./StylistFirstTab";

const MyPageMain = () => {

    const loginUser = JSON.parse(window.sessionStorage.getItem('user'))
    const [ generalUserFlag, setGeneralUserFlag ] = useState(false);

    const handleClick = () => {
        setGeneralUserFlag(!generalUserFlag)
    }

    return (
        <div>
            <Header/>
            <div className="MyPageMain">
                <div className="processing"/>
                {/*<div className="container topMargin">*/}
                {/*    <div className="selectBtn">프로필</div>*/}
                {/*    <div className="selectBtn">상담 현황</div>*/}
                {/*</div>*/}
                {loginUser.type==="general"?
                    (
                        <div className="outline">
                            <GeneralFirstTab />
                            <GeneralSecondTab />
                            <GeneralThirdTab/>
                        </div>
                    ):
                    (
                        <div className="outline">
                            <StylistFirstTab/>
                            {/*<StylistSecondTab/>*/}
                            {/*<StylistThirdTab/>*/}
                        </div>
                    )}
            </div>
        </div>
    )
}

export default MyPageMain;