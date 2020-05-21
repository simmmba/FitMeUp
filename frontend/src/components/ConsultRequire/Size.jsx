import React from "react";
import { inject, observer } from "mobx-react";
import { Form } from "react-bootstrap";
// import "./Size.scss";

const Size = ({ setConsult, size, consult }) => {
  // let selectGender = consult.gender === "여자" ? "ftop" : "mtop";
  // console.log(selectGender);
  console.log(consult.gender);
  // const optionList = size.map((option) => <option key={option}>{option}</option>);

  return (
    <div>
      <Form>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>상의</Form.Label>
          <Form.Control as="select" custom>
            {/* {optionList} */}
          </Form.Control>
        </Form.Group>
      </Form>
      <br />
    </div>
  );
};

export default inject(({ consultRequire }) => ({
  setConsult: consultRequire.setConsult,
  gender: consultRequire.consult,
  size: consultRequire.size,
}))(observer(Size));
