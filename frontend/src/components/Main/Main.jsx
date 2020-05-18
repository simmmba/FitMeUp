import React from "react";
import "./Main.scss";

import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      code:""
    };
  }

  componentDidMount() {
    // 로그인 확인하기
    if (window.sessionStorage.getItem("user")) {
      this.setState({
        login: true,
      });
    }

    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container",
    {
       size:"invisible"
        // other options
    });
  }

  onClick() {
    const phoneNumber = "+8201079396800";
    const appVerifier = window.recaptchaVerifier;
    firebase
    .auth()
    .signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(confirmResult => {
      // success
      window.confirmationResult  = confirmResult;
      console.log(confirmResult)
    })
    .catch(error => {
      // error
      console.log(error)
    });
  }

  onCheck = () => {
    window.confirmationResult.confirm(this.state.code).then(function (result) {
      // User signed in successfully.
      // var user = result.user;
      console.log(result)
      // ...
    }).catch(function (error) {
      // User couldn't sign in (bad verification code?)
      // ...
    });
  }

  onChange = (e) => {
    this.setState({
      code:e.target.value
    })
  }


  render() {
    const { user, signOut, signInWithGoogle } = this.props;
    console.log(this.props.user && user.providerData[0]);
    return (
      <div className="Main">
        <div>로그인하기</div>
        <div>회원가입하기</div>
        {user ? (
          <button onClick={signOut}>Sign out</button>
        ) : (
          <input
            id="recaptcha-container"
            type="button"
            onClick={this.onClick}
            value="클릭"
          />
          
          // <button onClick={signInWithGoogle}>Sign in with Google</button>
        )}
        <input value={this.state.code} onChange={this.onChange}></input>
        <input
            type="button"
            onClick={this.onCheck}
            value="확인"
          />
      </div>
    );
  }
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(Home);

//https://medium.com/firebase-developers/how-to-setup-firebase-authentication-with-react-in-5-minutes-maybe-10-bb8bb53e8834
//https://firebase.google.com/docs/auth/web/phone-auth
//https://stackoverflow.com/questions/51512893/firebase-phone-auth-react-js
