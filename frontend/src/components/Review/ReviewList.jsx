import React from "react";
import "./ReviewList.scss";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Rate } from "antd";

class ReviewList extends React.Component {
  user = JSON.parse(window.sessionStorage.getItem("user"));

  // 리뷰 삭제 버튼
  confirm = () => {
    if (window.confirm("리뷰를 삭제하시겠습니까?")) {
      axios({
        method: "delete",
        url: `${process.env.REACT_APP_URL}/review/write`,
        data : {
          review_id : this.props.review.id
        }
      })
        .then((res) => {
          alert("해당 리뷰가 삭제 되었습니다.");
          window.location.reload();
        })
        .catch((error) => {
          //console.log(error);
        });
    }
  };

  // 리뷰 수정 버튼
  edit = () => {
    const { history } = this.props;
    history.push({
      pathname: "/review/update",
      state: {
        review: this.props.review,
      },
    });
  };

  // 최대 10개까지만 이미지 보이게 하기
  render() {
    const review = this.props.review;
    return (
      <div className="ReviewList">
        <div className="user_info">
          <img
            className="profile"
            alt="profile"
            src={review.User.profile_img}
          ></img>
          <span className="user_name">{review.User.nickname}</span>
          <Rate disabled allowHalf defaultValue={review.score} />
          <span className="tscore">({review.score})</span>
        </div>

        <div className="contents">{review.contents}</div>

        {/* 리뷰 이미지 들어가는 부분 1:1 */}
        {review.images && review.images.length > 0 && (
          <div className="review_img_bundle">
            {review.images.map((img, index) => (
              <div key={index} className="review_img">
                <div className="thumbnail">
                  <div className="centered">
                    <img
                      className="store_img"
                      alt="store_img"
                      src={img}
                      onClick={() => {
                        window.open(img);
                      }}
                    ></img>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 작성자랑 같은지 확인 user_nickname 으로 비교 */}
        {review.createdAt && (
          <>
            <div className="date">{review.createdAt.split("T")[0]}</div>
          </>
        )}
        {this.user && this.user.id === review.user_id && (
          <div className="edit_button">
            <div className="mebtn" onClick={this.confirm}>
              삭제
            </div>
            &nbsp;&nbsp;
            <div className="mebtn" onClick={this.edit}>
              수정
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(ReviewList);
