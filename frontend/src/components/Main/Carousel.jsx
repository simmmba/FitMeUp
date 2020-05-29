import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "./Carousel.scss";
import test from "../../img/test.jpg";
import star from "../../img/star.png";

const Carousel = (props) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    let url = "";
    if (props.kind === "score") url = `${process.env.REACT_APP_URL}/recommend/score`;
    else url = `${process.env.REACT_APP_URL}/recommend/consult`;

    axios.get(url).then((res) => {
      setList(res.data.recommends);
      // console.log(res.data.recommends[0]);
      // console.log(res.data.recommends[0].User.nickname);
    });
  }, [props.kind]);

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

  const CarouselList = list.map((val, idx) => (
    <div className="listBox" key={idx}>
      <div className="imgBox">
        <img alt="이미지" src={val.portfolio_img !== null || val.portfolio_img === "/default.jpg" ? test : val.portfolio_img} />
      </div>
      <div className="contentBox">
        <div className="profileImg">
          <img alt="프로필이미지" src={val.User.profile_img !== null || val.User.profile_img === "/default.jpg" ? test : val.User.profile_img} />
        </div>
        <div className="content">
          <div className="left">
            <div className="subject">{val.portfolio_title}</div>
            <div className="detail">
              <div className="name">{val.User.nickname} 스타일리스트</div>
            </div>
            <div className="cnt">
              <img alt="score" src={star} />
              <div>
                {val.avg_score} <span>({val.review_cnt}개)</span>
              </div>
              <div className="consultCnt">
                <span>{val.consult_cnt}</span>회 상담
              </div>
            </div>
          </div>
          <div className="right">
            <Link to={`/portfolio/${val.id}`}>
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
