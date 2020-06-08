import React, { useEffect, useState } from "react";
import "./MyPageMain.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import Withdraw from "../Payment/Withdraw";

const StylistFirstTab = () => {
  const loginUser = JSON.parse(window.sessionStorage.getItem("user"));
  const [user, setUser] = useState({});
  const [consultList, setConsultList] = useState([]);
  const [receivedCount, setReceivedCount] = useState(0);
  const [sentCount, setSentCount] = useState(0);
  const [progressCount, setProgressCount] = useState(0);
  const [doneConsultCount, setDoneConsultCount] = useState(0);
  const [isPortfolioExist, setIsPortfolioExist] = useState(true);

  useEffect(() => {
    get_user();
    axios.get(`${process.env.REACT_APP_URL}/portfolio/check?stylist_id=` + loginUser.id).then((res) => {
      if (res.data.isExist === "true") {
        setIsPortfolioExist(true);
      } else {
        setIsPortfolioExist(false);
      }
    });
  }, []);

  const get_user = () => {
    axios.get(`${process.env.REACT_APP_URL}/user/myinfo?user_id=` + loginUser.id).then((res) => {
      setUser(res.data.user);
    });
  };

  return (
    <div className="left_tab">
      <div className="center">
        <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/cbdef037365169.573db7853cebb.jpg" alt={"Profile Image"} className="profile" />
      </div>
      <div className="center topMargin nickname">{user.name}</div>
      <div className="center">스타일리스트</div>
      <div className="middleTopMargin creditBox">
        <div className="credit">{user.credit}</div>
        <div>Point</div>
      </div>
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
              <td className="tdr">{progressCount}</td>
            </tr>
            <tr>
              <td className="tdl">받은 요청</td>
              <td className="tdr">{receivedCount}</td>
            </tr>
            <tr>
              <td className="tdl">보낸 요청</td>
              <td className="tdr">{sentCount}</td>
            </tr>
            <tr>
              <td className="tdl">완료된 상담</td>
              <td className="tdr">{doneConsultCount}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {isPortfolioExist ? (
        <Link to={`/portfolio/detail/` + loginUser.id} className="portfolioBtn">
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
