import React from "react";
import { inject, observer } from "mobx-react";
import { Form } from "react-bootstrap";
import ResultModal from "./ResultModal";
// import "./Contents.scss";

const Contents = ({ setConsult, consult, previous, next }) => {
  console.log(consult.contents);

  const setContents = (event) => {
    setConsult("contents", event.target.value);
  };

  const moveBtn = () => {
    return (
      <div className="btnBox">
        <button className="preBtn" onClick={previous}>
          이전
        </button>
        <ResultModal />
      </div>
    );
  };

  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Control
            as="textarea"
            placeholder="직업, 코디가 필요한 상황, 상담 목적 등&#10;스타일리스트가 참고할 사항이나 요청 사항을 적어주세요."
            value={consult.contents}
            rows="10"
            onChange={setContents}
          />
        </Form.Group>
      </Form>
      {moveBtn()}
    </div>
  );
};

export default inject(({ consultRequire }) => ({
  setConsult: consultRequire.setConsult,
  consult: consultRequire.consult,
  previous: consultRequire.previous,
  next: consultRequire.next,
}))(observer(Contents));
