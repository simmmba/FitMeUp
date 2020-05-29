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

  render() {
    return (
      <>
        <div className="Header">
          <div className="row">
            <div className="col-3 logo">
              <NavLink to="/">Fit Me Up</NavLink>
            </div>
            <div className="col-6">
              <NavLink to="/match" className="header_menu" activeClassName="activeMenu">
                내 상담
              </NavLink>
              <NavLink to="/stylist" className="header_menu" activeClassName="activeMenu">
                스타일리스트
              </NavLink>
            </div>
            <div className="col-3 header_user">
              <NavLink to="/login" activeClassName="activeMenu">
                로그인
              </NavLink>
              <NavLink to="/signup" activeClassName="activeMenu">
                회원가입
              </NavLink>
            </div>
          </div>
        </div>
        <div className="header_margin"></div>
      </>
    );
  }
}

export default Header;
