import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "./Carousel.scss";
import test from "../../img/test.jpg";
import star from "../../img/star.png";

const Carousel = () => {
  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style }} onClick={onClick} />;
  }

  function NextArrow(props) {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style }} onClick={onClick} />;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  const list = [
    { num: "1댄디한 남친 룩 추천", name: "abc", score: "5.0", cnt: 5 },
    { num: "2댄디한 남친 룩 추천", name: "test", score: "5.0", cnt: 5 },
    { num: "3댄디한 남친 룩 추천", name: "가나다", score: "5.0", cnt: 5 },
    { num: "4댄디한 남친 룩 추천", name: "가나다", score: "5.0", cnt: 5 },
    { num: "5댄디한 남친 룩 추천", name: "가나다", score: "5.0", cnt: 5 },
    { num: "6댄디한 남친 룩 추천", name: "가나다", score: "5.0", cnt: 5 },
    { num: "7댄디한 남친 룩 추천", name: "가나다", score: "5.0", cnt: 5 },
    { num: "8댄디한 남친 룩 추천", name: "가나다", score: "5.0", cnt: 5 },
  ];

  const CarouselList = list.map((val, idx) => (
    <div className="listBox" key={idx}>
      <div className="imgBox">
        <img alt="이미지" src={test} />
      </div>
      <div className="contentBox">
        <div className="profileImg">
          <img alt="이미지" src={test} />
        </div>
        <div className="content">
          <div className="left">
            <div className="subject">{val.num}</div>
            <div className="detail">
              <div className="name">{val.name} 스타일리스트</div>
              <div className="score">
                <img alt="점수" src={star} />
                <div>
                  {val.score} <span>({val.cnt}개)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Link to="/">
              <div className="moreBtn">더보기</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <Slider {...settings}>{CarouselList}</Slider>
    </div>
  );
};

export default Carousel;
