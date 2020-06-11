import React from "react";
import "./PortfolioWrite.scss";
import axios from "axios";

import Header from "../Common/Header";
import ScrollToTop from "../Common/ScrollToTop";

class PortfolioUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      tag: "",
      tags: [],
      contents: "",
      filekey: 0,
      main_img: [],
      port_img: [],
      main_base64: "",
      port_base64: [],
      my_price: "",
      coordi_price: "",
      price_check: false,
    };
  }

  user = JSON.parse(window.sessionStorage.getItem("user"));

  componentDidMount() {
    // console.log(this.props.location.state)
    const portfolio = this.props.location.state.portfolio;
    // console.log(portfolio)
    var tags = [];
    for (let i = 0; i < portfolio.Portfolio_tags.length; i++) {
      tags[i] = portfolio.Portfolio_tags[i].tag;
    }

    this.setState({
      title: portfolio.title,
      contents: portfolio.contents,
      my_price: portfolio.my_price,
      coordi_price: portfolio.coordi_price,
      tags: tags,
    });
  }

  // 타이틀이랑 내용 변경
  changeValues = (res) => {
    // 태그 길이 체크
    if (res.target.name === "tag" && res.target.value.length > 10) {
      alert("태그는 최대 10자까지 입력가능합니다");
      return;
    }

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

  checkPrice = () => {
    if (this.state.price_check) {
      this.setState({
        price_check: false,
      });
      return;
    }

    if (!this.state.my_price || !this.state.coordi_price) {
      alert("상담 비용을 입력해주세요");
      return;
    }

    if (
      this.state.my_price < 1000 ||
      this.state.coordi_price < 1000 ||
      this.state.my_price % 100 !== 0 ||
      this.state.coordi_price % 100 !== 0
    ) {
      alert("금액은 1000포인트 이상, 100포인트 단위로 설정 가능합니다.");
      return;
    }

    this.setState({
      price_check: true,
    });
  };

  // 메인이미지 등록
  changeMainImg = (res) => {
    this.setState({
      main_img: [res.target.files[0]],
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
  changePortImg = (res) => {
    this.setState({
      filekey: this.state.filekey + 1,
    });

    let number = res.target.files?.length;
    let now = this.state.port_img.length;

    // 파일 업로드 하기
    if (number !== undefined && number !== 0) {
      var image = this.state.port_img;
      for (var i = 0; i < number; i++) {
        let file = res.target.files[i];
        image = image.concat(file);
      }

      this.setState({
        port_img: image,
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
          port_base64: [...this.state.port_base64, base64.toString()], // 파일 base64 상태 업데이트
        });
      }
    };
    if (res) {
      reader.readAsDataURL(res); // 1. 파일을 읽어 버퍼에 저장합니다. 저장후 onloadend 트리거
    }
  };

  // 이미지 삭제하기
  deleteImg = (res) => {
    let forward = this.state.port_img.slice(0, res.target.id);
    let back = this.state.port_img.slice(
      Number(res.target.id) + 1,
      this.state.port_base64.length
    );

    let forward64 = this.state.port_base64.slice(0, res.target.id);
    let back64 = this.state.port_base64.slice(
      Number(res.target.id) + 1,
      this.state.port_base64.length
    );

    this.setState({
      port_img: forward.concat(back),
      port_base64: forward64.concat(back64),
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
    // 타이틀 입력 확인
    if (this.state.title.length === 0) {
      alert("제목을 입력해주세요");
      return;
    }

    // 태그 확인
    if (this.state.tags.length < 2) {
      alert("태그를 2개 이상 입력해주세요");
      return;
    }

    // 금액 확인
    if (!this.state.price_check) {
      alert("상담 비용을 설정해주세요");
      return;
    }

    // 설명 확인
    if (this.state.contents.length < 50) {
      alert("설명은 50자 이상 입력해주세요");
      return;
    }

    // 메인사진 업로드 확인
    if (this.state.main_img.length === 0) {
      alert("메인 사진을 업로드해주세요");
      return;
    }

    // 포트폴리오 업로드 확인
    if (this.state.port_img.length === 0) {
      alert("포트폴리오 사진을 업로드해주세요");
      return;
    }

    const { history } = this.props;

    // 모든 조건 충족 시 axios 호출하기
    axios({
      method: "put",
      url: `${process.env.REACT_APP_URL}/portfolio`,
      data: {
        portfolio_id: this.props.location.state.portfolio.id,
        title: this.state.title,
        contents: this.state.contents,
        tags: this.state.tags,
        my_price: this.state.my_price,
        coordi_price: this.state.coordi_price,
      },
    })
      // 로그인 안되있는 거면
      .then((res) => {
        let img = new FormData();
        // 메인 이미지 추가
        img.append("img", this.state.main_img[0]);
        // 포트폴리오 이미지 추가
        for (let i = 0; i < this.state.port_img.length; i++) {
          img.append("img", this.state.port_img[i]);
        }
        axios({
          method: "post",
          url: `${process.env.REACT_APP_URL}/upload/portfolio?portfolio_id=${this.props.location.state.portfolio.id}`,
          data: img,
        })
          .then((res) => {
            alert("포트폴리오 수정 성공했습니다.");
            history.push("/portfolio/detail/" + this.user.id);
          })
          .catch((error) => {
            alert("포트폴리오를 수정하는데 실패했습니다.");
          });
      })
      .catch((error) => {
        alert("포트폴리오를 수정하는데 실패했습니다.");
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
                placeholder="태그를 입력해주세요. (2개 이상)"
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
            <div className="tag">
              <div className="topic">상담 비용 설정</div>
              {!this.state.price_check ? (
                <>
                  <input
                    type="number"
                    name="coordi_price"
                    onChange={this.changeValues}
                    className="input_tag"
                    placeholder="코디 추천 비용"
                    min="1000"
                    step="100"
                    value={this.state.coordi_price}
                  ></input>
                  <input
                    type="number"
                    name="my_price"
                    onChange={this.changeValues}
                    className="input_tag"
                    placeholder="내 옷 추천 비용"
                    min="1000"
                    step="100"
                    value={this.state.my_price}
                  ></input>
                </>
              ) : (
                <>
                  <input
                    type="number"
                    className="input_tag checkP"
                    value={this.state.coordi_price}
                    disabled
                  ></input>
                  <input
                    type="number"
                    className="input_tag checkP"
                    value={this.state.my_price}
                    disabled
                  ></input>
                </>
              )}

              <div className="plus_btn" onClick={this.checkPrice}>
                {this.state.price_check ? "취소" : "설정"}
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
                placeholder="자세하게 50자 이상 입력해주세요"
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
                <span>16:9 비율의 사진을 올려주세요 </span>
              </div>
              {this.state.main_base64 !== "" && (
                <img alt="메인이미지" src={this.state.main_base64}></img>
              )}
            </div>
            <div className="port_imgs">
              {/* 포트폴리오 이미지 리스트 넣는 부분 */}
              <div className="filebox">
                <label>
                  포트폴리오 사진 업로드
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
              {this.state.port_base64.map((base64, index) => (
                <div className="port_img" key={index}>
                  <img alt="서브이미지" src={base64}></img>
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
            </div>
            <div className="form_btn">
              <div className="cancel_btn" onClick={this.formConfirm}>
                수정 취소
              </div>
              <div className="complete_btn" onClick={this.formSubmit}>
                수정 완료
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default PortfolioUpdate;
