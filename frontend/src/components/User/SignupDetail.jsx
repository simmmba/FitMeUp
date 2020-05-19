import React from "react";
import "./User.scss";

import Header from "../Common/Header";

import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

class SignupDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      code: "",
      age: 30,
      gender: "여자",
      nickname: "",
      isnicknameVaild: true,
      provider: "",
      api_id: "",
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
        provider: location.state.provider,
        api_id: location.state.api_id,
      });
    }

    // 본인인증
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      }
    );
  }

  onClick() {
    const phoneNumber = "+8201079396800";
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmResult) => {
        // success
        window.confirmationResult = confirmResult;
        console.log(confirmResult);
      })
      .catch((error) => {
        // error
        console.log(error);
      });
  }

  onCheck = () => {
    window.confirmationResult
      .confirm(this.state.code)
      .then(function (result) {
        console.log(result);
      })
      .catch(function (error) {
      });
  };

  onChange = (e) => {
    this.setState({
      code: e.target.value,
    });
  };

  render() {
    const { user, signOut } = this.props;
    console.log(this.props.user && user.providerData[0]);
    return (
      <>
        <Header></Header>
        <div className="User">
          <div className="SignupDetail">
            <div className="title">회원가입</div>
            {user ? (
              <button onClick={signOut}>Sign out</button>
            ) : (
              <input
                id="recaptcha-container"
                type="button"
                onClick={this.onClick}
                value="클릭"
              />
            )}
            <input value={this.state.code} onChange={this.onChange}></input>
            <input type="button" onClick={this.onCheck} value="확인" />
            <div className="complete_btn">가입 완료</div>
          </div>
        </div>
      </>
    );
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(SignupDetail);

//https://medium.com/firebase-developers/how-to-setup-firebase-authentication-with-react-in-5-minutes-maybe-10-bb8bb53e8834
//https://firebase.google.com/docs/auth/web/phone-auth
//https://stackoverflow.com/questions/51512893/firebase-phone-auth-react-js
