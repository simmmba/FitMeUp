import React from "react";

const StylistList = (val) => {
  return (
    <div className="StylistList">
      <div>
        <Link to={`/portfolio/${val.id}`} className="listBox">
          <div className="imgBox">
            <img
              alt="이미지"
              src={
                val.portfolio_img === "/default.jpg"
                  ? defaultImg
                  : val.portfolio_img
              }
            />
          </div>
          <div className="detailBox">
            <div className="portfolioName">{val.portfolio_title}</div>
            <div className="nicknameBox">
              <div className="profileImg">
                <img
                  alt=""
                  src={
                    val.profile_img === "/default.jpg"
                      ? defaultImg
                      : val.profile_img
                  }
                />
              </div>
              <div>{val.nickname} 스타일리스트</div>
            </div>
            <div className="evalBox">
              <Rate
                disabled
                allowHalf
                defaultValue={Math.round(val.avg_score * 2) / 2}
              />
              &nbsp;&nbsp;&nbsp;
              <div className="score">{Math.round(val.avg_score * 10) / 10}</div>
              &nbsp;&nbsp;
              <div className="review">({val.review_cnt}개)</div>
              <div className="consult">{val.consult_cnt}회 상담</div>
            </div>
            <div className="reviewBox">
              <div className="recentReview">최근리뷰</div>
              <b>{val.recent_review !== null && val.recent_review.nickname}</b>
              <span>
                {val.recent_review !== null
                  ? val.recent_review.contents
                  : "작성된 리뷰가 없습니다."}
              </span>
            </div>
          </div>
        </Link>
        <hr />
      </div>
    </div>
  );
};

export default StylistList;
