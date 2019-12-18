import React from 'react';
import ReactDOM from 'react-dom';

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import * as serviceWorker from './serviceWorker';

import {BrowserRouter as Router, Route} from "react-router-dom";
import State from './store/index';
import App from "./App";
moment.locale('zh-cn');

ReactDOM.render(
    <State>
        <Router>
            <Route component={App}>
            </Route>
        </Router>
    </State>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
