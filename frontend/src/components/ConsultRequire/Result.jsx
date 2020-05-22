import React from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
// import "./Result.scss";

const Result = ({ consult }) => {
  console.log(consult);
  return (
    <div className="">
      어떤 서비스가 필요하세요?
      <br />
      스타일리스트 요청 기다리기
      <br />
      스타일리스트에게 바로 요청하기
      <br />
      <Link className="reqBtn" to={`/`}>
        메인으로
      </Link>
    </div>
  );
};

export default inject(({ consultRequire }) => ({
  consult: consultRequire.consult,
}))(observer(Result));
