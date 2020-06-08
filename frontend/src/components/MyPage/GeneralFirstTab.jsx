import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Payment from "../Payment/Payment";
import "./MyPageMain.scss";
import axios from "axios";

const GeneralFirstTab = () => {
  const loginUser = JSON.parse(window.sessionStorage.getItem("user"));
  const [user, setUser] = useState({});
  const [consultList, setConsultList] = useState([]);
  const [requestedConsultCount, setRequestedConsultCount] = useState(0);
  const [progressConsultCount, setProgressConsultCount] = useState(0);
  const [doneConsultCount, setDoneConsultCount] = useState(0);
  const [reqOfStylistCount, setReqOfStylistCount] = useState(0);

  useEffect(() => {
    get_consult_list();
    get_req_stylist();
    get_user();
  }, []);

  const get_user = () => {
    axios.get(`${process.env.REACT_APP_URL}/user/myinfo?user_id=` + loginUser.id).then((res) => {
      setUser(res.data.user);
    });
  };

  const get_consult_list = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/consult/myreqlist?user_id=` + loginUser.id)
      .then((res) => {
        setConsultList(res.data.list);
        res.data.list.forEach((c) => {
          if (c.state === "REQUESTED") {
            setRequestedConsultCount(requestedConsultCount + 1);
          } else if (c.state === "PROGRESS") {
            setProgressConsultCount(progressConsultCount + 1);
          } else if (c.state === "COMPLETE") {
            setDoneConsultCount(doneConsultCount + 1);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const get_req_stylist = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/consult/apply?user_id=` + loginUser.id)
      .then((res) => {
        setReqOfStylistCount(res.data.list.length);
      })
      .catch((err) => {
        console.log(err);
      });
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
                })
          }
          alert("프로필 사진 등록 성공");
        })
        .catch((error) => {
          alert("프로필 사진 등록 중 오류가 발생했습니다.");
        });
  }

  return (
    <div className="left_tab">
      <div className="center">
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
        </div>
      </div>
      <div className="center topMargin nickname">{user.nickname}</div>
      <div className="center">개인 회원</div>
      <div className="middleTopMargin creditBox">
        <div className="credit">{user.credit}</div>
        <div>Point</div>
      </div>
      <div className="center">
        <Payment />
        <div className="smallSelectBtn">히스토리</div>
      </div>
      <div className="center middleTopMargin">
        <table>
          <tbody>
            <tr>
              <td className="tdl">진행중 상담</td>
              <td className="tdr">{progressConsultCount}</td>
            </tr>
            <tr>
              <td className="tdl">요청한 상담</td>
              <td className="tdr">{requestedConsultCount}</td>
            </tr>
            <tr>
              <td className="tdl">완료된 상담</td>
              <td className="tdr">{doneConsultCount}</td>
            </tr>
            <tr>
              <td className="tdl">받은 요청</td>
              <td className="tdr">{reqOfStylistCount}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GeneralFirstTab;
