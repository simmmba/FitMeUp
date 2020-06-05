import React from "react";
import { inject, observer} from 'mobx-react'
import "./Header.scss";

import { NavLink, withRouter } from "react-router-dom";

@inject((stores) => ({
  reset: stores.search.reset,
  clearRoom: stores.chatting.clearRoom
}))
@observer
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
    const { clearRoom } = this.props.chatting
    const { history } = this.props;
    alert("로그아웃 되었습니다");
    clearRoom();
    window.sessionStorage.clear();
    history.push("/");
    window.location.reload();
  };

  render() {
    const { reset } = this.props;

    return (
      <>
        <div className="Header">
          <div className="row">
            <div className="col-2 logo">
              <NavLink to="/">Fit Me Up</NavLink>
            </div>
            <div className="col-7">
              <NavLink to="/myconsult" className="header_menu" activeClassName="activeMenu">
                내 상담
              </NavLink>
              <NavLink to="/chatting" className="header_menu" activeClassName="activeMenu">
                채팅
              </NavLink>
              <NavLink
                to="/search"
                className="header_menu"
                activeClassName="activeMenu"
                onClick={() => {
                  if (this.props.location.pathname === "/search") {
                    window.location.reload(false);
                  }
                  reset();
                }}
              >
                스타일리스트 찾기
              </NavLink>
            </div>
            <div className="col-3 header_user">
              {this.user ? (
                <>
                  <NavLink to="/mypage" activeClassName="activeMenu">
                    마이페이지
                  </NavLink>
                  <span onClick={this.logout}>로그아웃</span>
                </>
              ) : (
                <>
                  <NavLink to="/signup">회원가입</NavLink>
                  <NavLink to="/login">로그인</NavLink>
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

export default withRouter(Header);
