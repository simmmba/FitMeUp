import React from "react";
import "./User.scss";
import axios from "axios";

import { NavLink } from "react-router-dom";

import GoogleLogin from "react-google-login";
import KakaoLogin from "react-kakao-login";
import Header from "../Common/Header";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      api_id: "",
      platform: "",
    };
  }

  componentDidMount() {
    // 로그인 확인하기
    const { history } = this.props;

    // 만약 로그인을 했으면
    if (window.sessionStorage.getItem("user")) {
      alert("로그아웃 후 진행해주세요");
      history.goBack("");
    }

  }

  // 유저 타입 지정 - general, stylelist
  changeType = (e) => {
    this.setState({
      user_type: e.target.id,
    });
  };

  // 회원 가입 되어있는 건지 확인
  checkId = () => {
    const { history } = this.props;

    //axios 호출
    axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/user/login`,
      data : {
        platform:this.state.platform,
        api_id:this.state.api_id
      }
    })
      // 로그인 안되있는 거면
      .then((res) => {

        if(res.data.result === "Success"){
          window.sessionStorage.setItem("user", JSON.stringify(res.data.user));
          history.push("/");
          return;
        }
        if(res.data.detail === "user not found"){
          alert("회원가입이 안된 유저입니다.");
        }

      })
      .catch((error) => {

          alert("로그인 실패했습니다.");
        
      });
  };

  // Google Login
  responseGoogle = (res) => {
    this.setState({
      api_id: res.googleId,
      platform: "google",
    });

    // 토큰 삭제
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then();
    auth2.disconnect();

    this.checkId();
  };

  // Kakao Login
  responseKakao = (res) => {
    //console.log(res);
    this.setState({
      api_id: res.profile.id,
      platform: "kakao",
    });

    // 토큰 삭제
    window.Kakao.API.request({
      url: "/v1/user/unlink",
    });
    // window.Kakao.Auth.logout();
    this.checkId();
  };

  // Login Fail
  responseFail = (err) => {
    console.error(err);
  };

  render() {
    return (
      <>
        <Header></Header>
        <div className="User">
          <div className="Login">
            <div className="title">로그인</div>

            {/* 간편 로그인 버튼 선택 */}
            <div>
              <GoogleLogin
                id="google"
                className="easy_login"
                clientId={process.env.REACT_APP_GOOGLE}
                buttonText="Google"
                icon=""
                onSuccess={this.responseGoogle}
                onFailure={this.responseFail}
                cookiePolicy={"single_host_origin"}
              />
            </div>
            <div>
              <KakaoLogin
                id="kakao"
                className="easy_login"
                jsKey={process.env.REACT_APP_KAKAO}
                buttonText="Kakao"
                onSuccess={this.responseKakao}
                onFailure={this.responseFail}
                getProfile="true"
              />
            </div>
            {/* login으로 가기 */}
            <div className="changeForm">
              아직 계정이 없나요? <NavLink to="/signup">회원가입</NavLink>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Signup;
