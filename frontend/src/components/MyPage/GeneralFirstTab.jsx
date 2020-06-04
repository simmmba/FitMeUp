import React, {useEffect, useState} from "react"
import './MyPageMain.scss'
import axios from 'axios'

const GeneralFirstTab = () => {
    const loginUser = JSON.parse(window.sessionStorage.getItem('user'))
    const [user, setUser] = useState({})
    const [consultList, setConsultList] = useState([])
    const [requestedConsultCount, setRequestedConsultCount] = useState(0)
    const [progressConsultCount, setProgressConsultCount] = useState(0)
    const [doneConsultCount, setDoneConsultCount] = useState(0)
    const [reqOfStylistCount, setReqOfStylistCount] = useState(0)

    useEffect(() => {
        get_consult_list()
        get_req_stylist()
        get_user()
    }, [])

    const get_user = () => {
        axios.get(`${process.env.REACT_APP_URL}/user/myinfo?user_id=` + loginUser.id)
            .then(res => {
                setUser(res.data.user)
            })
    }

    const get_consult_list = () => {
        axios.get(`${process.env.REACT_APP_URL}/consult/myreqlist?user_id=` + loginUser.id)
            .then(res => {
                setConsultList(res.data.list)
                res.data.list.forEach(c => {
                    if(c.state === "REQUESTED") {
                        setRequestedConsultCount(requestedConsultCount+1)
                    } else if(c.state === "PROGRESS") {
                        setProgressConsultCount(progressConsultCount+1)
                    } else if(c.state === "COMPLETE") {
                        setDoneConsultCount(doneConsultCount+1)
                    }
                })
            }).catch(err => {
            console.log(err)
        })
    }

    const get_req_stylist = () => {
        axios.get(`${process.env.REACT_APP_URL}/consult/apply?user_id=` + loginUser.id)
            .then(res => {
                setReqOfStylistCount(res.data.list.length)
            }).catch(err => {
            console.log(err)
        })
    }


    return (
        <div className="one_tab col-2">
            <div className="center middleTopMargin">
                <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/cbdef037365169.573db7853cebb.jpg" alt={"Profile Image"} className="profile"/>
            </div>
            <div className="center topMargin">{user.nickname}</div>
            <div className="center">개인 회원</div>
            <div className="center middleTopMargin">{user.credit} Point</div>
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
    )
}

export default GeneralFirstTab