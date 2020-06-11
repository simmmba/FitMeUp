import React, { useEffect, useState } from "react";
import "./MyPageMain.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import Withdraw from "../Payment/Withdraw";

const StylistFirstTab = () => {
  const [user, setUser] = useState({});
  const [requestedCount, setRequestedCount] = useState(0);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [applyCount, setApplyCount] = useState(0);
  const [isPortfolioExist, setIsPortfolioExist] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/user/myinfo?user_id=` + JSON.parse(window.sessionStorage.getItem("user")).id).then((res) => {
      setUser(res.data.user);
    });
    axios.get(`${process.env.REACT_APP_URL}/consult/count_stylist?user_id=` + JSON.parse(window.sessionStorage.getItem("user")).id).then((res) => {
      setAcceptedCount(res.data.info.accepted_cnt);
      setApplyCount(res.data.info.apply_cnt);
      setCompletedCount(res.data.info.complete_cnt);
      setRequestedCount(res.data.info.requested_cnt);
    });
    axios.get(`${process.env.REACT_APP_URL}/portfolio/check?stylist_id=` + JSON.parse(window.sessionStorage.getItem("user")).id).then((res) => {
      if (res.data.isExist === "true") {
        setIsPortfolioExist(true);
      } else {
        setIsPortfolioExist(false);
      }
    });
  }, []);

  const handleImgChange = (e) => {
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
        <img alt="프로필 이미지" src={user.profile_img} className="profile" />
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
      <div className="center topMargin">{user.nickname}</div>
      <div className="center">스타일리스트</div>
      <div className="center middleTopMargin">{user.credit} Point</div>
      <div className="center">
        <Withdraw />
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
              <td className="tdl">받은 요청</td>
              <td className="tdr">{requestedCount}</td>
            </tr>
            <tr>
              <td className="tdl">보낸 요청</td>
              <td className="tdr">{applyCount}</td>
            </tr>
            <tr>
              <td className="tdl">완료된 상담</td>
              <td className="tdr">{completedCount}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {isPortfolioExist ? (
        <Link to={`/portfolio/detail/` + JSON.parse(window.sessionStorage.getItem("user")).id} className="portfolioBtn">
          포트폴리오 보기
        </Link>
      ) : (
        <Link to={`/portfolio/write`} className="portfolioBtn">
          포트폴리오 작성
        </Link>
      )}
    </div>
  );
};

export default StylistFirstTab;
