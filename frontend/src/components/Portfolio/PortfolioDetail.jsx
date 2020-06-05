import React from "react";
import "./PortfolioDetail.scss";
import axios from "axios";

import Header from "../Common/Header";
import ImageList from "./ImageList";
import ConsultRequireModal from "./ConsultRequireModal";

class PortfolioDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolio: {},
    };
  }

  // user id 값 확인
  user = JSON.parse(window.sessionStorage.getItem("user"));
  // url 확인, axois 호출
  url = window.location.href.split("/");

  componentDidMount() {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL}/portfolio?stylist_id=${this.url[this.url.length - 1]}`,
    })
      // 로그인 안되있는 거면
      .then((res) => {
        console.log(res.data.portfolio);
        this.setState({
          portfolio: res.data.portfolio,
        });
      })
      .catch((error) => {
        alert("상담 요청 내역을 가져오는데 실패했습니다.");
      });
  }

  render() {
    return (
      <>
        <Header></Header>
        <div className="PortfolioDetail">
          <div className="container-fluid">
            <div className="row">
              <div className="store_image col-8">
                {/* 포트폴리오 대표 이미지 넣어주는 부분 */}
                <ImageList img_list={this.state.portfolio.main_img} />
              </div>
              <div className="col-4">
                {/* 신청버튼 */}
                <div className="box">
                  <div className="avg_title">서비스 비용</div>
                  <br />
                  <div className="budget">
                    코 디 추천 - <b>{this.state.portfolio.User && this.state.portfolio.coordi_price} Point</b>
                  </div>
                  <div className="budget">
                    내 옷 추천 - <b>{this.state.portfolio.User && this.state.portfolio.my_price} Point</b>
                  </div>
                </div>
                <div className="box">
                  <div className="score">4.5점</div>
                  <div className="score">상담 횟수 : 129번</div>
                </div>

                {this.user && this.user.type === "general" && this.state.portfolio.User && (
                  <ConsultRequireModal
                    stylist_id={this.url[this.url.length - 1]}
                    stylist_nickname={this.state.portfolio.User.nickname}
                    coordi_price={this.state.portfolio.coordi_price}
                    my_price={this.state.portfolio.my_price}
                  />
                )}

                {this.user?.type !== "general" && this.state.portfolio?.stylist_id === this.user.id && <div className="apply">포트폴리오 수정하기</div>}
              </div>
            </div>
            <div className="row">
              {/* 포트폴리오 정보 들어가는 부분 */}
              <div className="col-8">
                <div className="title">[{this.state.portfolio.title}] 한혜연 스타일리스트</div>
                <div className="tags">
                  {this.state.portfolio.tag?.map((tag, index) => (
                    <div key={index} className="tag">
                      #{tag.tag}
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-8">
                <div className="content">{this.state.portfolio.contents}</div>
              </div>
              <div className="col-8">
                {/* 이미지 들어가는 부분 */}
                <div className="img_list">
                  {this.state.portfolio.PortfolioImages?.map((port_img) => (
                    <img
                      alt="myimg"
                      src={port_img.image_path}
                      onClick={() => {
                        window.open(port_img.image_path);
                      }}
                    ></img>
                  ))}
                </div>
              </div>
            </div>
            <div>
              {/* 리뷰 들어가는 부분 */}
              <div className="title">리뷰 목록</div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default PortfolioDetail;
