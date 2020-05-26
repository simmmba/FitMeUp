import React from "react";
import { inject, observer } from "mobx-react";
import { Form } from "react-bootstrap";
// import "./Budget.scss";

const Budget = ({ setConsult, consult, next, previous }) => {
  const setBudget = (event) => {
    setConsult("budget", event.target.value);
  };

  const setPass = () => {
    setConsult("budget", "");
    next();
  };

  const selectCheck = () => {
    if (consult.budget !== "" && Number(consult.budget) < 0) {
      alert("0 이상의 금액을 입력해주세요");
      document.getElementById("budget").value = "";
      document.getElementById("budget").focus();
    } else next();
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
      <Form>
        <Form.Group>
          <Form.Label>예산 (만원)</Form.Label>
          <Form.Control id="budget" type="number" value={consult.budget} onChange={setBudget} placeholder="숫자만 입력" />
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
  previous: consultRequire.previous,
}))(observer(Budget));
