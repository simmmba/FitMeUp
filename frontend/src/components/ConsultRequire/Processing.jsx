import React from "react";
import { inject, observer } from "mobx-react";
import { ProgressBar } from "react-bootstrap";
import "./Processing.scss";

const Processing = ({ percent, consult }) => {
  const category = () => {
    if (consult.category === "coordi") return "스타일리스트의 PICK";
    else return "내 옷장에서 PICK";
  };
  return (
    <div className="processing">
      <div className="box">
        <div className="select">{category()}</div>
        <ProgressBar now={percent} />
      </div>
    </div>
  );
};

export default inject(({ consultRequire }) => ({
  percent: consultRequire.percent,
  consult: consultRequire.consult,
}))(observer(Processing));
