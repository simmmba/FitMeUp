import React from "react";
import { inject, observer } from "mobx-react";
import { ProgressBar } from "react-bootstrap";
import "./Processing.scss";

const Processing = ({ percent, consult }) => {
  const category = () => {
    if (consult.category === "coordi") return "코디 추천";
    else return "내 옷 추천";
  };
  return (
    <div className="processing">
      <div className="box">
        <div className="select">{category()} 받기</div>
        <ProgressBar now={percent} />
      </div>
    </div>
  );
};

export default inject(({ consultRequire }) => ({
  percent: consultRequire.percent,
  consult: consultRequire.consult,
}))(observer(Processing));
