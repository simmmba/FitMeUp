import React from "react";
import { inject, observer } from "mobx-react";
import { Form, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import "./GenderAge.scss";

const GenderAge = ({ setConsult, consult, next }) => {
  const setGenderAge = (event) => {
    let value = event.target.value;
    if (value === "여자" || value === "남자") setConsult("gender", event.target.value);
    else setConsult("age", event.target.value);
  };

  const selectCheck = () => {
    if (consult.gender === null) alert("성별을 선택해주세요");
    else if (consult.age === "") {
      alert("나이를 입력해주세요");
      document.getElementById("age").value = "";
      document.getElementById("age").focus();
    } else if (Number(consult.age) < 1) {
      alert("정확한 나이를 입력해주세요");
      document.getElementById("age").value = "";
      document.getElementById("age").focus();
    } else next();
  };

  const moveBtn = () => {
    return (
      <div className="btnBox">
        <button className="nextBtn" onClick={selectCheck}>
          다음
        </button>
      </div>
    );
  };

  return (
    <div>
      {console.log(consult.category)}
      <label>성별</label>
      <br />
      <ToggleButtonGroup className="genderBox" type="radio" name="options" defaultValue={consult.gender}>
        <ToggleButton className="gender" id="gender" value="여자" onChange={setGenderAge}>
          여자
        </ToggleButton>
        <ToggleButton className="gender" id="gender" value="남자" onChange={setGenderAge}>
          남자
        </ToggleButton>
      </ToggleButtonGroup>
      <br />
      <br />
      <Form>
        <Form.Group>
          <Form.Label>나이</Form.Label>
          <Form.Control id="age" type="number" value={consult.age} onChange={setGenderAge} min="1" placeholder="숫자만 입력해 주세요" /> {/* 나중에 db에서 회원 나이 넣어주기 */}
        </Form.Group>
      </Form>
      {moveBtn()}
    </div>
  );
};

export default inject(({ consultRequire }) => ({
  setConsult: consultRequire.setConsult,
  consult: consultRequire.consult,
  next: consultRequire.next,
}))(observer(GenderAge));
