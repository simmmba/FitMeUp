import React, { useEffect, useState } from "react";
import "./MyPageMain.scss";
import axios from "axios";
import { Link } from "react-router-dom";

const MyFrequent = () => {
  const loginUser = JSON.parse(window.sessionStorage.getItem("user"));
  const [user, setUser] = useState({});
  const [modifyMode, setModifyMode] = useState(false);
  const [stylistList, setStylistList] = useState([]);

  const basicInfo = {
    height: 0,
    weight: 0,
    top: "",
    bottom: "",
    occupation: "",
  };

  useEffect(() => {
    get_stylist_list();
    get_user();
  }, []);

  const get_user = () => {
    axios.get(`${process.env.REACT_APP_URL}/user/myinfo?user_id=` + loginUser.id).then((res) => {
      setUser(res.data.user);
    });
  };

  const get_stylist_list = () => {
    axios.get(`${process.env.REACT_APP_URL}/user/most_consulting?user_id=` + loginUser.id).then((res) => {
      setStylistList(res.data.stylists);
      console.log(res.data.stylists);
    });
  };

  const handleChange = (e) => {
    basicInfo[e.target.name] = e.target.value;
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

  return (
    <div className="middle_tab">
      <div className="center">
        <h3>
          <b>가장 교류가 많은 스타일리스트</b>
        </h3>
      </div>
      <div className="topMargin center">
        {stylistList.map((s) => {
          return (
            <Link to={`/portfolio/${s.stylist_id}`} className="stylist center textBlack" key={s.stylist_id}>
              <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/cbdef037365169.573db7853cebb.jpg" alt="profile img" className="stylistProfile" />
              <div className="smallLeftMargin">
                {s.User.nickname}
                <div>스타일리스트</div>
              </div>
              <div className="smallLeftMargin">{s.consult_cnt}회 상담</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MyFrequent;
