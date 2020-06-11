import React from "react";
import "./PortfolioDetail.scss";
import axios from "axios";

import Header from "../Common/Header";
import ImageList from "./ImageList";
import ConsultRequireModal from "./ConsultRequireModal";
import star from "../../img/star.png";
import { NavLink } from "react-router-dom";
import ReviewList from "../Review/ReviewList";
import SendMessage from "./SendMessage";
import ScrollToTop from "../Common/ScrollToTop";

class PortfolioDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolio: {},
      consult_cnt: 0,
      review_cnt: 0,
      avg_score: 0,
      slice_review: [],
      reviews: [],
      mloading: true,
    };
  }

  // user id 값 확인
  user = JSON.parse(window.sessionStorage.getItem("user"));
  // url 확인, axois 호출
  url = window.location.href.split("/");

  componentDidMount() {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL}/portfolio?stylist_id=${
        this.url[this.url.length - 1]
      }`,
    })
      // 로그인 안되있는 거면
      .then((res) => {
        console.log(res.data);
        this.setState({
          portfolio: res.data.portfolio,
          consult_cnt: res.data.consult_cnt,
          review_cnt: res.data.review_cnt,
          avg_score: res.data?.avg_score | 0,
        });
      })
      .catch((error) => {
        alert("포트폴리오 정보를 가져오는데 실패했습니다.");
      });

    // 리뷰 받아오기
    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL}/review/receive?user_id=${
        this.url[this.url.length - 1]
      }`,
    })
      .then((res) => {
        // console.log(res.data);
        this.setState({
          reviews: res.data.list,
          mloading: false,
        });
        this.moreReview();
      })
      .catch((error) => {
        this.setState({
          mloading: false,
        });
        alert("리뷰 내역을 가져오는데 실패했습니다.");
      });
  }

  // 더보기
  moreReview = () => {
    let max_num = this.state.slice_review.length + 3;
    if (max_num > this.state.reviews.length)
      max_num = this.state.reviews.length;

    this.setState({
      slice_review: this.state.reviews.slice(0, max_num),
    });
  };

  render() {
    return (
      <>
        <ScrollToTop></ScrollToTop>
        <Header></Header>
        <div className="PortfolioDetail">
          <div className="container-fluid">
            <div className="row">
              <div className="store_image col-8">
                {/* 포트폴리오 대표 이미지 넣어주는 부분 */}
                <ImageList img_list={this.state.portfolio?.main_img} />
              </div>
              <div className="col-4">
                {/* 신청버튼 */}
                <div className="box">
                  <div className="avg_title">서비스 비용</div>
                  <br />
                  <div className="budget">
                    스타일리스트의 PICK -&nbsp;
                    <b>
                      {this.state.portfolio?.User &&
                        this.state.portfolio.coordi_price}
                      &nbsp;Point
                    </b>
                  </div>
                  <div className="budget">
                    내 옷장에서 PICK -&nbsp;
                    <b>
                      {this.state.portfolio?.User &&
                        this.state.portfolio.my_price}
                      &nbsp;Point
                    </b>
                  </div>
                  {!this.user ||
                    (this.user.id !== this.state.portfolio?.stylist_id && (
                      <SendMessage
                        nickname={this.state.portfolio.User?.nickname}
                        target={this.state.portfolio.User?.id}
                      />
                    ))}
                </div>
                <div className="box">
                  <div className="score">
                    <img className="star" alt="star" src={star} />
                    {this.state.avg_score}점 ({this.state.review_cnt})
                  </div>
                  <div className="score">
                    상담 횟수 : {this.state.consult_cnt}회
                  </div>
                </div>

                {(this.user === null || this.user?.type === "general") &&
                  this.state.portfolio?.User && (
                    <ConsultRequireModal
                      stylist_id={this.url[this.url.length - 1]}
                      stylist_nickname={this.state.portfolio.User.nickname}
                      coordi_price={this.state.portfolio.coordi_price}
                      my_price={this.state.portfolio.my_price}
                    />
                  )}

                {this.user &&
                  this.user?.type !== "general" &&
                  this.state.portfolio?.stylist_id === this.user.id && (
                    <NavLink
                      to={{
                        pathname: "/portfolio/update",
                        state: {
                          portfolio: this.state.portfolio,
                        },
                      }}
                    >
                      <div className="apply">포트폴리오 수정하기</div>
                    </NavLink>
                  )}
              </div>
            </div>
            <div className="row">
              {/* 포트폴리오 정보 들어가는 부분 */}
              <div className="col-8">
                <div className="title">
                <img className="profile" alt="profile" src={this.state.portfolio.User?.profile_img}></img>
                  [{this.state.portfolio.title}]{" "}
                  {this.state.portfolio.User?.nickname} 스타일리스트
                </div>
                <div className="tags">
                  {this.state.portfolio.Portfolio_tags?.map((tag, index) => (
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
                  {this.state.portfolio.PortfolioImages?.map(
                    (port_img, index) => (
                      <img
                        key={index}
                        alt="myimg"
                        src={port_img.image_path}
                        onClick={() => {
                          window.open(port_img.image_path);
                        }}
                      ></img>
                    )
                  )}
                </div>
              </div>
            </div>
            <div>
              {/* 리뷰 들어가는 부분 */}
              <div className="title">리뷰 목록</div>
              {this.state.slice_review.map((review, index) => (
                <ReviewList key={index} review={review}></ReviewList>
              ))}
              {!this.state.mloading && this.state.reviews.length === 0 && (
                <div className="noReview">작성된 리뷰가 없습니다</div>
              )}
              {this.state.reviews.length > this.state.slice_review.length && (
                <div className="plus_btn">
                  <span onClick={this.moreReview}>
                    &nbsp;&nbsp;더보기&nbsp;&nbsp;
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default PortfolioDetail;
