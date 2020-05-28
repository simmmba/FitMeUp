import React from "react";
import "./Main.scss";
import Carousel from "./Carousel";
import "./MainRecommend.scss";

const MainRecommend = () => {
  return (
    <div className="MainRecommend">
      <div>
        <div className="title">추천 스타일리스트</div>
        <Carousel />
      </div>
    </div>
  );
};

export default MainRecommend;
