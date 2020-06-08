import React, { useEffect, useState } from "react";
import "./MyPageMain.scss";
import axios from "axios";
import { Empty } from "antd";
import { Link } from "react-router-dom";

const MyFrequent = () => {
  const loginUser = JSON.parse(window.sessionStorage.getItem("user"));
  // const [consult, setConsult] = useState([]);
  const consult = [
    { gender: "여자", want: "캐주얼", nickname: "한혜연", price: 10000 },
    { gender: "여자", want: "캐주얼", nickname: "한혜연", price: 10000 },
    { gender: "여자", want: "캐주얼", nickname: "한혜연", price: 10000 },
    { gender: "여자", want: "캐주얼", nickname: "한혜연", price: 10000 },
    { gender: "여자", want: "캐주얼", nickname: "한혜연", price: 10000 },
    { gender: "여자", want: "캐주얼", nickname: "한혜연", price: 10000 },
    { gender: "여자", want: "캐주얼", nickname: "한혜연", price: 10000 },
    { gender: "여자", want: "캐주얼", nickname: "한혜연", price: 10000 },
  ];

  useEffect(() => {
    // axios.get(`${process.env.REACT_APP_URL}/consult/list_for_review/?user_id=` + loginUser.id).then((res) => {
    //   console.log(res.data.list);
    //   setConsult(res.data.list);
    // });
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
              <div className="consultGrid">
                <div key={idx} className="consultVal">
                  <div className="first">
                    <div>{val.gender}</div>
                    <div>{val.want}</div>
                  </div>
                  <div className="second">
                    <div className="consultNickname">{val.nickname} 스타일리스트</div>
                    <div className="consultPrice">
                      <b>{val.price}</b> Point
                    </div>
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
