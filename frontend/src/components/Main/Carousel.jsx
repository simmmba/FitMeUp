import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { Spin } from "antd";

import "./Carousel.scss";
import defaultImg from "../../img/test.jpg";
import star from "../../img/star.png";

const Carousel = (props) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let url = "";
    if (props.kind === "score") url = `${process.env.REACT_APP_URL}/recommend/score`;
    else url = `${process.env.REACT_APP_URL}/recommend/consult`;

    axios.get(url).then((res) => {
      setList(res.data.recommends);
      setLoading(true);
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
    slidesToShow: list.length < 3 ? list.length : 3,
    slidesToScroll: 3,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  const history = useHistory();

  const [mouse, setMouse] = useState({
    mouse_x: 0,
    mouse_y: 0
  })

  const { mouse_x, mouse_y } = mouse

  const mousedown = (e) => {
    setMouse({
      ...mouse,
      mouse_x: e.clientX,
      mouse_y: e.clientY
    })
  }

  const mouseup = (e) => {
    if (Math.abs(e.clientX - mouse_x) <= 1 && Math.abs(e.clientY - mouse_y) <= 1) {
      history.push(`/portfolio/detail/${e.target.id}`);
    }
  }

  const CarouselList = list.map((val, idx) => (
    <div className="listBox" key={idx} id={val.id} onMouseDown={mousedown} onMouseUp={mouseup}>
      <div className="imgBox" id={val.id}>
        <img id={val.id} alt="이미지" src={val.portfolio_img === null || val.portfolio_img === "/default.jpg" ? defaultImg : val.portfolio_img} />
      </div>
      <div className="contentBox" id={val.id}>
        <div className="profileImg" id={val.id}>
          <img alt="프로필이미지" id={val.id} src={val.User.profile_img === null || val.User.profile_img === "/default.jpg" ? defaultImg : val.User.profile_img} />
        </div>
        <div className="content" id={val.id}>
          <div className="left" id={val.id}>
            <div className="subject" id={val.id}>{val.portfolio_title}</div>
            <div className="detail" id={val.id}>
              <div className="name" id={val.id}>{val.User.nickname} 스타일리스트</div>
            </div>
            <div className="cnt" id={val.id}>
              <img alt="score" id={val.id} src={star} />
              <div id={val.id}>
                {val.avg_score} <span id={val.id}>({val.review_cnt}개)</span>
              </div>
              <div className="consultCnt" id={val.id}>
                <span id={val.id}>{val.consult_cnt}</span>회 상담
              </div>
            </div>
          </div>
          {/* <div className="right">
            <Link to={`/portfolio/detail/${val.id}`}>
              <div className="moreBtn">더보기</div>
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  ));

  return <div className="Carousel">{!loading ? <Spin className="loading" size="large" /> : list !== null && <Slider {...settings}>{CarouselList}</Slider>}</div>;
};

export default Carousel;
