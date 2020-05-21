import React from "react";
import { inject, observer } from "mobx-react";
// import "./Result.scss";

const Result = ({ consult }) => {
  console.log(consult);
  return <div className="">상담 양식 작성이 완료되었습니다.</div>;
};

export default inject(({ consultRequire }) => ({
  consult: consultRequire.consult,
}))(observer(Result));
