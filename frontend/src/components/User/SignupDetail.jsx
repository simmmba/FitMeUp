import React from "react";
import "./User.scss";

import Header from "../Common/Header";
import Certification from "../User/Certification";

class SignupDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      provider: "",
      api_id: "",

      nickname: "",

      gender: "여자",
      age: 27,

      agree: false,
    };
  }

  years = [1,2,3,4,5,6,7,8,9];

  componentDidMount() {
    // 바로 들어온건지 확인하기
    // 만약 값이 없으면 이동
    const { history, location } = this.props;
    if (location.state === undefined) {
      alert("인증된 회원 정보가 없습니다.");
      history.push({ pathname: "/" });
    } else {
      this.setState({
        provider: location.state.provider,
        api_id: location.state.api_id,
        type: location.state.type,
      });
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <>
        <Header></Header>
        <div className="User">
          <div className="SignupDetail">
            <div className="title">회원가입</div>
            {/* 약관 동의 부분 */}
            <div className="row">
              <div className="col-1">
                <input type="checkbox" id="checkbox"></input>
              </div>
              <div className="col-11">
                <label for="checkbox">전체동의 (필수)</label>
                <div>핏미업 서비스 이용약관, 개인정보 수집 및 이용동의</div>
              </div>
            </div>
            {/* 전문가일때만 뜨게 */}
            {this.state.type === "stylist" && <Certification />}

            {/* 닉네임 입력 */}
            <div className="nickname">
              <input
                type="text"
                name="name"
                // onChange={this.onChange}
                className="input_nickname"
                placeholder="닉네임을 입력해주세요 (2~8자)"
              ></input>
            </div>
            <div className="additional_info">
              <select>
                <option defaultValue>여자</option>
                <option>남자</option>
              </select>
              <input
                type="number"
                name="age"
                onChange={this.onChange}
                className="input_age"
                placeholder="나이"
                value={this.state.age}
              ></input>
            </div>
            <div className="complete_btn">가입 완료</div>
          </div>
        </div>
      </>
    );
  }
}

export default SignupDetail;
