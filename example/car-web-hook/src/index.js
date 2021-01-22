import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './assert/css/responsiveslides.css';
import './assert/css/style.css';
import './assert/css/zerogrid.css';
import HttpContext, {value} from "./store/HttpContext";
import {Provider} from 'react-redux';
import store from './store';


ReactDOM.render(
    <React.StrictMode>
        <Router>
            {/*<HttpContext.Provider value={value}>*/}
            <Provider store={store}>
                <Route component={App}/>
            </Provider>

            {/*</HttpContext.Provider>*/}
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
