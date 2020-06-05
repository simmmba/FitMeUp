import React, { useState, useEffect } from "react";
import "./Matching.scss";
import axios from "axios";

import MatchingList from "../Matching/MatchingList";
import Header from "../Common/Header";
import { Spin } from "antd";

const Matching = () => {
  const [category, setCategory] = useState(0);
  const [gender, setGender] = useState(0);
  const [date, setDate] = useState(0);
  const [apply, setApply] = useState(0);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(window.sessionStorage.getItem("user"));

  let category_list = [
    ["entire", "전체"],
    ["my", "내 옷"],
    ["coordi", "코디"],
  ];

  let gender_list = [
    ["entire", "전체"],
    ["여자", "여자"],
    ["남자", "남자"],
  ];

  let date_list = [
    ["newest", "최신순"],
    ["oldest", "등록순"],
  ];

  let apply_list = [
    ["entire", "전체 상담"],
    ["yes", "신청 상담"],
    ["no", "미신청 상담"],
  ];

  // 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정
  // 마운트 될때 + 값 변경 시 실행
  useEffect(() => {
    req_list();
    setList([]);
    setLoading(true);
  }, [category, gender, date, apply]);

  // axios로 리스트를 부름
  const req_list = () => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/consult/reqlist`,
      data: {
        user_id: user.id,
        category_filter: category_list[category][0],
        date_filter: date_list[date][0],
        gender_filter: gender_list[gender][0],
        apply_filter: apply_list[apply][0],
      },
    })
      // 로그인 안되있는 거면
      .then((res) => {
        console.log(res.data.list);
        setList(res.data.list);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("상담 요청 내역을 가져오는데 실패했습니다.");
      });
  };

  // tab을 바꾸면 axois 새로 호출 및 표시
  const clickCategory = (e) => {
    setCategory(e.target.id);
  };

  // 성별 바꾸는 함수
  const clickGender = () => {
    if (gender === 2) setGender(0);
    else setGender(gender + 1);
  };

  // 성별 바꾸는 함수
  const clickDate = () => {
    if (date === 1) setDate(0);
    else setDate(1);
  };

  // 지원여부 바꾸는 함수
  const clickApply = () => {
    if (apply === 2) setApply(0);
    else setApply(apply + 1);
  };

  return (
    <>
      <Header></Header>
      <div className="Matching">
        {/* 선택 탭 */}
        <div className="tab">
          <div className="row">
            {category_list.map((tabitem, index) => (
              <div key={tabitem[0]} className="col-4">
                <div id={index} onClick={clickCategory}>
                  {tabitem[1]}
                  {category_list[category][0] === tabitem[0] && list.length !== 0 && " (" + list.length + ")"}
                </div>
                <div className={category_list[category][0] === tabitem[0] ? "focus" : ""} />
              </div>
            ))}
          </div>
        </div>
        <div className="condition">
          <div className="gender_filter" onClick={clickGender}>
            성별 <span>{gender_list[gender][1]}</span>
          </div>
          <div className="time_filter" onClick={clickDate}>
            {date_list[date][1]}
          </div>
          <div className="fill"></div>
          <div className="apply_filter" onClick={clickApply}>
            {apply_list[apply][1]}
          </div>
        </div>
        {/* 상담 신청 목록 */}
        {loading && <Spin className="loading" size="large" />}
        <div className="list">
          {list.map((match, index) => (
            <MatchingList key={index} match={match}></MatchingList>
          ))}
          {list.length === 0 && !loading && <span className="no_consult">해당하는 상담 내역이 없습니다.</span>}
        </div>
      </div>
    </>
  );
};

export default Matching;
