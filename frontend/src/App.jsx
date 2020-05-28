import React from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Main from "../src/components/Main/Main";
import ConsultRequire from "./components/ConsultRequire/ConsultRequire";
import Test from "./components/Supermarket/Test";
import Signup from "../src/components/User/Signup";
import SignupDetail from "../src/components/User/SignupDetail";
import Login from "../src/components/User/Login";
import Matching from "../src/components/Matching/Matching";
import ConsultDetail from "../src/components/Common/ConsultDetail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Main} exact />
          <Route path="/consult" component={ConsultRequire} exact />
          <Route path="/test" component={Test} />
          <Route path="/signup" component={Signup} exact />
          <Route path="/signup/detail" component={SignupDetail} exact />
          <Route path="/login" component={Login} />
          <Route path="/match" component={Matching} />
          <Route path="/consult/detail" component={ConsultDetail} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
