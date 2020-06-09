import React from "react";
import "./Explain.scss";

const Explain = () => {
  return (
    <div className="explain">
      <div className="block">
        <div className="summary">핏미업은 어떤 곳인가요?</div>
        <div className="detail">
          <b>>&nbsp;</b> 맞춤형 코디 서비스가 필요한 고객과 서비스를 제공하는 핏미업 스타일리스트를 쉽고 빠르게 연결해드리는 코디 전문가 매칭 서비스입니다.
        </div>
        <div className="detail">
          <b>>&nbsp;</b> 1분 내외의 상담 요청서를 작성하면, 여러 스타일리스트가 맞춤형 상담 연락을 드려요.
        </div>
        <div className="detail">
          <b>>&nbsp;</b> 맘에 쏙 드는 스타일리스트의 맞춤형 코디 상담을 받아보세요.
        </div>
      </div>
      <div className="block">
        <div className="summary">코디 전문 스타일리스트만 모았다!</div>
        <div className="detail">
          <b>>&nbsp;&nbsp;</b>상황에 맞는 코디를 원하시나요?
        </div>
        <div className="detail">
          <b>>&nbsp;</b> 핏미업에는 다양한 스타일과 경력의 코디 전문가들이 활동하고 있어요.
        </div>
        <div className="detail">
          <b>>&nbsp;</b> 지금 바로 상담 요청서를 작성하시고, 쉽고 빠르게 내가 원하는 스타일리스트를 만나보세요!
        </div>
      </div>
    </div>
  );
};

export default Explain;
