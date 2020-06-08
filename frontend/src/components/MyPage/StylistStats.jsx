import React, { useEffect, useState } from "react";
import "./MyPageMain.scss";
import { Chart } from "react-google-charts";
import axios from "axios";
import { Form } from "react-bootstrap";
import { Empty } from "antd";

const StylistStats = () => {
  const loginUser = JSON.parse(window.sessionStorage.getItem("user"));
  const [creditInfo, setCreditInfo] = useState([]);
  const [isCreditExist, setIsCreditExist] = useState(false);
  const [consultInfo, setConsultInfo] = useState([]);
  const [isConsultExist, setIsConsultExist] = useState(false);
  const [scoreInfo, setScoreInfo] = useState({ score_1: 0, score_2: 0, score_3: 0, score_4: 0, score_5: 0 });
  const [isScoreExist, setIsScoreExist] = useState(false);
  const [stat, setStat] = useState("revenue");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/statistics/score?stylist_id=` + loginUser.id)
      .then((res) => {
        setScoreInfo(res.data.info);
        res.data.info.score_5 = 4;
        res.data.info.score_4 = 2;
        res.data.info.score_3 = 1;
        if (res.data.info.score_1 > 0) setIsScoreExist(true);
        if (res.data.info.score_2 > 0) setIsScoreExist(true);
        if (res.data.info.score_3 > 0) setIsScoreExist(true);
        if (res.data.info.score_4 > 0) setIsScoreExist(true);
        if (res.data.info.score_5 > 0) setIsScoreExist(true);
      })
      .catch((err) => {
        console.log(err);
        alert("평점 통계 자료 조회 중 오류가 발생했습니다.");
      });

    axios
      .get(`${process.env.REACT_APP_URL}/statistics/consult?stylist_id=` + loginUser.id)
      .then((res) => {
        if (res.data.info.length === 0) {
          setIsConsultExist(false);
        } else {
          setIsConsultExist(true);
          const consultings = [["월", "내 옷장 Pick", "스타일리스트 Pick"]];
          res.data.info.push({
            month: "5",
            my: 5,
            coordi: 6,
          });
          res.data.info.push({
            month: "4",
            my: 3,
            coordi: 5,
          });
          res.data.info.forEach((c) => {
            consultings.push([c.month + "월", parseInt(c.my), parseInt(c.coordi)]);
          });
          setConsultInfo(consultings);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("상담 통계 자료 조회 중 오류가 발생했습니다.");
      });

    axios.get(`${process.env.REACT_APP_URL}/statistics/payment?stylist_id=` + loginUser.id).then((res) => {
      if (res.data.info.length === 0) {
        setIsCreditExist(false);
      } else {
        setIsCreditExist(true);
        const credits = [["월", "수익", "출금"]];

        res.data.info.push({
          month: "5",
          income: 50000,
          witdraw: 100000,
        });
        res.data.info.push({
          month: "4",
          income: 30000,
          witdraw: 0,
        });
        res.data.info.forEach((c) => {
          credits.push([c.month + "월", parseInt(c.income), parseInt(c.witdraw)]);
        });
        setCreditInfo(credits);
      }
    });
  }, [loginUser.id]);

  const handleSelectorChange = (e) => {
    console.log(e.target.value);
    setStat(e.target.value);
  };

  return (
    <div className="middle_tab">
      <div className="center">
        <h3>
          <b>통계 정보</b>
        </h3>
      </div>
      <div className="center">
        <div className="selector">
          <Form.Control as="select" id="option" value={stat} onChange={handleSelectorChange}>
            <option value="revenue">수익</option>
            <option value="consulting">상담</option>
            <option value="score">평점</option>
          </Form.Control>
        </div>
      </div>
      {stat === "revenue" ? (
        <div className="center full_height">
          {isCreditExist ? (
            <Chart
              width={"100%"}
              height={"100%"}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={creditInfo}
              options={{
                title: "수익",
                hAxis: { title: "Month", titleTextStyle: { color: "#333" } },
                vAxis: { minValue: 0 },
                chartArea: { width: "60%", height: "70%" },
              }}
            />
          ) : (
            <Empty description={<span className="description">수익 내역이 없습니다.</span>} />
          )}
        </div>
      ) : stat === "score" ? (
        <div className="center full_height leftPadding">
          {isScoreExist ? (
            <Chart
              width={"100%"}
              height={"100%"}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[
                ["평점", "평점 비율"],
                ["1점", scoreInfo.score_1],
                ["2점", scoreInfo.score_2],
                ["3점", scoreInfo.score_3],
                ["4점", scoreInfo.score_4],
                ["5점", scoreInfo.score_5],
              ]}
              options={{
                title: "평점",
              }}
              rootProps={{ "data-testid": "1" }}
            />
          ) : (
            <Empty description={<span className="description">평점 내역이 없습니다.</span>} />
          )}
        </div>
      ) : (
        <div className="center full_height">
          {isConsultExist ? (
            <Chart
              width={"100%"}
              height={"100%"}
              chartType="ComboChart"
              loader={<div>Loading Chart</div>}
              data={consultInfo}
              options={{
                title: "월별 상담 수",
                vAxis: { title: "Cups" },
                hAxis: { title: "Month" },
                seriesType: "bars",
                series: { 5: { type: "line" } },
              }}
              rootProps={{ "data-testid": "1" }}
            />
          ) : (
            <Empty description={<span className="description">상담 내역이 없습니다.</span>} />
          )}
        </div>
      )}
    </div>
  );
};

export default StylistStats;
