// import "date-fns";
import React from "react";
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
import Explain from "./Explain";
import Header from "../Common/Header";
import "./ConsultRequire.scss";

const ConsultRequire = ({ questions, num }) => {
  const question = () => {
    return <div className="question">{questions[num]}</div>;
  };

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
      default:
        return <div>여긴 어디 나는 누구</div>;
    }
  };

  return (
    <div className="consultRequire">
      <Header></Header>
      <Processing />
      <div className="content">
        <div className="col-7 main">
          {question()}
          {answer()}
        </div>
        <div className="col-5">
          <Explain />
        </div>
      </div>
    </div>
  );
};

export default inject(({ consultRequire }) => ({
  questions: consultRequire.questions,
  num: consultRequire.num,
}))(observer(ConsultRequire));
