import React from "react";
import "./App.scss";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Main from "../src/components/Main/Main"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {/* 마식당 시작 메인 페이지 */}
          <Route path="/" component={Main} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
