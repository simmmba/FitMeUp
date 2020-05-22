import React from "react";
import { inject, observer } from "mobx-react";
// import "./WantStyle.scss";

const WantStyle = ({ setConsult, consult, next, previous }) => {
  const selectCheck = () => {};

  const moveBtn = () => {
    return (
      <div className="btnBox">
        <button className="preBtn" onClick={previous}>
          이전
        </button>
        <button className="nextBtn" onClick={next}>
          다음
        </button>
      </div>
    );
  };

  return <div className="">{moveBtn()}</div>;
};

export default inject(({ consultRequire }) => ({
  setConsult: consultRequire.setConsult,
  consult: consultRequire.consult,
  next: consultRequire.next,
  previous: consultRequire.previous,
}))(observer(WantStyle));
