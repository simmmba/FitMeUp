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

  // 로그아웃 시 페이지 메인으로 이동
  logout = () => {
    alert("로그아웃 되었습니다");
    window.sessionStorage.clear();
    window.location.reload();
  }

  render() {
    return (
      <>
        <div className="Header">
          <div className="row">
            <div className="col-2 logo">
              <NavLink to="/">Fit Me Up</NavLink>
            </div>
            <div className="col-7">
              <NavLink to="/portfolio/write" className="header_menu" activeClassName="activeMenu">
                내 상담
              </NavLink>
              <NavLink to="/chatting" className="header_menu" activeClassName="activeMenu">
                채팅
              </NavLink>
              <NavLink to="/stylist" className="header_menu" activeClassName="activeMenu">
                스타일리스트
              </NavLink>
              <NavLink to="/consult/detail" className="header_menu" activeClassName="activeMenu">
                상담 상세
              </NavLink>
            </div>
            <div className="col-3 header_user">
              {this.user ? (
                <>
                <span onClick={this.logout}>로그아웃</span>
                <NavLink to="/mypage">마이페이지</NavLink>
                </>
                
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
