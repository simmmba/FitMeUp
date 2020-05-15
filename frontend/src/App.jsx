import React from 'react';
import './App.scss';

import {BrowserRouter, Switch, Redirect, Route} from 'react-router-dom';


function App() {
    return (
        <div className="App">
            프로젝트 시작합시다!
            <BrowserRouter>
                <Switch>
                    {/*<Route></Route>*/}
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
