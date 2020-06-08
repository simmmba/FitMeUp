import React from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Main from "../src/components/Main/Main";
import ConsultRequire from "./components/ConsultRequire/ConsultRequire";
import Signup from "../src/components/User/Signup";
import SignupDetail from "../src/components/User/SignupDetail";
import Login from "../src/components/User/Login";
import Matching from "../src/components/Matching/Matching";
import ConsultDetail from "../src/components/Common/ConsultDetail";
import PortfolioDetail from "../src/components/Portfolio/PortfolioDetail";
import PortfolioWrite from "../src/components/Portfolio/PortfolioWrite";
import Chatting from "./components/Chatting/Chatting";
import MyPageMain from "./components/MyPage/MyPageMain";
import MyConsult from "./components/MyConsult/MyConsult";
import Search from "./components/Search/Search";
import MyConsultDetail from "./components/MyConsult/MyConsultDetail"
import PortfolioUpdate from "./components/Portfolio/PortfolioUpdate"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Main} exact />
          <Route path="/consult" component={ConsultRequire} exact />
          <Route path="/signup" component={Signup} exact />
          <Route path="/signup/detail" component={SignupDetail} exact />
          <Route path="/login" component={Login} />
          <Route path="/match" component={Matching} />
          <Route path="/consult/detail/:consultNo" component={ConsultDetail} />
          <Route path="/portfolio/write" component={PortfolioWrite} exact />
          <Route path="/portfolio/update" component={PortfolioUpdate} exact />
          <Route path="/portfolio/detail/:portfolioNo" component={PortfolioDetail} exact />
          <Route path="/chatting" component={Chatting} />
          <Route path="/mypage" component={MyPageMain} />
          <Route path="/myconsult" component={MyConsult} exact/>
          <Route path="/search" component={Search} />
          <Route path="/myconsult/detail" component={MyConsultDetail}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
