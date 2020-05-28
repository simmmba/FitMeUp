import React from "react";
import "./Main.scss";
import Carousel from "./Carousel";
import "./MainRecommend.scss";

const MainRecommend = () => {
  return (
    <div className="MainRecommend">
      <div>
        <div className="title">핏미업 인기 스타일리스트</div>
        <Carousel kind="consult" />
        <br />
        <div className="title">만족도 높은 핏미업 스타일리스트</div>
        <Carousel kind="score" />
      </div>
    </div>
  );
};

export default MainRecommend;
