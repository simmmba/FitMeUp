import React from "react";
import "./PortfolioDetail.scss";
import axios from "axios";

import Header from "../Common/Header";
import ImageList from "../Portfolio/ImageList";

class PortfolioDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolio: {},
    };
  }

  // user id 값 확인
  user = JSON.parse(window.sessionStorage.getItem("user"));

  componentDidMount() {

    // url 확인, axois 호출
    const url = window.location.href.split("/");

    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL}/portfolio?stylist_id=${
        url[url.length - 1]
      }`,
    })
      // 로그인 안되있는 거면
      .then((res) => {
        console.log(res.data.portfolio);
        this.setState({
          portfolio:res.data.portfolio
        })
        alert("포트폴리오를 가져오는데 성공했습니다.");
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
          {/* {!this.state.store.id ? (
            <></>
          ) : ( */}
          <div className="container-fluid">
            <div className="row">
              <div className="store_image col-8">
                {/* 포트폴리오 대표 이미지 넣어주는 부분 */}
                <ImageList img_list={this.state.img_list}></ImageList>
              </div>
              <div className="col-4">
                {/* 신청버튼 */}
                <div className="box">
                  <div className="avg_title">평균 서비스 비용</div>
                  <br />
                  <div className="budget">코 디 추천 : 3,000원</div>
                  <div className="budget">내 옷 추천 : 2,500원</div>
                </div>
                <div className="box">
                  <div className="score">4.5점 (127)</div>
                  <div className="score">즐겨찾기 : 129명</div>
                </div>
                <div className="apply">상담 신청하기</div>
              </div>
            </div>
            <div className="row">
              {/* 포트폴리오 정보 들어가는 부분 */}
              <div className="col-8">
                <div className="title">
                  [댄디한 남친룩 추천] 한혜연 스타일리스트
                </div>
                <div className="tags">
                  <div className="tag">#스타일</div>
                  <div className="tag">#남친룩</div>
                </div>
              </div>
              <div className="col-8">
                <div className="content">
                  화려한 코디보다는 남자가 봐도 여자가 봐도 보기 좋은 깔끔하고
                  댄디한 코디를 좋아합니다.
                  <br />
                  소화하기 어려운 코디가 아닌 누구나 소화 가능한, 본인에 맞는
                  심플, 깔끔한 코디를 추천해드리도록 하겠습니다.
                  <br />
                  <br />
                  화려한 코디보다는 남자가 봐도 여자가 봐도 보기 좋은 깔끔하고
                  댄디한 코디를 좋아합니다.
                  <br />
                  소화하기 어려운 코디가 아닌 누구나 소화 가능한, 본인에 맞는
                  심플, 깔끔한 코디를 추천해드리도록 하겠습니다.
                </div>
              </div>
              <div className="col-8">
                {/* 이미지 들어가는 부분 */}
                <div className="img_list">
                  <img
                    src="https://tomorrance2.blob.core.windows.net/stylist/chorocasualiamge2.jpg"
                    onClick={() => {
                      window.open(
                        "https://tomorrance2.blob.core.windows.net/stylist/chorocasualiamge2.jpg"
                      );
                    }}
                  ></img>
                  <img src="https://miro.medium.com/max/1932/0*bMB6qUGIRv1_QYt4"></img>
                  <img src="https://tomorrance2.blob.core.windows.net/stylist/chorocasualiamge1.jpg"></img>
                  <img src="https://tomorrance2.blob.core.windows.net/stylist/chorodandiiamge1.jpg"></img>
                </div>
              </div>
            </div>
            <div>
              {/* 리뷰 들어가는 부분 */}
              <div className="title">리뷰 목록</div>
            </div>
          </div>
          <div>{/*  */}</div>
          {/* )} */}
        </div>
      </>
    );
  }
}
export default PortfolioDetail;
