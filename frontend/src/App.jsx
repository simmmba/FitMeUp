import React from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Main from "../src/components/Main/Main";
import ConsultRequire from "./components/ConsultRequire/ConsultRequire";
import Test from "./components/Supermarket/Test";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Main} exact />
          <Route path="/consult" component={ConsultRequire} />
          <Route path="/test" component={Test} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
