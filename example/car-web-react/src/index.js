import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assert/css/bootstrap.css';
import './assert/css/dialog.css';
import './assert/css/test.css';
// import $Alert from "./components/common/$Alert";
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import store from './store';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <Route component={App}/>
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
