import React, {useEffect, useState} from "react"
import './MyPageMain.scss'
import axios from 'axios'
import { Link } from "react-router-dom";

const GeneralSecondTab = () => {

    const loginUser = JSON.parse(window.sessionStorage.getItem('user'))
    const [user, setUser] = useState({})
    const [ modifyMode, setModifyMode ] = useState(false)
    const [stylistList, setStylistList] = useState([])

    const basicInfo = {
        height: 0,
        weight: 0,
        top: "",
        bottom: "",
        occupation: ""
    }

    useEffect(() => {
        get_stylist_list()
        get_user()
    }, [])

    const get_user = () => {
        axios.get(`${process.env.REACT_APP_URL}/user/myinfo?user_id=` + loginUser.id)
            .then(res => {
                setUser(res.data.user)
            })
    }

    const get_stylist_list = () => {
        axios.get(`${process.env.REACT_APP_URL}/user/most_consulting?user_id=` + loginUser.id)
            .then(res => {
                setStylistList(res.data.stylists)
                console.log(res.data.stylists)
            })
    }

    const handleChange = (e) => {
        basicInfo[e.target.name] = e.target.value
    }

    const handleBtnClick = () => {
        if(modifyMode) {
            axios.put(`${process.env.REACT_APP_URL}/user/myinfo`,
                {
                    id: user.id,
                    type: user.type,
                    gender: user.gender,
                    age: user.age,
                    nickname: user.nickname,
                    profile_img: user.profile_img,
                    platform: user.platform,
                    api_id: user.api_id,
                    name: user.name,
                    belong: user.belong,
                    phone: user.phone,
                    occupation: basicInfo.occupation,
                    height: basicInfo.height,
                    weight: basicInfo.weight,
                    top: basicInfo.top,
                    bottom: basicInfo.bottom,
                })
                .then(res => {
                    console.log(res)
                    if(res.data.result==="Success") {
                        axios.get(`${process.env.REACT_APP_URL}/user/myinfo?user_id=` + loginUser.id)
                            .then(response => {
                                window.sessionStorage.setItem("user", JSON.stringify(response.data.user))
                                setUser(response.data.user)
                            })
                    }
                }).catch(err => {
                    console.log(err)
            })
        }
        setModifyMode(!modifyMode)
    }

    return (
        <div className="outline col-5">
            <div className="col-7 inner_tab">
                <div className="center middleTopMargin"><h3>기본 정보</h3></div>
                <div className="center info">
                    <div className="col-6 title">키</div>
                    {modifyMode?(
                            <div className="col-6">
                                <input
                                    type="number"
                                    name="height"
                                    onChange={handleChange}
                                    className="input"
                                    placeholder={"cm 단위 입력"}
                                />
                            </div>
                        )
                        :(<div className="col-6">{user.height ? (user.height) : ("*")}</div>)}
                </div>
                <div className="center info">
                    <div className="col-6 title">몸무게</div>
                    {modifyMode?(
                            <div className="col-6">
                                <input
                                    type="number"
                                    name="weight"
                                    onChange={handleChange}
                                    className="input"
                                    placeholder={"kg 단위 입력"}
                                />
                            </div>
                        )
                        :(<div className="col-6">{user.weight ? (user.weight) : ("*")}</div>)}
                </div>
                <div className="center info">
                    <div className="col-6 title">상의 사이즈</div>
                    {modifyMode?(
                            <div className="col-6">
                                <input
                                    type="text"
                                    name="top"
                                    onChange={handleChange}
                                    className="input"
                                    placeholder={"예시) 100 / L"}
                                />
                            </div>
                        )
                        :(<div className="col-6">{user.top ? (user.top) : ("*")}</div>)}
                </div>
                <div className="center info">
                    <div className="col-6 title">하의 사이즈</div>
                    {modifyMode?(
                            <div className="col-6">
                                <input
                                    type="text"
                                    name="bottom"
                                    onChange={handleChange}
                                    className="input"
                                    placeholder={"예시) 31 / L"}
                                />
                            </div>
                        )
                        :(<div className="col-6">{user.bottom ? (user.bottom) : ("*")}</div>)}
                </div>
                <div className="center info">
                    <div className="col-6 title">직업</div>
                    {modifyMode?(
                            <div className="col-6">
                                <input
                                    type="text"
                                    name="occupation"
                                    onChange={handleChange}
                                    className="input"
                                    placeholder={"예시) 회사원"}
                                />
                            </div>
                        )
                        :(<div className="col-6">{user.occupation ? (user.occupation) : ("*")}</div>)}
                </div>
                <div className="center middleTopMargin">
                    {modifyMode?(
                        <div className="selectBtn" onClick={handleBtnClick}>수정</div>
                    ):(
                        <div className="smallSelectBtn" onClick={handleBtnClick}>기본 정보 수정</div>
                    )}
                </div>
            </div>
            <div className="col-4 inner_tab">
                <div className="center middleTopMargin">가장 교류가 많은 스타일리스트</div>
                <div className="topMargin center">
                    {stylistList.map(s => {
                        return (
                            <Link to={`/portfolio/${s.stylist_id}`} className="stylist center textBlack" key={s.stylist_id}>
                                <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/cbdef037365169.573db7853cebb.jpg" alt="profile img" className="stylistProfile"/>
                                <div className="smallLeftMargin">{s.User.nickname}<div>스타일리스트</div></div>
                                <div className="smallLeftMargin">{s.consult_cnt}회 상담</div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default GeneralSecondTab