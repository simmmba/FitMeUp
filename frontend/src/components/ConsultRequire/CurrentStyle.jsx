import React, { useState } from "react";
import { observer, inject } from "mobx-react";
import "antd/dist/antd.css";
import "./CurrentStyle.scss";

const CurrentStyle = ({ setConsult, consult, previous, next }) => {
  const [filekey, setFilekey] = useState(0);
  const [currImg, setCurrImg] = useState(consult.current_img);
  const [currBase64, setCurrBase64] = useState(consult.current_base64);

  // 이미지 등록
  const changePortImg = (res) => {
    setFilekey(filekey + 1);

    let number = res.target.files?.length;
    let now = currImg.length;

    // 파일 업로드 하기
    if (number !== undefined && number !== 0) {
      var image = currImg;
      for (var i = 0; i < number; i++) {
        let file = res.target.files[i];
        image = image.concat(file);
      }

      setCurrImg(image);

      //이미지 변경 함수 호출
      for (var j = now; j < now + number; j++) changePortPreview(image[j]);
    }
  };

  // 이미지 프리뷰
  const changePortPreview = (res) => {
    // 프리뷰
    let reader = new FileReader();
    reader.onloadend = (res) => {
      // 2. 읽기가 완료되면 아래코드가 실행
      const base64 = reader.result; //reader.result는 이미지를 인코딩(base64 ->이미지를 text인코딩)한 결괏값이 나온다.
      if (base64) {
        setCurrBase64([...currBase64, base64.toString()]); // 파일 base64 상태 업데이트
      }
    };
    if (res) {
      reader.readAsDataURL(res); // 1. 파일을 읽어 버퍼에 저장합니다. 저장후 onloadend 트리거
    }
  };

  // 이미지 삭제하기
  const deleteImg = (res) => {
    let forward = currImg.slice(0, res.target.id);
    let back = currImg.slice(Number(res.target.id) + 1, currBase64.length);

    let forward64 = currBase64.slice(0, res.target.id);
    let back64 = currBase64.slice(Number(res.target.id) + 1, currBase64.length);

    setCurrImg(forward.concat(back));
    setCurrBase64(forward64.concat(back64));
  };

  const setPass = () => {
    setConsult("current_img", []);
    setConsult("current_base64", []);
    next();
  };

  const setNext = () => {
    setConsult("current_img", currImg);
    setConsult("current_base64", currBase64);
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
        <button className="nextBtn" onClick={setNext}>
          다음
        </button>
      </div>
    );
  };

  return (
    <div>
      <div className="guide">최근 코디 사진이나 주로 입는 스타일의 사진을 업로드해 주세요.</div>
      <div className="PhotoUpload">
        {/* 포트폴리오 이미지 리스트 넣는 부분 */}
        {currBase64.map((base64, index) => (
          <div className="port_img" key={index}>
            <img alt="서브이미지" src={base64} />
            {/* 이미지 등록 취소 버튼 */}
            <img alt="삭제" src="https://image.flaticon.com/icons/svg/458/458595.svg" className="X" id={index} onClick={deleteImg}></img>
          </div>
        ))}
        <label className="filebox">
          사진 업로드
          <span>+</span>
          <input key={filekey} type="file" name="images" multiple accept="image/gif, image/jpeg, image/png" onChange={changePortImg} />
        </label>
        {/* <div className="complete_btn" onClick={this.formSubmit}>
              작성 완료
            </div> */}
      </div>
      {moveBtn()}
    </div>
  );
};

export default inject(({ consultRequire }) => ({
  setConsult: consultRequire.setConsult,
  consult: consultRequire.consult,
  percent: consultRequire.percent,
  previous: consultRequire.previous,
  next: consultRequire.next,
}))(observer(CurrentStyle));
