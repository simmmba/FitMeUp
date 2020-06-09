import React from "react";
import "./Main.scss";
import Header from "../Common/Header";
import ConsultRequireModal from "./ConsultRequireModal";
import MainRecommend from "./MainRecommend";

const Main = () => {

  return (
    <>
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
