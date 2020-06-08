import React, { useEffect, useState } from "react";
import "./MyPageMain.scss";
import "../Portfolio/PortfolioWrite.scss"
import axios from "axios";

const StylistMyInfo = () => {
    const loginUser = JSON.parse(window.sessionStorage.getItem("user"));
    const [user, setUser] = useState({});
    const [modifyMode, setModifyMode] = useState(false);
    const [basicInfo, setBasicInfo] = useState({
        name: user.name,
        belong: user.belong,
        phone: user.phone,
        occupation: user.occupation
    })

    useEffect(() => {
        get_user();
    }, []);

    const get_user = () => {
        axios.get(`${process.env.REACT_APP_URL}/user/myinfo?user_id=` + loginUser.id).then((res) => {
            const user = res.data.user;
            setUser(user);
            setBasicInfo(user);
        });
    };

    const handleChange = (e) => {
        setBasicInfo({...basicInfo, [e.target.name]: e.target.value})
    };

    const handleBtnClick = () => {
        if (modifyMode) {
            axios
                .put(`${process.env.REACT_APP_URL}/user/myinfo`, {
                    id: user.id,
                    type: user.type,
                    gender: user.gender,
                    age: user.age,
                    nickname: user.nickname,
                    profile_img: user.profile_img,
                    platform: user.platform,
                    api_id: user.api_id,
                    name: basicInfo.name,
                    belong: basicInfo.belong,
                    phone: basicInfo.phone,
                    occupation: basicInfo.occupation,
                    height: user.height,
                    weight: user.weight,
                    top: user.top,
                    bottom: user.bottom,
                })
                .then((res) => {
                    if (res.data.result === "Success") {
                        axios.get(`${process.env.REACT_APP_URL}/user/myinfo?user_id=` + loginUser.id).then((response) => {
                            window.sessionStorage.setItem("user", JSON.stringify(response.data.user));
                            setUser(response.data.user);
                        });
                    }
                })
                .catch((err) => {
                    alert("정보 변경에 실패;;");
                    console.log(err);
                });
        }
        setModifyMode(!modifyMode);
    };

    const clickCancel = () => {
        setModifyMode(false);
    };

    const handleImgChange = (e) => {
        console.log(e.target.files[0])
        let img = new FormData()
        img.append("img", e.target.files[0])
        axios({
            method: "post",
            url: `${process.env.REACT_APP_URL}/upload/profile?user_id=` + loginUser.id,
            data: img,
        })
            .then((res) => {
                if(res.data.result==="Success") {
                    axios.get(`${process.env.REACT_APP_URL}/user/myinfo?user_id=` + loginUser.id)
                        .then(res => {
                            window.sessionStorage.setItem("user", JSON.stringify(res.data.user));
                            setUser(res.data.user)
                            console.log(res.data.user)
                        })
                }
                alert("프로필 사진 등록 성공");
            })
            .catch((error) => {
                alert("프로필 사진 등록 중 오류가 발생했습니다.");
            });
    }

    return (
        <>
            <div className="middle_tab">
                <div className="center">
                    <h3>
                        <b>기본 정보</b>
                    </h3>
                </div>
                <div className="center topMargin">
                    <img src={user.profile_img} alt={"Profile Image"} className="profile"/>
                </div>
                <div className="center">
                    <div className="center">
                        <div className="filebox center">
                            <label className="center">
                                프로필 사진 수정
                                <input
                                    type="file"
                                    name="main_img"
                                    accept="image/gif, image/jpeg, image/png"
                                    className="center"
                                    onChange={handleImgChange}
                                />
                            </label>
                        </div>
                        {/*{this.state.main_base64 !== "" && (*/}
                        {/*    <img alt="메인이미지" src={this.state.main_base64}></img>*/}
                        {/*)}*/}
                    </div>
                </div>
                <div className="center info">
                    <div className="col-5 title">이름</div>
                    {modifyMode ? (
                        <div className="col-7 content">
                            <input type="text" name="name" onChange={handleChange} value={basicInfo.name} className="input"/>
                        </div>
                    ) : (
                        <div className="col-7 contentFill">{user.name ? user.name : "*"}</div>
                    )}
                </div>
                <div className="center info">
                    <div className="col-5 title">소속</div>
                    {modifyMode ? (
                        <div className="col-7 content">
                            <input type="text" name="belong" onChange={handleChange} value={basicInfo.belong} className="input"/>
                        </div>
                    ) : (
                        <div className="col-7 contentFill">{user.belong ? user.belong : "*"}</div>
                    )}
                </div>
                <div className="center info">
                    <div className="col-5 title">직업</div>
                    {modifyMode ? (
                        <div className="col-7 content">
                            <input type="text" name="occupation" onChange={handleChange} value={basicInfo.occupation} className="input"/>
                        </div>
                    ) : (
                        <div className="col-7 contentFill">{user.occupation ? user.occupation : "*"}</div>
                    )}
                </div>
                <div className="center info">
                    <div className="col-5 title">연락처</div>
                    {modifyMode ? (
                        <div className="col-7 content">
                            <input type="text" name="phone" onChange={handleChange} value={basicInfo.phone} className="input"/>
                        </div>
                    ) : (
                        <div className="col-7 contentFill">{user.phone ? user.phone : "*"}</div>
                    )}
                </div>
                <div className="center middleTopMargin">
                    {modifyMode ? (
                        <div className="center">
                            <div className="smallSelectBtn" onClick={clickCancel}>
                                취소
                            </div>
                            <div className="smallSelectBtn" onClick={handleBtnClick}>
                                수정
                            </div>
                        </div>
                    ) : (
                        <div className="smallSelectBtn" onClick={handleBtnClick}>
                            기본 정보 수정
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default StylistMyInfo


