import React from "react";
import "./User.scss";
import axios from "axios";

import Header from "../Common/Header";
import Certification from "../User/Certification";

class SignupDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      platform: "",
      api_id: "",

      nickname: "",
      isnicknameVaild: false,

      name: "",
      phone: "",

      gender: "female",
      age: 27,

      agree: false,
    };
  }

  componentDidMount() {
    // 바로 들어온건지 확인하기
    // 만약 값이 없으면 이동
    const { history, location } = this.props;
    if (location.state === undefined) {
      alert("인증된 회원 정보가 없습니다.");
      history.push({ pathname: "/" });
    } else {
      this.setState({
        platform: location.state.platform,
        api_id: location.state.api_id,
        type: location.state.type,
      });
    }
  }

  setPhonenumber = (number) => {
    this.setState({
      phone: number,
    });
  };

  setName = (name) => {
    this.setState({
      name: name,
    });
  };

  onChange = (e) => {
    // 나이 범위 체크해주기
    if (e.target.name === "age") {
      if (e.target.value < 0 || e.target.value > 130) {
        alert("회원가입이 불가능한 나이입니다.");
        this.setState({
          age: "",
        });
        return;
      }
    }
    // 닉네임 중복 체크해주기
    if (e.target.name === "nickname") {
      // 글자수가 초과지 않을때만
      if (e.target.value.length > 1 && e.target.value.length <= 8) {
        // 여기에서 닉네임 중복 체크하기
        this.checkNickname(e.target.value);
      } else if (e.target.value.length > 8) {
        alert("최대 8자까지 입력가능합니다");
        return;
      } else {
        this.setState({
          isnicknameVaild: false,
        });
      }
    }

    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  clickAgree = (e) => {
    this.setState({
      agree: !this.state.agree,
    });
  };

  // 있는 닉네임인지 확인
  checkNickname = (e) => {
    //axios 호출
    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL}/user/dup_nickname?nickname=${e}`,
    })
      .then((res) => {
        console.log(res.data.isDuplicate);
        // 닉네임 있는 거면
        if (res.data.isDuplicate === true) {
          this.setState({
            isnicknameVaild: true,
          });
        }
        // 없는 거면
        else {
          this.setState({
            isnicknameVaild: false,
          });
        }
      })
      .catch((error) => {});
  };

  signupCheck = () => {
    const { history } = this.props;

    // 전문가 체크
    if (this.state.type === "stylist") {
      if (this.state.name === "") {
        alert("이름을 입력해주세요");
        return;
      } else {
        // 이름 형식 체크하기
        var name_pattern = /^[가-힣]{2,4}$/;
        if (this.state.name.match(name_pattern) != null) {
        } else {
          alert("이름 형식이 아닙니다");
          return;
        }
      }

      // 번호인증했는지 체크하기
      if (this.state.phone === "") {
        alert("번호를 인증해주세요");
        return;
      }
    }

    // nickname check
    if (this.state.nickname.length < 2) {
      alert("닉네임을 2자 이상입력해주세요");
      return;
    } else if (this.state.isnicknameVaild) {
      alert("중복된 닉네임입니다");
      return;
    }

    // age check
    if (this.state.age === "") {
      alert("나이를 입력해주세요");
      return;
    }

    // agree check
    if (!this.state.agree) {
      alert("전체동의는 필수입니다");
      return;
    }

    // axios 호출
    axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/user/signup`,
      data: {
        type: this.state.type,
        platform: this.state.platform,
        api_id: this.state.api_id,
        gender: this.state.gender,
        age: this.state.age,
        nickname: this.state.nickname,
        name: this.state.name,
        phone: this.state.phone
      },
    })
      // 회원 가입에 성공하면
      .then((res) => {
        alert("회원가입에 성공했습니다.");
        history.push({
          pathname: "/login",
        });
      })
      .catch((error) => {
        alert("회원가입에 실패했습니다.");
      });
  };

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
                <input
                  type="checkbox"
                  id="checkbox"
                  onChange={this.clickAgree}
                ></input>
              </div>
              <div className="col-11">
                <label htmlFor="checkbox">전체동의 (필수)</label>
                <div>핏미업 서비스 이용약관, 개인정보 수집 및 이용동의</div>
              </div>
            </div>
            {/* 전문가일때만 뜨게 */}
            {this.state.type === "stylist" && (
              <Certification
                setPhonenumber={this.setPhonenumber}
                setName={this.setName}
              />
            )}

            {/* 닉네임 입력 */}
            <div className="nickname">
              <input
                type="text"
                name="nickname"
                onChange={this.onChange}
                className="input_nickname"
                placeholder="닉네임을 입력해주세요 (2~8자)"
                value={this.state.nickname}
              ></input>
              {this.state.isnicknameVaild && (
                <p className="nickname_check">중복된 닉네임입니다</p>
              )}
            </div>
            <div className="additional_info">
              <select name="gender" onChange={this.onChange}>
                <option value="female" defaultValue>
                  여자
                </option>
                <option value="male">남자</option>
              </select>
              <input
                type="number"
                name="age"
                min="0"
                max="130"
                onChange={this.onChange}
                className="input_age"
                placeholder="나이"
                value={this.state.age}
              ></input>
            </div>
            <div className="complete_btn" onClick={this.signupCheck}>
              가입 완료
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SignupDetail;
