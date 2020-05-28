import React from "react";
import "./ConsultDetail.scss";

import Header from "../Common/Header";

const ConsultDetail = () => {
  let list = [
    ["성별", ""],
    ["나이", "세"],
    ["키", "cm"],
    ["상의", ""],
    ["하의", ""],
    ["가격", "원"],
    ["상황", ""],
  ];

  return (
    <>
      <Header></Header>
      <div className="ConsultDetail">
        <div className="processing">
          <div className="position">
            <br />
            <div className="type">내 옷 코디하기</div>
            <div className="user">
              <img alt="style" className="profile" src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/cbdef037365169.573db7853cebb.jpg" />
              <span className="nickname">다니다니는너무착</span>
            </div>
            <div className="apply">상담 신청하기</div>
          </div>
        </div>
        <div className="total_consult">
          <div className="title">상담 상세 내용</div>
          {/* 문자로 된 정보 */}
          <div className="text_info">
            {list.map((condition) => (
              <div key={condition[0]} className="row">
                <div className="col-1">{condition[0]}</div>
                <div className="col-11">{condition[1]}</div>
              </div>
            ))}
          </div>
          {/* 이미지로 된 정보 */}
          <div className="img_info">
            <div className="sub_title">원하는 스타일</div>
            <div>
              <img alt="style" className="styleimg" src="https://platum.kr/wp-content/uploads/2014/05/unnamed3.png" />
              <img alt="style" className="styleimg" src="https://platum.kr/wp-content/uploads/2014/05/unnamed3.png" />
              <img alt="style" className="styleimg" src="https://platum.kr/wp-content/uploads/2014/05/unnamed3.png" />
            </div>
            <div className="sub_title">평소 입는 스타일</div>
            <div>
              <img alt="style" className="styleimg" src="https://t1.daumcdn.net/liveboard/fashionn/4d8277a2f3c945c5b678d076f559ccad.JPG" />
              <img alt="style" className="styleimg" src="https://t1.daumcdn.net/liveboard/fashionn/4d8277a2f3c945c5b678d076f559ccad.JPG" />
              <img alt="style" className="styleimg" src="https://t1.daumcdn.net/liveboard/fashionn/4d8277a2f3c945c5b678d076f559ccad.JPG" />
              <img alt="style" className="styleimg" src="https://t1.daumcdn.net/liveboard/fashionn/4d8277a2f3c945c5b678d076f559ccad.JPG" />
              <img alt="style" className="styleimg" src="https://t1.daumcdn.net/liveboard/fashionn/4d8277a2f3c945c5b678d076f559ccad.JPG" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsultDetail;
