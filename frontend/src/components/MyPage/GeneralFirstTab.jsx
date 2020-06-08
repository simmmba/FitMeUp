import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Payment from "../Payment/Payment";
import "./MyPageMain.scss";
import axios from "axios";

const GeneralFirstTab = () => {
  const [user, setUser] = useState({});
  const [requestedCount, setRequestedCount] = useState(0);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [applyCount, setApplyCount] = useState(0);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/user/myinfo?user_id=` + JSON.parse(window.sessionStorage.getItem("user")).id).then((res) => {
      setUser(res.data.user);
    });
    axios.get(`${process.env.REACT_APP_URL}/consult/count_user?user_id=` + JSON.parse(window.sessionStorage.getItem("user")).id).then((res) => {
      setAcceptedCount(res.data.info.accepted_cnt);
      setApplyCount(res.data.info.apply_cnt);
      setCompletedCount(res.data.info.complete_cnt);
      setRequestedCount(res.data.info.requested_cnt);
    });
  }, []);

  const handleImgChange = (e) => {
    console.log(e.target.files[0]);
    let img = new FormData();
    img.append("img", e.target.files[0]);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/upload/profile?user_id=` + JSON.parse(window.sessionStorage.getItem("user")).id,
      data: img,
    })
      .then((res) => {
        if (res.data.result === "Success") {
          axios.get(`${process.env.REACT_APP_URL}/user/myinfo?user_id=` + JSON.parse(window.sessionStorage.getItem("user")).id).then((res) => {
            window.sessionStorage.setItem("user", JSON.stringify(res.data.user));
            setUser(res.data.user);
          });
        }
        alert("프로필 사진 등록 성공");
      })
      .catch((error) => {
        alert("프로필 사진 등록 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className="left_tab">
      <div className="center">
        <img src={user.profile_img} alt="프로필이미지" className="profile" />
      </div>
      <div className="center">
        <div className="center">
          <div className="filebox center">
            <label className="center profileImgBtn">
              프로필 사진 수정
              <input type="file" name="main_img" accept="image/gif, image/jpeg, image/png" className="center" onChange={handleImgChange} />
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
        <Link to={"/mypage/credit"} className="smallSelectBtn">
          히스토리
        </Link>
      </div>
      <div className="center middleTopMargin">
        <table>
          <tbody>
            <tr>
              <td className="tdl">진행중 상담</td>
              <td className="tdr">{acceptedCount}</td>
            </tr>
            <tr>
              <td className="tdl">요청한 상담</td>
              <td className="tdr">{requestedCount}</td>
            </tr>
            <tr>
              <td className="tdl">완료된 상담</td>
              <td className="tdr">{completedCount}</td>
            </tr>
            <tr>
              <td className="tdl">받은 요청</td>
              <td className="tdr">{applyCount}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GeneralFirstTab;
