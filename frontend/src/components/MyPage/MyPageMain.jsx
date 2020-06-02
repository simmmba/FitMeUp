import React, {useEffect, useState} from "react";
import Header from "../Common/Header";
import './MyPageMain.scss'
import axios from 'axios'
import Messages from './Messages'

const MyPageMain = () => {

    const loginUser = window.sessionStorage.getItem('user')
    const [user, setUser] = useState({})
    const [consultList, setConsultList] = useState([])
    // 요청한 상담 수
    const [requestedConsultCount, setRequestedConsultCount] = useState(0)
    // 진행 중인 상담 수
    const [progressConsultCount, setProgressConsultCount] = useState(0)
    // 완료된 상담 수
    const [doneConsultCount, setDoneConsultCount] = useState(0)
    // 스타일리스트 요청 수
    const [reqOfStylistCount, setReqOfStylistCount] = useState(0)

    const [receivedMessageList, setReceivedMessageList] = useState([])
    const [sentMessageList, setSentMessageList] = useState([])

    useEffect(() => {
        get_user()
        get_consult_list()
        get_req_stylist()
        // get_received_message()
        // get_sent_message
    }, [])

    const get_user = () => {
        axios.get(`${process.env.REACT_APP_URL}/user/myinfo?user_id=1`)
            .then(res => {
                setUser(res.data.user)
            }).catch(err => {
                console.log(err)
        })
    }
    const get_consult_list = () => {
        axios.get(`${process.env.REACT_APP_URL}/consult/myreqlist?user_id=2`)
            .then(res => {
                setConsultList(res.data.list)
                // console.log(res.data.list)
                res.data.list.forEach(c => {
                    if(c.state === "REQUESTED") {
                        setRequestedConsultCount(requestedConsultCount+1)
                    } else if(c.state === "PROGRESS") {
                        setProgressConsultCount(progressConsultCount+1)
                    } else if(c.state === "DONE") {
                        setDoneConsultCount(doneConsultCount+1)
                    }
                })
            }).catch(err => {
                console.log(err)
        })
    }
    const get_req_stylist = () => {
        axios.get(`${process.env.REACT_APP_URL}/consult/apply?user_id=`+2)
            .then(res => {
                setRequestedConsultCount(res.data.list.length)
            }).catch(err => {
                console.log(err)
        })
    }

    return (
        <div>
            <Header/>
            <div className="MyPageMain">
                <div className="processing"/>
                <div className="container topMargin">
                    <div className="selectBtn">프로필</div>
                    <div className="selectBtn">상담 현황</div>
                </div>
                {user.type==="General"?
                    (
                        <div className="outline">
                            <div className="one_tab col-2">
                                <div className="center topMargin">
                                    <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/cbdef037365169.573db7853cebb.jpg" alt={"Profile Image"} className="profile"/>
                                </div>
                                <div className="center topMargin">{user.nickname}</div>
                                <div className="center">개인 회원</div>
                                <div className="center">
                                    <div className="smallSelectBtn">기본정보 수정</div>
                                </div>
                                <div className="center">{user.credit} Point</div>
                                <div className="center">
                                    <div className="smallSelectBtn">충전하기</div>
                                    <div className="smallSelectBtn">히스토리</div>
                                </div>
                                <div className="center middleTopMargin">
                                    <table>
                                        <tbody>
                                            <tr><td className="tdl">진행중 상담</td><td className="tdr">{progressConsultCount}</td></tr>
                                            <tr><td className="tdl">요청한 상담</td><td className="tdr">{requestedConsultCount}</td></tr>
                                            <tr><td className="tdl">완료된 상담</td><td className="tdr">{doneConsultCount}</td></tr>
                                            <tr><td className="tdl">받은 요청</td><td className="tdr">{reqOfStylistCount}</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="outline col-5">
                                <div className="col-7 inner_tab">
                                    <div className="center middleTopMargin"><h3>기본 정보</h3></div>
                                    <div className="center info">
                                        <div className="col-6 title">키</div><div className="col-6">{user.height?(user.height):("*")}</div>
                                    </div>
                                    <div className="center info">
                                        <div className="col-6 title">몸무게</div><div className="col-6">{user.weight?(user.weight):("*")}</div>
                                    </div>
                                    <div className="center info">
                                        <div className="col-6 title">상의 사이즈</div><div className="col-6">{user.top?(user.top):("*")}</div>
                                    </div>
                                    <div className="center info">
                                        <div className="col-6 title">하의 사이즈</div><div className="col-6">{user.bottom?(user.bottom):("*")}</div>
                                    </div>
                                    <div className="center info">
                                        <div className="col-6 title">직업</div><div className="col-6">{user.occupation?(user.occupation):(0)}</div>
                                    </div>
                                </div>
                                <div className="col-4 inner_tab">
                                    <div className="center middleTopMargin">가장 교류가 많은 스타일리스트</div>
                                </div>
                            </div>
                            <div className="one_tab col-2">
                                <Messages/>
                            </div>
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