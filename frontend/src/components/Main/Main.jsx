import React from "react";
import "./Main.scss";

import Header from "../Common/Header"

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      code: "",
    };
  }

  render() {
    return (
      <div className="Main">
        <Header></Header>
        adasd
      </div>
    );
  }
}

export default Home;
