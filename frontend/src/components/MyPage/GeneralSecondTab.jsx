import React, {useEffect, useState} from "react"
import './MyPageMain.scss'
import axios from 'axios'

const GeneralSecondTab = () => {

    const [loginUser, setLoginUser] = useState(JSON.parse(window.sessionStorage.getItem('user')))
    const [ paymentList, setPaymentList ] = useState([])
    const [ modifyMode, setModifyMode ] = useState(false)

    const basicInfo = {
        height: 0,
        weight: 0,
        top: "",
        bottom: "",
        occupation: ""
    }

    useEffect(() => {
        get_payment_list()
    }, [])

    const get_payment_list = () => {
        axios.get(`${process.env.REACT_APP_URL}/payment/list?user_id=` + loginUser.id)
            .then(res => {
                setPaymentList(res.data.payments)
            }).catch(err => {
                console.log(err)
        })
    }

    const handleChange = (e) => {
        basicInfo[e.target.name] = e.target.value
    }

    const handleBtnClick = () => {
        if(modifyMode) {
            // axios post 수정
            loginUser.height = basicInfo.height
            loginUser.weight = basicInfo.weight
            loginUser.top = basicInfo.top
            loginUser.bottom = basicInfo.bottom
            loginUser.occupation = basicInfo.occupation
            axios.put(`${process.env.REACT_APP_URL}/user/myinfo`,
                {
                    id: loginUser.id,
                    type: loginUser.type,
                    gender: loginUser.gender,
                    age: loginUser.age,
                    nickname: loginUser.nickname,
                    profile_img: loginUser.profile_img,
                    platform: loginUser.platform,
                    api_id: loginUser.api_id,
                    name: loginUser.name,
                    belong: loginUser.belong,
                    occupation: basicInfo.occupation,
                    phone: loginUser.phone,
                    height: basicInfo.height,
                    weight: basicInfo.weight,
                    top: basicInfo.top,
                    bottom: basicInfo.bottom,
                })
                .then(res => {
                    console.log(res)
                    // 이거 여백 나중에 정호형한테 말씀드리기
                    if(res.data.result===" Success") {
                        axios.get(`${process.env.REACT_APP_URL}/user/myinfo?user_id=` + loginUser.id)
                            .then(response => {
                                window.sessionStorage.setItem("user", JSON.stringify(response.data.user))
                                setLoginUser(response.data.user)
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
                        :(<div className="col-6">{loginUser.height ? (loginUser.height) : ("*")}</div>)}
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
                        :(<div className="col-6">{loginUser.weight ? (loginUser.weight) : ("*")}</div>)}
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
                        :(<div className="col-6">{loginUser.top ? (loginUser.top) : ("*")}</div>)}
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
                        :(<div className="col-6">{loginUser.bottom ? (loginUser.bottom) : ("*")}</div>)}
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
                        :(<div className="col-6">{loginUser.occupation ? (loginUser.occupation) : ("*")}</div>)}
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
            </div>
        </div>
    )
}

export default GeneralSecondTab