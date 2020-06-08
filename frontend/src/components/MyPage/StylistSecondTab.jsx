import React, { useEffect, useState } from "react";
import "./MyPageMain.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Chart } from "react-google-charts";

const StylistSecondTab = () => {
  const loginUser = JSON.parse(window.sessionStorage.getItem("user"));
  const [user, setUser] = useState({});
  const [modifyMode, setModifyMode] = useState(false);
  const [selectorValue, setSelectorValue] = useState("revenue");
  const [paymentList, setPaymentList] = useState([]);

  const basicInfo = {
    name: "",
    belong: "",
    phone: "",
    occupation: "",
  };

  useEffect(() => {
    get_user();
  }, []);

  const get_payment_list = () => {
    axios.get(`${process.env.REACT_APP_URL}/payment/list?uset_id` + loginUser.id).then((res) => {
      setPaymentList(res.data.list);
      res.data.list.forEach((p) => {});
    });
  };

  const get_user = () => {
    axios.get(`${process.env.REACT_APP_URL}/user/myinfo?user_id=` + loginUser.id).then((res) => {
      setUser(res.data.user);
    });
  };

  const handleChange = (e) => {
    basicInfo[e.target.name] = e.target.value;
  };

  const handleBtnClick = () => {
    if (modifyMode) {
      axios
        .put(`${process.env.REACT_APP_URL}/user/myinfo`, {
          id: user.id,
          type: user.type,
          gender: user.gender,
          age: user.age,
          nickname: user.nickname,
          profile_img: user.profile_img,
          platform: user.platform,
          api_id: user.api_id,
          name: basicInfo.name,
          belong: basicInfo.belong,
          phone: basicInfo.phone,
          occupation: basicInfo.occupation,
          height: user.height,
          weight: user.weight,
          top: user.top,
          bottom: user.bottom,
        })
        .then((res) => {
          console.log(res);
          if (res.data.result === "Success") {
            axios.get(`${process.env.REACT_APP_URL}/user/myinfo?user_id=` + loginUser.id).then((response) => {
              window.sessionStorage.setItem("user", JSON.stringify(response.data.user));
              setUser(response.data.user);
            });
          }
        })
        .catch((err) => {
          alert("정보 변경에 실패;;");
          console.log(err);
        });
    }
    setModifyMode(!modifyMode);
  };

  const selectorOnChange = (e) => {
    console.log(e.target.value);
    setSelectorValue(e.target.value);
  };

  const clickCancel = () => {
    setModifyMode(false);
  };

  return (
    <div className="outline col-5">
      <div className="col-5">
        <div className="center middleTopMargin">
          <h3>기본 정보</h3>
        </div>
        <div className="center info">
          <div className="col-5 title">이름</div>
          {modifyMode ? (
            <div className="col-7">
              <input type="text" name="name" onChange={handleChange} className="input" />
            </div>
          ) : (
            <div className="col-7">{user.name ? user.name : "*"}</div>
          )}
        </div>
        <div className="center info">
          <div className="col-5 title">소속</div>
          {modifyMode ? (
            <div className="col-7">
              <input type="text" name="belong" onChange={handleChange} className="input" />
            </div>
          ) : (
            <div className="col-7">{user.belong ? user.belong : "*"}</div>
          )}
        </div>
        <div className="center info">
          <div className="col-5 title">직업</div>
          {modifyMode ? (
            <div className="col-7">
              <input type="text" name="occupation" onChange={handleChange} className="input" />
            </div>
          ) : (
            <div className="col-7">{user.occupation ? user.occupation : "*"}</div>
          )}
        </div>
        <div className="center info">
          <div className="col-5 title">연락처</div>
          {modifyMode ? (
            <div className="col-7">
              <input type="text" name="phone" onChange={handleChange} className="input" placeholder={"010-1234-5678"} />
            </div>
          ) : (
            <div className="col-7">{user.phone ? user.phone : "*"}</div>
          )}
        </div>
        <div className="center bigTopMargin">
          {modifyMode ? (
            <div className="center">
              <div className="smallSelectBtn" onClick={clickCancel}>
                취소
              </div>
              <div className="smallSelectBtn" onClick={handleBtnClick}>
                수정
              </div>
            </div>
          ) : (
            <div className="smallSelectBtn" onClick={handleBtnClick}>
              기본 정보 수정
            </div>
          )}
        </div>
      </div>
      <div className="col-7">
        <div className="center middleTopMargin">
          <h4>통계</h4>
        </div>
        <div className="center">
          <Form.Control as="select" id="stats" value={selectorValue} onChange={selectorOnChange} className="col-4">
            <option value="revenue">수입</option>
            <option value="consult">컨설팅</option>
            <option value="review">리뷰</option>
          </Form.Control>
        </div>
        <div className="center middleTopMargin">
          {selectorValue === "revenue" ? (
            <div>
              <Chart
                width={400}
                height={"300px"}
                chartType="AreaChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ["Month", "Total Revenue", "출금"],
                  ["4월", 100000, 50000],
                  ["5월", 100000, 150000],
                  ["6월", 200000, 100000],
                ]}
                options={{
                  title: "Revenue",
                  hAxis: { title: "Month", titleTextStyle: { color: "#333" } },
                  vAxis: { minValue: 0 },
                  chartArea: { width: "50%", height: "70%" },
                }}
              />
            </div>
          ) : selectorValue === "consult" ? (
            <div>컨설팅</div>
          ) : (
            <div>리뷰</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StylistSecondTab;
