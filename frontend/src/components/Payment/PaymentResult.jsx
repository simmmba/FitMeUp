import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function PaymentResult(props) {
  const query = props.location.state.data;
  console.log(props.location.state.data);

  const { error_msg, paid_amount } = query;
  const isSuccessed = getIsSuccessed();
  function getIsSuccessed() {
    const { success, imp_success } = query;
    if (typeof imp_success === "string") return imp_success === "true";
    if (typeof imp_success === "boolean") return imp_success === true;
    if (typeof success === "string") return success === "true";
    if (typeof success === "boolean") return success === true;
  }

  const resultType = isSuccessed ? "성공" : "실패";

  const handleCharge = () => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/payment/charge`,
      data: {
        user_id: JSON.parse(window.sessionStorage.getItem("user")).id,
        amount: paid_amount,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div>
      <p>{`포인트 충전에 ${resultType}했습니다`}</p>
      {isSuccessed ? (
        <div>
          <span>충전 금액 : </span>
          <span>{paid_amount} Point</span>
        </div>
      ) : (
        <div>
          <span>에러 메시지</span>
          <span>{error_msg}</span>
        </div>
      )}
      <button onClick={handleCharge}>입금하기</button>
      <Link to="/payment">돌아가기</Link>
    </div>
  );
}

export default PaymentResult;
