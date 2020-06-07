import React, { useEffect, useState } from "react";
import "./MyPageMain.scss";
import axios from "axios";
import { Link } from "react-router-dom";

const MyInfo = () => {
  const loginUser = JSON.parse(window.sessionStorage.getItem("user"));
  const [user, setUser] = useState({});
  const [modifyMode, setModifyMode] = useState(false);
  const [stylistList, setStylistList] = useState([]);

  const [basicInfo, setBasicInfo] = useState({
    height: user.height,
    weight: user.weight,
    top: user.top,
    bottom: user.bottom,
    occupation: user.occupation,
  });

  useEffect(() => {
    get_stylist_list();
    get_user();
  }, []);

  const get_user = () => {
    axios.get(`${process.env.REACT_APP_URL}/user/myinfo?user_id=` + loginUser.id).then((res) => {
      const user = res.data.user;
      setUser(user);
      setBasicInfo(user);
    });
  };

  const get_stylist_list = () => {
    axios.get(`${process.env.REACT_APP_URL}/user/most_consulting?user_id=` + loginUser.id).then((res) => {
      setStylistList(res.data.stylists);
      console.log(res.data.stylists);
    });
  };

  const handleChange = (e) => {
    setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value });
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
          name: user.name,
          belong: user.belong,
          phone: user.phone,
          occupation: basicInfo.occupation,
          height: basicInfo.height,
          weight: basicInfo.weight,
          top: basicInfo.top,
          bottom: basicInfo.bottom,
        })
        .then((res) => {
          console.log(res);
          if (res.data.result === "Success") {
            axios.get(`${process.env.REACT_APP_URL}/user/myinfo?user_id=` + loginUser.id).then((response) => {
              window.sessionStorage.setItem("user", JSON.stringify(response.data.user));
              setUser(response.data.user);
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setModifyMode(!modifyMode);
  };

  const clickCancel = () => {
    setModifyMode(false);
  };

  console.log(basicInfo.weight);
  return (
    <>
      <div className="col-6 middle_tab">
        <div className="center">
          <h3>
            <b>기본 정보</b>
          </h3>
        </div>
        <div className="center info">
          <div className="col-5 title">키</div>
          {modifyMode ? (
            <div className="col-7 content">
              <input type="number" name="height" onChange={handleChange} value={basicInfo.height} className="input" placeholder={"cm 단위 입력"} />
            </div>
          ) : (
            <div className="col-7 contentFill">{user.height ? user.height + "cm" : "*"}</div>
          )}
        </div>
        <div className="center info">
          <div className="col-5 title">몸무게</div>
          {modifyMode ? (
            <div className="col-7 content">
              <input type="number" name="weight" onChange={handleChange} value={basicInfo.weight} className="input" placeholder={"kg 단위 입력"} />
            </div>
          ) : (
            <div className="col-7 contentFill">{user.weight ? user.weight + "kg" : "*"}</div>
          )}
        </div>
        <div className="center info">
          <div className="col-5 title">상의 사이즈</div>
          {modifyMode ? (
            <div className="col-7 content">
              <input type="text" name="top" onChange={handleChange} value={basicInfo.top} className="input" placeholder={"예시) 100 / L"} />
            </div>
          ) : (
            <div className="col-7 contentFill">{user.top ? user.top : "*"}</div>
          )}
        </div>
        <div className="center info">
          <div className="col-5 title">하의 사이즈</div>
          {modifyMode ? (
            <div className="col-7 content">
              <input type="text" name="bottom" onChange={handleChange} value={basicInfo.bottom} className="input" placeholder={"예시) 31 / L"} />
            </div>
          ) : (
            <div className="col-7 contentFill">{user.bottom ? user.bottom : "*"}</div>
          )}
        </div>
        <div className="center info">
          <div className="col-5 title">직업</div>
          {modifyMode ? (
            <div className="col-7 content">
              <input type="text" name="occupation" onChange={handleChange} value={basicInfo.occupation} className="input" placeholder={"예시) 회사원"} />
            </div>
          ) : (
            <div className="col-7 contentFill">{user.occupation ? user.occupation : "*"}</div>
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
  );
};

export default MyInfo;
