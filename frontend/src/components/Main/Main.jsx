import React from "react";
import "./Main.scss";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
    };
  }

  componentDidMount() {
    // 로그인 확인하기
    if (window.sessionStorage.getItem("user")) {
      this.setState({
        login: true,
      });
    }
  }

  render() {
    return (
      <div className="Main">
        <div>로그인하기</div>
        <div>회원가입하기</div>
      </div>
    );
  }
}

export default Home;
