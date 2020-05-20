import React, { useState } from "react";
import "./Matching.scss";

import MatchingList from "../Matching/MatchingList";
import Header from "../Common/Header";

const Matching = () => {
  const [tab, setTab] = useState("tab1");

  let tab_list = [
    ["tab1", "전체"],
    ["tab2", "코디"],
    ["tab3", "내 옷"],
  ];

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
          <div className="gender_filter">성별 여자</div>
          <div className="time_filter">최신순</div>
        </div>
        {/* 상담 신청 목록 */}
        <div className="list">
          <MatchingList></MatchingList>
          <MatchingList></MatchingList>
          <MatchingList></MatchingList>
          <MatchingList></MatchingList>
        </div>
      </div>
    </>
  );
};

export default Matching;
