import React, { useState, useEffect } from "react";
import "./Matching.scss";
import axios from "axios";

import MatchingList from "../Matching/MatchingList";
import Header from "../Common/Header";

const Matching = () => {
  const [tab, setTab] = useState("tab1");
  const [gender, setGender] = useState("total");
  const [time, setTime] = useState("tab1");
  const [list, setList] = useState([]);

  let tab_list = [
    ["tab1", "전체"],
    ["tab2", "코디"],
    ["tab3", "내 옷"],
  ];

  let match = [];

  // 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정
  // 마운트 될때만 실행
  useEffect(() => {
    req_list();
  }, []);

  // axios로 리스트를 부름
  const req_list = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL}/consult/reqlist`,
    })
      // 로그인 안되있는 거면
      .then((res) => {
        console.log(res);
        setList(res.data.list);
        alert("상담 요청 내역을 가져오는데 성공했습니다.");
      })
      .catch((error) => {
        alert("상담 요청 내역을 가져오는데 실패했습니다.");
      });
  };

  // tab을 바꾸면 axois 새로 호출 및 표시
  const clickTab = (e) => {
    setTab(e.target.id);
  };

  return (
    <>
      <Header></Header>
      <div className="Matching">
        {/* 선택 탭 */}
        <div className="tab">
          <div className="row">
            {tab_list.map((tabitem) => (
              <div key={tabitem[0]} className="col-4">
                <div id={tabitem[0]} onClick={clickTab}>
                  {tabitem[1]}
                  {tab === tabitem[0] && " (" + 127 + ")"}
                </div>
                <div className={tab === tabitem[0] ? "focus" : ""} />
              </div>
            ))}
          </div>
        </div>
        <div className="condition">
          {/* <div className="charge">상담 수 (127)</div> */}
          <div className="gender_filter">
            성별 <span>여자</span>
          </div>
          <div className="time_filter">최신순</div>
        </div>
        {/* 상담 신청 목록 */}
        <div className="list">
          {list.map((match, index) => (<MatchingList key={index} match={match}></MatchingList>))}
        </div>
      </div>
    </>
  );
};

export default Matching;
