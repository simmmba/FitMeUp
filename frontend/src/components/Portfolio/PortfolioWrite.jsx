import React from "react";
import "./PortfolioWrite.scss";

import Header from "../Common/Header";

class PortfolioWrite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stylist_id: this.user.id,
      title: "",
      tag: "",
      tags: [],
      contents: "",
      filekey: 0,
      main_img: [],
      port_img: [],
      main_base64: "",
      port_base64: [],
    };
  }

  user = JSON.parse(window.sessionStorage.getItem("user"));

  // 타이틀이랑 내용 변경
  changeValues = (res) => {
    this.setState({
      [res.target.name]: res.target.value,
    });
  };

  // 태그 추가하기
  addTag = () => {
    if (this.state.tag.length > 0) {
      this.setState({
        tags: [...this.state.tags, this.state.tag],
        tag: "",
      });
    } else {
      alert("한 글자 이상 입력해주세요");
    }
  };

  // 태그 삭제하기
  deleteTag = (res) => {
    let forward = this.state.tags.slice(0, res.target.id);
    let back = this.state.tags.slice(
      Number(res.target.id) + 1,
      this.state.tags.length
    );

    this.setState({
      tags: forward.concat(back),
    });
  };

  // tag enter 누르는 거 인식
  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      this.addTag();
    }
  };

  // 메인이미지 등록
  changeMainImg = (res) => {
    console.log(res.target.files)
    this.setState({
      main_img: res.target.file,
    });

    this.changeMainPreview(res.target.files[0]);
  };

  // 메인 이미지 프리뷰
  changeMainPreview = (res) => {
    // 프리뷰
    let reader = new FileReader();
    reader.onloadend = (res) => {
      // 2. 읽기가 완료되면 아래코드가 실행
      const base64 = reader.result; //reader.result는 이미지를 인코딩(base64 ->이미지를 text인코딩)한 결괏값이 나온다.
      if (base64) {
        this.setState({
          main_base64: base64.toString(), // 파일 base64 상태 업데이트
        });
      }
    };
    if (res) {
      reader.readAsDataURL(res); // 1. 파일을 읽어 버퍼에 저장합니다. 저장후 onloadend 트리거
    }
  };

  // 포트폴리오 이미지 등록

  render() {
    const style = {
      height: "300px",
    };
    return (
      <>
        <Header></Header>
        <div className="PortfolioWrite">
          <div className="processing" />
          <div className="PortfolioForm">
            <div>
              {/* 포트폴리오 제목 */}
              <div className="topic">포트폴리오 제목</div>
              <input
                type="text"
                name="title"
                onChange={this.changeValues}
                className="input_title"
                placeholder="제목을 입력해주세요"
                value={this.state.title}
              ></input>
            </div>
            <div className="tag">
              <div className="topic">포트폴리오 태그</div>
              <input
                type="text"
                name="tag"
                onChange={this.changeValues}
                className="input_tag"
                placeholder="태그를 입력해주세요"
                value={this.state.tag}
                onKeyPress={this.handleKeyPress}
              ></input>
              <div className="plus_btn" onClick={this.addTag}>
                추가
              </div>
              <div className="tags">
                {this.state.tags.map((tag, index) => (
                  <div className="tag_item" key={index}>
                    <span>{tag}</span>&nbsp;&nbsp;
                    <span
                      id={index}
                      className="deletetag"
                      onClick={this.deleteTag}
                    >
                      X
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="content">
              {/* 포트폴리오 설명 작성 */}
              <div className="topic">포트폴리오 설명</div>
              <textarea
                name="contents"
                className="content_box"
                style={style}
                value={this.state.contents}
                placeholder="자세하게 입력해주세요"
                onChange={this.changeValues}
              ></textarea>
            </div>

            <div className="main_img">
              {/* 메인이미지 넣는 부분 */}
              <div className="filebox">
                <label>
                  메인 사진 업로드
                  <input
                    type="file"
                    name="main_img"
                    accept="image/gif, image/jpeg, image/png"
                    onChange={this.changeMainImg}
                  />
                </label>
              </div>
              {this.state.main_base64 !== "" && (
                <img
                  alt="메인이미지"
                  src={this.state.main_base64}
                ></img>
              )}
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
