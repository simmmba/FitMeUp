import React from "react";
import "./Main.scss";

import Header from "../Common/Header";
import { NavLink } from "react-router-dom";

class Main extends React.Component {
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
        <Header></Header>
        <div className="Main">
          <div className="Main_">
            <NavLink to="/match">
              <div className="stylelist_btn">현재 상담 요청 내역</div>
            </NavLink>
          </div>
        </div>
      </>
    );
  }
}

export default Main;
