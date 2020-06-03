import React from "react";
import "./MyConsult.scss";

import Header from "../Common/Header";
import ConsultList from "./ConsultList";
import axios from "axios";

class MyConsult extends React.Component {
  user = JSON.parse(window.sessionStorage.getItem("user"));

  constructor(props) {
    super(props);
    this.state = {
      filter: "0", // 받은 요청, 보낸 요청
      consult: [],
    };

    const { history } = this.props;
    if (!this.user) {
      alert("로그인을 해야 이용 가능한 서비스 입니다.");
      history.goBack("");
    }
  }

  filter_stylist = [
    ["0", "받은 상담 요청"],
    ["1", "보낸 상담 요청"],
  ];

  componentDidMount() {
    this.getList("0");
  }

  // 필터 선택
  clickFilter = async (res) => {
    this.setState({
      filter: res.target.id,
    });

    this.getList(res.target.id);
  };

  getList = (filter) => {
    var axiosUrl = "";
    if (this.user.type === "general") {
      // 받은 상담
      axiosUrl = `${process.env.REACT_APP_URL}/consult/myreqlist?user_id=${this.user.id}`;
    } else {
      // 받은 상담
      if (filter === "0") {
        axiosUrl = `${process.env.REACT_APP_URL}/consult/recvlist?stylist_id=${this.user.id}`;
      }
      // 보낸 상담
      else {
        axiosUrl = `${process.env.REACT_APP_URL}/consult/apply?user_id=${this.user.id}`;
      }
    }

    // axios 요청
    axios({
      method: "get",
      url: axiosUrl,
    })
      // 로그인 안되있는 거면
      .then((res) => {
        alert("상담 요청 내역을 가져오는데 성공했습니다.");
        console.log(res.data.list);
        this.setState({
          consult: res.data.list,
        });
      })
      .catch((error) => {
        alert("상담 요청 내역을 가져오는데 실패했습니다.");
      });
  };

  render() {
    return (
      <>
        <Header></Header>
        <div className="MyConsult">
          {/* 요청 필터 */}
          <div className="filter">
            {this.user?.type !== "general" && (
              <>
                {this.filter_stylist.map((item, index) => (
                  <div
                    key={index}
                    id={index}
                    onClick={this.clickFilter}
                    className={item[0] === this.state.filter ? "focus" : ""}
                  >
                    {item[1]}
                  </div>
                ))}
              </>
            )}
          </div>
          {/* 받아온 상담 목록 */}
          <div>
            {this.state.consult.map((consult) => (
              <ConsultList consult={consult}></ConsultList>
            ))}
            {this.state.consult.length === 0 && (
              <div className="no_consult">해당하는 상담 내역이 없습니다.</div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default MyConsult;
