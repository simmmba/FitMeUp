import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
const CreditHistory = () => {
  const loginUser = JSON.parse(window.sessionStorage.getItem("user"));
  const [paymentList, setPaymentList] = useState([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const state = {
    charge: "충전",
    checkout: "구매",
    income: "판매",
    withdraw: "출금",
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/payment/list?user_id=` + loginUser.id)
      .then((res) => {
        console.log(res.data.payments);
        setPaymentList(res.data.payments.reverse());
        setCount(parseInt(res.data.payments.length / 5) + 1);
        setPage(1);
      })
      .catch((err) => {
        console.log(err);
        alert("결제 내역을 불러오는 도중 오류가 발생했습니다.");
      });
  }, []);

  return (
    <div className="middle_tab center">
      <div className="center">
        <h3>
          <b>포인트 사용 내역</b>
        </h3>
      </div>
      <div className="creditHistoryList">
        {paymentList.slice((page - 1) * 5, page * 5).map((m) => {
          if (m) {
            return (
              <div className="creditHistoryBox" key={m.id}>
                <div className={m.type === "charge" ? "line center type blue" : m.type === "income" ? "line center type blue" : "line center type red"}>
                  <b>{state[m.type]}</b>
                </div>
                <div className="line center contents">
                  {m.type === "charge" ? (
                    <div>포인트 충전</div>
                  ) : m.type === "checkout" ? (
                    <div>{m.stylist.name}님과 상담 비용</div>
                  ) : m.type === "income" ? (
                    <div>{m.user.nickname}님과 상담 수입</div>
                  ) : m.type === "withdraw" ? (
                    <div>포인트 출금</div>
                  ) : (
                    <div>상담 신청 보류 금액</div>
                  )}
                </div>
                <div className={m.type === "charge" ? "line center amount blue" : m.type === "income" ? "line center amount blue" : "line center amount red"}>{m.amount} KRW</div>
                <div className="line center date">
                  {m.createdAt.substring(0, 10)} {m.createdAt.substring(11, 16)}
                </div>
              </div>
            );
          }
        })}
      </div>
      <Pagination className="topMargin center" size={"small"} page={page} color={"secondary"} count={count} variant="outlined" shape="rounded" onChange={handleChange} />
      <br />
    </div>
  );
};

export default CreditHistory;
