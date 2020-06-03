import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import axios from "axios";

import Header from "../Common/Header";
import { Form } from "react-bootstrap";
import defaultImg from "../../img/test.jpg";
import { Rate, Empty, Spin } from "antd";
import "./Search.scss";

const Stylist = ({ keyword, option, order, result, setResult, setKeyword, setOption, setOrder, first, setFirst }) => {
  const [dumpOption, setDumpOption] = useState(option);
  const [dumpKeyword, setDumpKeyword] = useState(keyword);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (first) {
      axios.get(`${process.env.REACT_APP_URL}/user/search?option=${"all"}&keyword=${""}&sort=${"review_cnt"}`).then((res) => {
        setResult(res.data.stylists);
        setLoading(true);
        // console.log(res.data.stylists);
      });
    }
  }, [first, setResult]);

  const setSearchDetail = (e) => {
    let id = e.target.id;
    let value = e.target.value;

    switch (id) {
      case "option":
        setDumpOption(value);
        break;

      case "order":
        setOrder(value);
        break;

      case "search":
        setDumpKeyword(value);
        break;

      default:
        break;
    }
  };

  const goSearch = (e) => {
    if (e.key === "Enter" || e.target.id === "btn") {
      setOption(dumpOption);
      setKeyword(dumpKeyword);
      setFirst();
      setLoading(false);

      axios.get(`${process.env.REACT_APP_URL}/user/search?option=${dumpOption}&keyword=${dumpKeyword}&sort=${order}`).then((res) => {
        setResult(res.data.stylists);
        setLoading(true);
        console.log(res.data);
      });
    }
  };

  const searchList = result.map((val, idx) => (
    <div key={idx}>
      <Link to="/portfolio/7" className="listBox">
        <div className="imgBox">
          <img alt="이미지" src={val.portfolio_img === "/default.jpg" ? defaultImg : val.portfolio_img} />
        </div>
        <div className="detailBox">
          <div className="portfolioName">{val.portfolio_title}</div>
          <div className="nicknameBox">
            <div className="profileImg">
              <img alt="" src={val.profile_img === "/default.jpg" ? defaultImg : val.profile_img} />
            </div>
            <div>{val.nickname} 스타일리스트</div>
          </div>
          <div className="evalBox">
            <Rate disabled allowHalf defaultValue={Math.round(val.avg_score * 2) / 2} />
            &nbsp;&nbsp;&nbsp;
            <div className="score">{Math.round(val.avg_score * 10) / 10}</div>
            &nbsp;&nbsp;
            <div className="review">({val.review_cnt}개)</div>
            <div className="consult">{val.consult_cnt}회 상담</div>
          </div>
          <div className="reviewBox">
            <div className="recentReview">최근리뷰</div>
            <b>{val.recent_review !== null && val.recent_review.nickname}</b>
            <span>{val.recent_review !== null ? val.recent_review.contents : "작성된 리뷰가 없습니다."}</span>
          </div>
        </div>
      </Link>
      <hr />
    </div>
  ));

  return (
    <>
      <Header />
      <div className="Stylist">
        <div className="title">스타일리스트 목록</div>
        <div className="searchOption">
          <Form.Control as="select" id="option" value={dumpOption} onChange={setSearchDetail}>
            {/* <Form.Control as="select" custom> */}
            <option value="all">전체 검색</option>
            <option value="nickname">스타일리스트</option>
            <option value="tag">태그</option>
          </Form.Control>
          <Form.Control as="select" id="order" value={order} onChange={setSearchDetail}>
            {/* <Form.Control as="select" custom> */}
            <option value="review_cnt">리뷰순</option>
            <option value="avg_score">평점순</option>
            <option value="consult_cnt">상담순</option>
          </Form.Control>
          <Form.Control id="search" type="text" value={dumpKeyword} placeholder="검색어를 입력해 주세요" onChange={setSearchDetail} onKeyPress={goSearch} />
          {/* <Form.Control id="budget" type="number" min="0" step="1000" value={consult.budget} onChange={setBudget} placeholder="숫자만 입력해 주세요" /> */}
          <button id="btn" onClick={goSearch}>
            검색
          </button>
        </div>
        <div className="searchResult">
          {!loading ? (
            <Spin className="loading" size="large" />
          ) : result.length > 0 ? (
            searchList
          ) : (
            <div className="nothing">
              <Empty description={<div className="description">해당하는 스타일리스트가 없습니다.</div>} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default inject(({ search }) => ({
  keyword: search.keyword,
  order: search.order,
  option: search.option,
  result: search.result,
  setResult: search.setResult,
  setOption: search.setOption,
  setOrder: search.setOrder,
  setKeyword: search.setKeyword,
  first: search.first,
  setFirst: search.setFirst,
}))(observer(Stylist));
