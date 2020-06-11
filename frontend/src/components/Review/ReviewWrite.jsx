import React from "react";
import "./Review.scss";
import axios from "axios";

import Header from "../Common/Header";
import { Rate } from "antd";
import ScrollToTop from "../Common/ScrollToTop";

class ReviewWrite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 3,
      contents: "",
      filekey: 0,
      images: [],
      base64: [],
    };
  }

  user = JSON.parse(window.sessionStorage.getItem("user"));

  // 타이틀이랑 내용 변경
  changeValues = (res) => {
    this.setState({
      [res.target.name]: res.target.value,
    });
  };

  // 점수 변경
  changeScore = (res) => {
    this.setState({
      score: res,
    });
  };

  // 포트폴리오 이미지 등록
  changePortImg = (res) => {
    this.setState({
      filekey: this.state.filekey + 1,
    });

    let number = res.target.files?.length;
    let now = this.state.images.length;

    // 파일 업로드 하기
    if (number !== undefined && number !== 0) {
      if (number + now > 5) {
        alert("이미지는 최대 다섯장까지 가능합니다.");
        return;
      }

      var image = this.state.images;
      for (var i = 0; i < number; i++) {
        let file = res.target.files[i];
        image = image.concat(file);
      }

      this.setState({
        images: image,
      });

      //이미지 변경 함수 호출
      for (var j = now; j < now + number; j++) this.changePortPreview(image[j]);
    }
  };

  // 포트폴리오 이미지 프리뷰
  changePortPreview = (res) => {
    // 프리뷰
    let reader = new FileReader();
    reader.onloadend = (res) => {
      // 2. 읽기가 완료되면 아래코드가 실행
      const base64 = reader.result; //reader.result는 이미지를 인코딩(base64 ->이미지를 text인코딩)한 결괏값이 나온다.
      if (base64) {
        this.setState({
          base64: [...this.state.base64, base64.toString()], // 파일 base64 상태 업데이트
        });
      }
    };
    if (res) {
      reader.readAsDataURL(res); // 1. 파일을 읽어 버퍼에 저장합니다. 저장후 onloadend 트리거
    }
  };

  // 이미지 삭제하기
  deleteImg = (res) => {
    let forward = this.state.images.slice(0, res.target.id);
    let back = this.state.images.slice(
      Number(res.target.id) + 1,
      this.state.images.length
    );

    let forward64 = this.state.base64.slice(0, res.target.id);
    let back64 = this.state.base64.slice(
      Number(res.target.id) + 1,
      this.state.base64.length
    );

    this.setState({
      images: forward.concat(back),
      base64: forward64.concat(back64),
    });
  };

  // 리뷰 취소 버튼
  formConfirm = () => {
    if (
      window.confirm(
        "리뷰 작성을 취소하시겠습니까?\n입력한 내용은 모두 사라집니다."
      )
    ) {
      this.props.history.goBack();
    }
  };

  // 작성 완료 버튼
  formSubmit = () => {
    const { history } = this.props;

    // 설명 확인
    if (this.state.contents.length < 10) {
      alert("설명은 10자 이상 입력해주세요");
      return;
    }

    // 모든 조건 충족 시 axios 호출하기
    axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/review/write`,
      data: {
        user_id: this.user.id,
        consult_id: this.props.location.state.consult_id,
        contents: this.state.contents,
        score: this.state.score,
      },
    })
      .then((res) => {
        if (this.state.length > 0) {
          let img = new FormData();
          // 메인 이미지 추가
          for (let i = 0; i < this.state.images.length; i++) {
            img.append("img", this.state.images[i]);
          }
          axios({
            method: "post",
            url: `${process.env.REACT_APP_URL}/upload/review?user_id=${res.data.portfolio.id}`,
            data: img,
          })
            .then((res) => {
              alert("리뷰 작성에 성공했습니다.");
              // 포트폴리오 아이디 받아오기
              history.goBack();
            })
            .catch((error) => {
              alert("리뷰를 작성하는데 실패했습니다.");
              history.goBack();
            });
        } else {
          // 포트폴리오 아이디 받아오기
          // history.push("/portfolio/detail/" + this.user.id);
          alert("리뷰 작성에 성공했습니다.");
          history.goBack();
        }
      })
      .catch((error) => {
        alert("리뷰를 작성하는데 실패했습니다.");
      });
  };

  render() {
    const style = {
      height: "300px",
    };
    return (
      <>
        <ScrollToTop></ScrollToTop>
        <Header></Header>
        <div className="Review">
          <div className="processing" />
          <div className="PortfolioForm">
            <div className="totla_score">
              {/* 점수 넣기 */}
              <div className="topic">전체 평점</div>
              <div className="total_score_select">
                <Rate
                  onChange={this.changeScore}
                  defaultValue={this.state.score}
                />
                &nbsp;&nbsp;({this.state.score})
              </div>
            </div>

            <div className="content">
              {/* 포트폴리오 설명 작성 */}
              <div className="topic">리뷰 내용 작성</div>
              <textarea
                name="contents"
                className="content_box"
                style={style}
                value={this.state.contents}
                placeholder="10자 이상 입력해주세요"
                onChange={this.changeValues}
              ></textarea>
            </div>

            <div className="port_imgs">
              {/* 리뷰 이미지 리스트 넣는 부분 */}
              {this.state.base64.map((item, index) => (
                <div className="port_img" key={index}>
                  <img alt="서브이미지" src={item}></img>
                  {/* 이미지 등록 취소 버튼 */}
                  <img
                    alt="삭제"
                    src="https://image.flaticon.com/icons/svg/458/458595.svg"
                    className="X"
                    id={index}
                    onClick={this.deleteImg}
                  ></img>
                </div>
              ))}
              <div className="filebox">
                <label>
                  <span>사진업로드</span>
                  <br />+
                  <input
                    key={this.state.filekey}
                    type="file"
                    name="images"
                    multiple
                    accept="image/gif, image/jpeg, image/png"
                    onChange={this.changePortImg}
                  />
                </label>
              </div>
            </div>

            <div className="form_btn">
              <div className="cancel_btn" onClick={this.formConfirm}>
                작성 취소
              </div>
              <div className="complete_btn" onClick={this.formSubmit}>
                작성 완료
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ReviewWrite;
