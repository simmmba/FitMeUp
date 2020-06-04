import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import "./ConsultDetail.scss";
import axios from "axios";

import Header from "../Common/Header";
import { SmallDashOutlined } from "@ant-design/icons";

const ConsultDetail = (props) => {
  const [apply, setApply] = useState(false);
  const [list] = useState([
    ["성별", ""],
    ["나이", "세"],
    ["키", "cm"],
    ["몸무게", "kg"],
    ["상의", ""],
    ["하의", ""],
    ["가격", "원"],
    ["상황", ""],
  ]);
  const [wantImg, setWantImg] = useState([]);
  const [myImg, setMyImg] = useState([]);
  const [requser, setRequser] = useState({});
  const [category, setCategory] = useState("");

  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const url = window.location.href.split("/");
  const history = useHistory();

  useEffect(() => {
    console.log(user);
    req_list();
  }, []);

  // axios로 리스트를 부름
  const req_list = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL}/consult/req?consult_id=${
        url[url.length - 1]
      }&user_id=${user.id}`,
    })
      .then((res) => {

        console.log(res.data.consult)

        list[0].push(res.data.consult.gender);
        list[1].push(res.data.consult.age);
        list[2].push(res.data.consult.height);
        list[3].push(res.data.consult.weight);
        list[4].push(res.data.consult.top);
        list[5].push(res.data.consult.bottom);
        list[6].push(res.data.consult.budget);
        list[7].push(res.data.consult.contents);

        setWantImg(res.data.consult.ConsultWants);
        setMyImg(res.data.consult.ConsultImages);
        setRequser(res.data.consult.req_user);
        setCategory(res.data.consult.category);
        if (res.data.consult?.applied !== "no") setApply(true);
      })
      .catch((error) => {
        alert("상담 요청 내역을 가져오는데 실패했습니다.");
      });
  };

  const clickApply = () => {
    // 이미 상담 신청되어 있으면 취소
    if (apply) {
      axios({
        method: "delete",
        url: `${process.env.REACT_APP_URL}/consult/apply`,
        data: {
          user_id: user.id,
          consult_id: url[url.length - 1],
        },
      })
        .then((res) => {
          alert("상담 신청 취소가 완료되었습니다");
          setApply(!apply);
        })
        .catch((error) => {
          alert("상담 신청 취소를 실패했습니다");
        });
    }
    // 상담 신청하기
    else {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/consult/apply`,
        data: {
          stylist_id: user.id,
          consult_id: url[url.length - 1],
          contents: "",
        },
      })
        .then((res) => {
          // axios가 잘되면
          alert("상담 신청이 완료되었습니다");
          setApply(!apply);
        })
        .catch((error) => {
          alert("상담 신청을 실패했습니다");
        });
    }
  };

  const deleteConsult = () => {
    if (window.confirm("해당 상담을 삭제하시겠습니까?")) {
    }
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_URL}/consult/req`,
      data: {
        user_id: user.id,
        consult_id: url[url.length - 1],
      },
    })
      .then((res) => {
        // axios가 잘되면
        alert("상담 삭제가 완료되었습니다");
        history.goBack();
      })
      .catch((error) => {
        alert("상담 삭제를 실패했습니다");
      });
  };

  return (
    <>
      <Header></Header>
      <div className="ConsultDetail">
        <div className="processing">
          <div className="position">
            <br />
            <div className="type">
              {category === "coordi" ? "코디 추천 받기" : "내 옷 추천받기"}
            </div>
            <div className="user">
              <img alt="style" className="profile" src={requser.profile_img} />
              <span className="nickname">{requser.nickname}</span>
            </div>
            {user.type === "stylist" ? (
              <>
                {apply ? (
                  <div className="apply" onClick={clickApply}>
                    상담 신청 취소하기
                  </div>
                ) : (
                  <div className="apply" onClick={clickApply}>
                    상담 신청하기
                  </div>
                )}
              </>
            ) : (
              <div className="apply" onClick={deleteConsult}>
                상담 삭제하기
              </div>
            )}
          </div>
        </div>
        <div className="total_consult">
          <div className="title">상담 상세 내용</div>
          {/* 문자로 된 정보 */}
          <div className="text_info">
            {list.map((condition) => (
              <div key={condition[0]} className="row">
                {condition[2] && condition[2] !== null && (
                  <>
                    <div className="col-1">{condition[0]}</div>
                    <div className="col-11">
                      {condition[2]}
                      {condition[1]}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          {/* 이미지로 된 정보 */}
          <div className="img_info">
            <div className="sub_title">원하는 스타일</div>
            <div>
              {wantImg.map((img, index) => (
                <img
                  key={index}
                  alt="style"
                  className="styleimg"
                  src={"/img/wantStyle/" + img.img}
                />
              ))}
            </div>
            {myImg.length !== 0 && (
              <>
                <div className="sub_title">평소 입는 스타일</div>
                <div>
                  {myImg.map((img, index) => (
                    <img
                      key={index}
                      alt="style"
                      className="styleimg"
                      src={img.image_path}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsultDetail;

// link state 활용법
// https://medium.com/@bopaiahmd.mca/how-to-pass-props-using-link-and-navlink-in-react-router-v4-75dc1d9507b4
