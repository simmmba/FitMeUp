import React from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Main from "../src/components/Main/Main";
import ConsultRequire from "./components/ConsultRequire/ConsultRequire";
import Test from "./components/Supermarket/Test";
import Signup from "../src/components/User/Signup"
import SignupDetail from "../src/components/User/SignupDetail"
import Login from "../src/components/User/Login"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Main} exact />
          <Route path="/consult" component={ConsultRequire} />
          <Route path="/test" component={Test} />
          <Route path="/signup" component={Signup} exact />
          <Route path="/signup/detail" component={SignupDetail} exact />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
