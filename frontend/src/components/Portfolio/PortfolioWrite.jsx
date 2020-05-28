import React from "react";
import "./PortfolioWrite.scss";

import Header from "../Common/Header";

class PortfolioWrite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      code: "",
    };
  }

  render() {
    const style = {
      height: "300px",
    };
    return (
      <>
        <Header></Header>
        <div className="PortfolioWrite">
          <div className="processing"/>
          <div className="PortfolioForm">
            <div>
              {/* 포트폴리오 제목 */}
              <div className="topic">포트폴리오 제목</div>
              <input
                type="text"
                name="title"
                onChange={this.onChange}
                className="input_title"
                placeholder="제목을 입력해주세요"
                value={this.state.nickname}
              ></input>
            </div>
            <div className="tag">
              <div className="topic">포트폴리오 태그</div>
              <input
                type="text"
                name="tag"
                onChange={this.onChange}
                className="input_tag"
                placeholder="태그를 입력해주세요"
                value={this.state.nickname}
              ></input>
              <div className="plus_btn" onClick={this.signupCheck}>
                추가
              </div>
            </div>
            <div className="content">
              {/* 포트폴리오 설명 작성 */}
              <div className="topic">포트폴리오 설명</div>
              <textarea
                name="content"
                className="content_box"
                style={style}
                value={this.state.content}
                placeholder="최소 10자 이상 작성해 주세요"
                onChange={this.chageValues}
              ></textarea>
            </div>

            <div className="main_img">
              {/* 메인이미지 넣는 부분 */}
              <div className="filebox">
                <label>
                  메인 사진 업로드
                  <input
                    key={this.state.filekey1}
                    type="file"
                    name="images"
                    accept="image/gif, image/jpeg, image/png"
                    onChange={this.InputChange}
                  />
                </label>
              </div>
              <img
                alt="메인이미지"
                src="https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fforceteller%2F9058a545fea44295bba05b213a57ad0d.JPG"
              ></img>
            </div>
            <div className="port_imgs">
              {/* 포트폴리오 이미지 리스트 넣는 부분 */}
              <div className="filebox">
                <label>
                  포트폴리오 사진 업로드
                  <input
                    key={this.state.filekey1}
                    type="file"
                    name="images"
                    multiple
                    accept="image/gif, image/jpeg, image/png"
                    onChange={this.InputChange}
                  />
                </label>
              </div>
              <img
                alt="서브이미지"
                src="https://tomorrance2.blob.core.windows.net/stylist/chorocasualiamge2.jpg"
              ></img>
              <img
                alt="서브이미지"
                src="http://newsplex.kr/camp/ha/img/th_01.png"
              ></img>
              <img
                alt="서브이미지"
                src="https://tomorrance2.blob.core.windows.net/stylist/chorocasualiamge2.jpg"
              ></img>
              <img
                alt="서브이미지"
                src="http://newsplex.kr/camp/ha/img/th_01.png"
              ></img>
              <img
                alt="서브이미지"
                src="https://tomorrance2.blob.core.windows.net/stylist/chorocasualiamge2.jpg"
              ></img>
              <img
                alt="서브이미지"
                src="http://newsplex.kr/camp/ha/img/th_01.png"
              ></img>
              <img
                alt="서브이미지"
                src="https://tomorrance2.blob.core.windows.net/stylist/chorocasualiamge2.jpg"
              ></img>
              <img
                alt="서브이미지"
                src="http://newsplex.kr/camp/ha/img/th_01.png"
              ></img>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default PortfolioWrite;
