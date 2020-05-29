import React from "react";
import "./Header.scss";

import { NavLink } from "react-router-dom";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      code: "",
    };
  }

  user = JSON.parse(window.sessionStorage.getItem("user"));

  render() {
    return (
      <>
        <div className="Header">
          <div className="row">
            <div className="col-3 logo">
              <NavLink to="/">Fit Me Up</NavLink>
            </div>
            <div className="col-2">
              <NavLink to="/portfolio/write">내 상담</NavLink>
            </div>
            <div className="col-2">
              <NavLink to="/portfolio/4">채팅</NavLink>
            </div>
            <div className="col-2">
              <NavLink to="/portfolio/write">내 상담</NavLink>
            </div>
            <div className="col-3 header_user">
              {this.user ? (
                <NavLink to="/mypage">마이페이지</NavLink>
              ) : (
                <>
                  <NavLink to="/login">로그인</NavLink>
                  <NavLink to="/signup">회원가입</NavLink>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="header_margin"></div>
      </>
    );
  }
}

export default Header;
