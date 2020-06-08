import React, { useEffect, useState } from "react";
import "./MyPageMain.scss";
import axios from "axios";
import { Rate, Empty } from "antd";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const MyFrequent = () => {
  const loginUser = JSON.parse(window.sessionStorage.getItem("user"));
  const [consult, setConsult] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/consult/list_for_review/?user_id=` + loginUser.id).then((res) => {
      console.log(res.data.list);
      setConsult(res.data.list);
    });
  }, []);

  return (
    <div className="middle_tab">
      <div className="center">
        <h3>
          <b>내 상담 현황</b>
        </h3>
      </div>
      <div className="consultBox">
        {consult.length === 0 ? (
          <div className="nothing">
            <Empty description={<span className="description">아직 상담 내역이 없습니다.</span>} />
          </div>
        ) : (
          consult.map((val, idx) => {
            return (
              <div key={idx} className="consultGrid">
                <div className="consultVal">
                  <div className="left">
                    <div
                      className="first"
                      onClick={() => {
                        history.push(`/portfolio/detail/${val.stylist.id}`);
                      }}
                    >
                      <div>{val.gender}</div>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                      <div>
                        {val.ConsultWants.map((v, i) => {
                          if (i === 0) return <span key={i}>{v.val}</span>;
                          else if (i > 3) return <span key={i}> ...</span>;
                          else return <span key={i}>, {v.val}</span>;
                        })}
                      </div>
                    </div>
                    <div className="second">
                      <div className="consultNickname">{val.stylist.nickname} 스타일리스트</div>
                      <div className="consultPrice">
                        <b>{val.price}</b> Point
                      </div>
                      {val.review && (
                        <Link
                          className="consultScore"
                          to={{
                            pathname: "/review/update",
                            state: {
                              consult_id: val.id,
                              review: val.review,
                            },
                          }}
                        >
                          <Rate disabled allowHalf defaultValue={val.review.score} />
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="right">
                    {!val.review && (
                      <Link
                        className="reviewBtn"
                        to={{
                          pathname: "/review/write",
                          state: {
                            consult_id: val.id,
                          },
                        }}
                      >
                        리뷰 작성
                      </Link>
                    )}
                  </div>
                </div>
                <hr />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyFrequent;
