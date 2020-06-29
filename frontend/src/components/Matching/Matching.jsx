import React, { useState, useEffect } from "react";
import "./Matching.scss";
import axios from "axios";

import MatchingList from "../Matching/MatchingList";
import Header from "../Common/Header";
import { Spin, Empty } from "antd";
import { useHistory } from "react-router";
import ScrollToTop from "../Common/ScrollToTop";
import { inject, observer } from "mobx-react";

const Matching = ({
  mcategory,
  msetCategory,
  mgender,
  msetGender,
  mapply,
  msetApply,
  mdate,
  msetDate,
}) => {
  const [category, setCategory] = useState(mcategory);
  const [gender, setGender] = useState(mgender);
  const [date, setDate] = useState(mdate);
  const [apply, setApply] = useState(mapply);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  // const user = JSON.parse(window.sessionStorage.getItem("user"));
  const history = useHistory();

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
    let user = JSON.parse(window.sessionStorage.getItem("user"));
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

    if (!user || user.type === "general") {
      alert("스타일리스트만 이용 가능한 서비스 입니다.");
      history.goBack();
      return;
    }
    setList([]);
    setLoading(true);
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
        setList(res.data.list);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("상담 요청 내역을 가져오는데 실패했습니다.");
      });
  }, [category, gender, date, apply]);

  // tab을 바꾸면 axois 새로 호출 및 표시
  const clickCategory = (e) => {
    setCategory(e.target.id);
    msetCategory(e.target.id);
  };

  // 성별 바꾸는 함수
  const clickGender = () => {
    if (gender === 2) {
      setGender(0);
      msetGender(0);
    } else {
      msetGender(gender + 1);
      setGender(gender + 1);
    }
  };

  // 성별 바꾸는 함수
  const clickDate = () => {
    if (date === 1) {
      setDate(0);
      msetDate(0);
    } else {
      setDate(1);
      msetDate(1);
    }
  };

  // 지원여부 바꾸는 함수
  const clickApply = () => {
    if (apply === 2) {
      setApply(0);
      msetApply(0);
    } else {
      msetApply(apply + 1);
      setApply(apply + 1);
    }
  };

  return (
    <>
      <Header></Header>
      <ScrollToTop></ScrollToTop>
      <div className="Matching">
        {/* 선택 탭 */}
        <div className="tab">
          <div className="row">
            {category_list.map((tabitem, index) => (
              <div key={tabitem[0]} className="col-4">
                <div id={index} onClick={clickCategory}>
                  {tabitem[1]}
                  {category_list[category][0] === tabitem[0] &&
                    " (" + list.length + ")"}
                </div>
                <div
                  className={
                    category_list[category][0] === tabitem[0] ? "focus" : ""
                  }
                />
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
          {!loading &&
            list.map((match, index) => (
              <MatchingList key={index} match={match}></MatchingList>
            ))}
          {list.length === 0 && !loading && (
            <div className="nothing no_consult">
              <Empty
                description={
                  <span className="description">해당하는 상담이 없습니다.</span>
                }
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default inject(({ filter }) => ({
  mcategory: filter.category,
  mgender: filter.gender,
  mdate: filter.date,
  mapply: filter.apply,
  msetCategory: filter.setCategory,
  msetGender: filter.setGender,
  msetDate: filter.setDate,
  msetApply: filter.setApply,
}))(observer(Matching));
