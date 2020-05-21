import React from "react";
import { inject, observer } from "mobx-react";
import "./Gender.scss";

const Gender = ({ setConsult }) => {
  const handleRadio = (event) => {
    // console.log(event.target.value);
    setConsult("gender", event.target.value);
  };

  return (
    <div>
      <label>
        <input type="radio" name="gender" value="여자" onChange={handleRadio} /> 여자
      </label>
      <br />
      <label>
        <input type="radio" name="gender" value="남자" onChange={handleRadio} /> 남자
      </label>
    </div>
  );
};

export default inject(({ consultRequire }) => ({
  setConsult: consultRequire.setConsult,
}))(observer(Gender));
