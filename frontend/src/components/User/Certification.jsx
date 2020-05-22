import React from "react";
import "./Certification.scss";
import axios from "axios";

import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

// 이름하고 폰 번호 받기
class Certification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      send: false,
      code: "",
      phone: "",
      name: "",
    };
  }

  componentDidMount() {
    // 예전에 본인인증한적 있으면 취소
    this.props.signOut();

    // 본인인증
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      }
    );
  }

  // 번호 보내는 칸
  onClick = () => {
    var phone_pattern = /(01[016789])(\d{4})\d{4}$/g;
    if (this.state.phone.match(phone_pattern) != null) {
      // 이미 등록되어있는 번호인지 확인
      axios({
        method: "get",
        url: `${process.env.REACT_APP_URL}/user/dup_phone?phone=${this.state.phone}`,
      }).then((res) => {
        // 이미 있는 번호면
        if (res.data.isDuplicate === true) {
          alert("이미 등록되어 있는 번호입니다.");
          this.onReset();
        } else {
          const phoneNumber = "+82" + this.state.phone;
          const appVerifier = window.recaptchaVerifier;
          firebase
            .auth()
            .signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmResult) => {
              // success
              window.confirmationResult = confirmResult;
              this.setState({
                send: true,
              });
            })
            .catch((error) => {
              // error
              if (error.code === "auth/too-many-requests") {
                alert(
                  "하루 최대 5번의 인증번호 전송이 가능합니다.\n내일 다시 시도해주세요"
                );
              } else {
                alert(
                  "인증번호 전송에 실패했습니다.\n잠시후 다시 시도해주세요"
                );
              }
            });
        }
      });
    } else {
      alert("핸드폰 번호 형식이 아닙니다");
    }
  };

  // 코드 받아오기
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onChangeName = (e) => {
    this.props.setName(e.target.value);
  };

  // 코드가 같은지 확인
  onCheck = () => {
    window.confirmationResult
      .confirm(this.state.code)
      .then((result) => {
        alert("인증이 완료되었습니다");
        this.props.setPhonenumber(this.state.phone);
      })
      .catch(function (error) {
        alert("잘못된 인증번호입니다.");
      });
  };

  // 본인인증 다시 하기
  onReset = () => {
    this.props.signOut();
    this.setState({
      send: false,
      code: "",
    });
    this.props.setPhonenumber("");
  };

  render() {
    const { user } = this.props;
    return (
      <div className="Certification">
        {/* 이름 입력 */}
        <input
          type="text"
          name="name"
          onChange={this.onChangeName}
          className="input_name"
          placeholder="이름을 입력해주세요"
        ></input>

        {/* 번호 입력 */}
        <div className="phone">
          {user ? (
            <>
              {/* 인증이 완료된 경우 */}
              <input
                type="text"
                className="input_phone"
                name="phone"
                value={this.state.phone}
                disabled
              ></input>
              <input onClick={this.onReset} className="button" value="취소" />
            </>
          ) : (
            <>
              <input
                type="text"
                className="input_phone"
                name="phone"
                onChange={this.onChange}
                value={this.state.phone}
                placeholder="번호을 입력해주세요"
              ></input>
              <input
                id="recaptcha-container"
                type="button"
                onClick={this.onClick}
                className="button"
                value="전송"
              />
            </>
          )}
        </div>
        {this.state.send && (
          <div className="phone">
            {!user && (
              <>
                {/* 문자로 온 번호 입력 */}
                <input
                  type="number"
                  placeholder="인증번호를 입력해주세요"
                  min="0"
                  max="999999"
                  className="input_phone"
                  name="code"
                  value={this.state.code}
                  onChange={this.onChange}
                ></input>
                <input
                  type="button"
                  className="button"
                  onClick={this.onCheck}
                  value="확인"
                />
              </>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(Certification);

//https://medium.com/firebase-developers/how-to-setup-firebase-authentication-with-react-in-5-minutes-maybe-10-bb8bb53e8834
//https://firebase.google.com/docs/auth/web/phone-auth
//https://stackoverflow.com/questions/51512893/firebase-phone-auth-react-js
