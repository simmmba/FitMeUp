// import "date-fns";
import React, { useEffect } from "react";
// import { NavLink, Route, Switch } from "react-router-dom";
import { inject, observer } from "mobx-react";
import Processing from "./Processing";
import GenderAge from "./GenderAge";
import Size from "./Size";
import WantStyle from "./WantStyle";
import CurrentStyle from "./CurrentStyle";
import Budget from "./Budget";
import Time from "./Time";
import Contents from "./Contents";
import Result from "./Result";
import Explain from "./Explain";
import "./ConsultRequire.scss";

const ConsultRequire = ({ questions, num }) => {
  const question = () => {
    return <div className="question">{questions[num]}</div>;
  };

  // const moveBtn = () => {
  //   return (
  //     <div className="btnBox">
  //       {num > 0 ? (
  //         <button className="preBtn" onClick={previous}>
  //           이전
  //         </button>
  //       ) : (
  //         <div className="empty"></div>
  //       )}
  //       {num < 6 ? (
  //         <button className="nextBtn" onClick={next}>
  //           다음
  //         </button>
  //       ) : (
  //         <button className="nextBtn" onClick={next}>
  //           신청 완료
  //         </button>
  //       )}
  //     </div>
  //   );
  // };

  const answer = () => {
    switch (num) {
      case 0:
        return <GenderAge />;
      case 1:
        return <Size />;
      case 2:
        return <WantStyle />;
      case 3:
        return <CurrentStyle />;
      case 4:
        return <Budget />;
      case 5:
        return <Time />;
      case 6:
        return <Contents />;
      case 7:
        return <Result />;
      default:
        return <div>여긴 어디 나는 누구</div>;
    }
  };

  return (
    <div className="consultRequire">
      <Processing />
      <div className="content">
        <div className="col-9 main">
          {question()}
          {answer()}
        </div>
        <div className="col-3">
          <Explain />
        </div>
      </div>
    </div>
  );
};

export default inject(({ consultRequire }) => ({
  questions: consultRequire.questions,
  percent: consultRequire.percent,
  num: consultRequire.num,
}))(observer(ConsultRequire));
