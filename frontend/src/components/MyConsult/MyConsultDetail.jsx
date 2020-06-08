import React from "react";
import "./MyConsultDetail.scss";

import Header from "../Common/Header";
import ConsultListDetial from "./ConsultListDetail";
import axios from "axios";
import { Spin, Empty } from "antd";
import Stylist from "./Stylist";

class MyConsultDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: true,
      consult: [],
    };
  }

  componentDidMount() {
    console.log(this.props.location.state);
    this.setState({
      consult: [this.props.location.state.consult],
    });

    var axiosUrl = "";
    // 스타일리스트 목록 받아오기
    if (this.props.location.state.filter === "0") {
      axiosUrl = `${process.env.REACT_APP_URL}/consult/apply_in_consult?consult_id=${this.props.location.state.consult.id}`;
    } else {
      axiosUrl = `${process.env.REACT_APP_URL}/consult/stylist_info?consult_id=${this.props.location.state.consult.id}`;
    }

    axios({
      method: "get",
      url: axiosUrl,
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
          {this.state.consult.length !== 0 && (
            <ConsultListDetial
              consult={this.state.consult[0]}
            ></ConsultListDetial>
          )}

          {this.props.location.state.filter === "0" ? (
            <>
              <div className="title">신청한 스타일리스트 목록</div>
              {this.state.list.map((item, index) => (
                <Stylist
                  key={index}
                  val={item}
                  filter={this.props.location.state.filter}
                  stylist_id={this.props.location.state.consult.stylist_id}
                ></Stylist>
              ))}
            </>
          ) : (
            <>
              <div className="title">지정한 스타일리스트</div>
              {this.state.list.map((item, index) => (
                <Stylist
                  key={index}
                  val={item}
                  filter={this.props.location.state.filter}
                  stylist_id={this.props.location.state.consult.stylist_id}
                ></Stylist>
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
