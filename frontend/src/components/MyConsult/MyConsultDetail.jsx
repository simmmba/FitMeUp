import React from "react";
import "./MyConsultDetail.scss";

import Header from "../Common/Header";
import ConsultListDetial from "./ConsultListDetail";
import axios from "axios";
import { Spin, Empty } from "antd";

class MyConsultDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: true,
    };
  }

  componentDidMount() {
    // 스타일리스트 목록 받아오기
    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL}/consult/apply_in_consult?consult_id=${this.props.location.state.consult.id}`,
    })
      .then((res) => {
        // axios가 잘되면
        console.log(res.data.list);
        this.setState({
          list: res.data.list,
          loading: false,
        });
      })
      .catch((error) => {
        alert("스타일리스트 정보를 받아오는데 실패했습니다");
        this.setState({
          loading: false,
        });
      });
  }

  render() {
    return (
      <>
        <Header></Header>
        <div className="MyConsultDetail">
          <ConsultListDetial
            consult={this.props.location.state.consult}
          ></ConsultListDetial>

          {this.props.location.state.filter === "0" ? (
            <>
              <div className="title">신청한 스타일리스트 목록</div>
              {this.state.list.map((item, index) => (
                <div key={index}>{item.nickname}</div>
              ))}
            </>
          ) : (
            <>
              <div className="title">지정한 스타일리스트</div>
              {this.state.list.map((item, index) => (
                <div key={index}>{item.nickname}</div>
              ))}
            </>
          )}

          {this.state.loading && (
            <Spin className="loading no_consult" size="large" />
          )}
          {this.state.list.length === 0 && !this.state.loading && (
            <div className="nothing no_consult">
              <Empty
                description={
                  <span className="description">해당하는 상담이 없습니다.</span>
                }
              />
            </div>
          )}
        </div>
      </>
    );
  }
}

export default MyConsultDetail;
