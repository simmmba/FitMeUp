import React from "react";
import "./Main.scss";
import Header from "../Common/Header";
import ConsultRequireModal from "./ConsultRequireModal";
import MainRecommend from "./MainRecommend";
import ScrollToTop from "../Common/ScrollToTop";

const Main = () => {
  return (
    <>
      <ScrollToTop></ScrollToTop>
      <Header></Header>
      <div className="Main">
        <div className="intro">
          <ConsultRequireModal />
        </div>
        <div className="recommend">
          <MainRecommend />
        </div>
      </div>
    </>
  );
};

export default Main;
