import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import "./Time.scss";

// const useStyles = makeStyles({
//   root: {
//     width: 300,
//   },
// });

// function valuetext(value) {
//   // console.log(value);
//   return `${value}시`;
// }

const Time = ({ setConsult, consult, next, previous }) => {
  let timeArray = [consult.start_time, consult.end_time];
  const [value, setValue] = useState(timeArray);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // console.log(value);
    // console.log("1 : " + value[0]);
    // console.log("2 : " + value[1]);
  };

  const selectCheck = () => {
    setConsult("start_time", value[0]);
    setConsult("end_time", value[1]);
    next();
  };

  const setPass = () => {
    setConsult("start_time", 0);
    setConsult("end_time", 24);
    next();
  };

  const moveBtn = () => {
    return (
      <div className="btnBox">
        <button className="preBtn" onClick={previous}>
          이전
        </button>
        <button className="passBtn" onClick={setPass}>
          건너뛰기
        </button>
        <button className="nextBtn" onClick={selectCheck}>
          다음
        </button>
      </div>
    );
  };

  return (
    <div className="">
      <div className="time">
        {/* <Typography id="range-slider" gutterBottom>
          Temperature range
        </Typography> */}
        <Slider value={value} onChange={handleChange} min={0} max={24} valueLabelDisplay="auto" aria-labelledby="range-slider" />
        <span>
          {value[0] === 0 && value[1] === 24 ? (
            "24시간"
          ) : (
            <span>
              {value[0] < 12 ? "오전" : "오후"} {value[0] > 12 ? value[0] - 12 : value[0]}시 ~ {value[1] < 12 || value[1] === 24 ? "오전" : "오후"} {value[1] > 12 ? value[1] - 12 : value[1]}시
            </span>
          )}
          &nbsp;&nbsp; 상담 가능
        </span>
      </div>
      {moveBtn()}
    </div>
  );
};

export default inject(({ consultRequire }) => ({
  setConsult: consultRequire.setConsult,
  consult: consultRequire.consult,
  next: consultRequire.next,
  previous: consultRequire.previous,
}))(observer(Time));
