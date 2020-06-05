import React from "react";
import { inject, observer } from "mobx-react";
import { Form } from "react-bootstrap";
// import "./Size.scss";

const Size = ({ setConsult, size, consult, next, previous }) => {
  let top = consult.gender === "여자" ? size.ftop : size.mtop;
  let bottom = consult.gender === "여자" ? size.fbottom : size.mbottom;

  const topList = top.map((option, idx) => <option key={option}>{option}</option>);
  const bottomList = bottom.map((option) => <option key={option}>{option}</option>);

  const setSize = (event) => {
    let pick = event.target.id;
    let pickSize = event.target.value;
    let pickIndex = event.target.selectedIndex;

    if (pickIndex === 0) setConsult(pick, "");
    else setConsult(pick, pickSize);
  };

  const selectCheck = () => {
    if (consult.height !== "" && (Number(consult.height) < 30 || Number(consult.height > 230))) {
      alert("입력한 키를 확인해주세요");
      document.getElementById("height").focus();
    } else if (consult.weight !== "" && (Number(consult.weight) < 2 || Number(consult.weight > 200))) {
      alert("입력한 몸무게를 확인해주세요");
      document.getElementById("weight").focus();
    } else next();
  };

  const setPass = () => {
    setConsult("top", "");
    setConsult("bottom", "");
    setConsult("height", "");
    setConsult("weight", "");
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
    <div>
      <Form>
        <Form.Group>
          {/* <Form.Group controlId="exampleForm.SelectCustom"> */}
          <Form.Label>상의</Form.Label>
          <Form.Control id="top" as="select" value={consult.top !== "" && consult.top} onChange={setSize}>
            {/* <Form.Control as="select" custom> */}
            {topList}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          {/* <Form.Group controlId="exampleForm.SelectCustom"> */}
          <Form.Label>하의</Form.Label>
          <Form.Control id="bottom" as="select" value={consult.bottom !== "" && consult.bottom} onChange={setSize}>
            {/* <Form.Control as="select" custom> */}
            {bottomList}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>키 (cm)</Form.Label>
          <Form.Control id="height" type="number" value={consult.height} min="30" max="230" onChange={setSize} placeholder="숫자만 입력" /> {/* 나중에 db에서 회원 키 넣어주기 */}
        </Form.Group>
        <Form.Group>
          <Form.Label>몸무게 (kg)</Form.Label>
          <Form.Control id="weight" type="number" value={consult.weight} min="2" max="200" onChange={setSize} placeholder="숫자만 입력" /> {/* 나중에 db에서 회원 몸무게 넣어주기 */}
        </Form.Group>
      </Form>
      {moveBtn()}
    </div>
  );
};

export default inject(({ consultRequire }) => ({
  setConsult: consultRequire.setConsult,
  consult: consultRequire.consult,
  size: consultRequire.size,
  next: consultRequire.next,
  previous: consultRequire.previous,
}))(observer(Size));
