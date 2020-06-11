import React from "react";
import "./MyConsult.scss";

import Header from "../Common/Header";
import ConsultList from "./ConsultList";
import axios from "axios";
import { Spin, Empty } from "antd";
import ScrollToTop from "../Common/ScrollToTop";
import { inject, observer } from "mobx-react";

@inject((stores) => ({
  setFilter: stores.filter.setFilter,
  filter : stores.filter.filter
}))
@observer
class MyConsult extends React.Component {
  user = JSON.parse(window.sessionStorage.getItem("user"));

  constructor(props) {
    super(props);
    this.state = {
      filter: "0", // 받은 요청, 보낸 요청
      consult: [],
      loading: false,
    };
  }

  filter_stylist = [
    ["0", "받은 상담 요청"],
    ["1", "보낸 상담 요청"],
  ];

  filter_general = [
    ["0", "핏미업에 게시된 상담"],
    ["1", "스타일리스트를 지정한 상담"],
  ];

  componentDidMount() {
    const { history } = this.props;
    if (!this.user) {
      alert("로그인을 해야 이용 가능한 서비스 입니다.");
      history.push("/");
      return;
    }

    this.setState({
      loading: true,
      filter: this.props.filter
    });
    this.getList(this.props.filter);
  }

  // 필터 선택
  clickFilter = async (res) => {
    this.setState({
      filter: res.target.id,
      loading: true,
    });

    this.props.setFilter(res.target.id);

    this.getList(res.target.id);
  };

  getList = (filter) => {
    var axiosUrl = "";
    if (this.user?.type === "general") {
      if (filter === "0") {
        // 받은 상담
        axiosUrl = `${process.env.REACT_APP_URL}/consult/myreqlist?user_id=${this.user?.id}&appointed=false`;
      } else {
        axiosUrl = `${process.env.REACT_APP_URL}/consult/myreqlist?user_id=${this.user?.id}&appointed=true`;
      }
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
        // alert("상담 요청 내역을 가져오는데 성공했습니다.");
        this.setState({
          consult: res.data.list,
          loading: false,
        });
      })
      .catch((error) => {
        alert("상담 요청 내역을 가져오는데 실패했습니다.");
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    return (
      <>
        <ScrollToTop></ScrollToTop>
        <Header></Header>
        <div className="MyConsult">
          {/* 요청 필터 */}
          <div className="filter">
            {this.user?.type !== "general" ? (
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
            ) : (
              <>
                {this.filter_general.map((item, index) => (
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
          {this.state.loading && (
            <Spin className="loading no_consult" size="large" />
          )}
          <div>
            {!this.state.loading &&
              this.state.consult.map((consult, index) => (
                <ConsultList
                  key={index}
                  filter={this.state.filter}
                  consult={consult}
                ></ConsultList>
              ))}
            {this.state.consult.length === 0 && !this.state.loading && (
              <div className="nothing no_consult">
                <Empty
                  description={
                    <span className="description">
                      해당하는 상담이 없습니다.
                    </span>
                  }
                />
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default MyConsult;
