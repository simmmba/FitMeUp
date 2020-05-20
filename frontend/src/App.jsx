import React from "react";
import "./App.scss";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Main from "../src/components/Main/Main"
import Signup from "../src/components/User/Signup"
import SignupDetail from "../src/components/User/SignupDetail"
import Login from "../src/components/User/Login"
import Matching from "../src/components/Matching/Matching"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {/* 마식당 시작 메인 페이지 */}
          <Route path="/" component={Main} exact />
          <Route path="/signup" component={Signup} exact />
          <Route path="/signup/detail" component={SignupDetail} exact />
          <Route path="/login" component={Login} />
          <Route path="/match" component={Matching} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
