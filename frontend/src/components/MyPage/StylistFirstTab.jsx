import React, {useEffect, useState} from "react"
import './MyPageMain.scss'
import axios from 'axios'

const StylistFirstTab = () => {
    const loginUser = JSON.parse(window.sessionStorage.getItem('user'))
    const [user, setUser] = useState({})
    const [consultList, setConsultList] = useState([])
    const [receivedCount, setReceivedCount] = useState(0)
    const [sentCount, setSentCount] = useState(0)
    const [progressCount, setProgressCount] = useState(0)
    const [doneConsultCount, setDoneConsultCount] = useState(0)

    useEffect(() => {
        get_user()
    }, [])

    const get_user = () => {
        axios.get(`${process.env.REACT_APP_URL}/user/myinfo?user_id=` + loginUser.id)
            .then(res => {
                setUser(res.data.user)
            })
    }

    return (
        <div className="one_tab col-2">
            <div className="center middleTopMargin">
                <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/cbdef037365169.573db7853cebb.jpg" alt={"Profile Image"} className="profile"/>
            </div>
            <div className="center topMargin">{user.name}</div>
            <div className="center">스타일리스트</div>
            <div className="center middleTopMargin">{user.credit} Point</div>
            <div className="center">
                <div className="smallSelectBtn">출금하기</div>
                <div className="smallSelectBtn">히스토리</div>
            </div>
            <div className="center middleTopMargin">
                <table>
                    <tbody>
                        <tr><td className="tdl">진행중 상담</td><td className="tdr">{progressCount}</td></tr>
                        <tr><td className="tdl">받은 요청</td><td className="tdr">{receivedCount}</td></tr>
                        <tr><td className="tdl">보낸 요청</td><td className="tdr">{sentCount}</td></tr>
                        <tr><td className="tdl">완료된 상담</td><td className="tdr">{doneConsultCount}</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StylistFirstTab