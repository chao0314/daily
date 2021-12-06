import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, Switch, Link, matchPath } from 'react-router-dom';

import { createBrowserHistory } from 'history';


import * as Sentry from "@sentry/react";
import {Integrations} from "@sentry/tracing";

import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

const history = createBrowserHistory();

const routes = [{path: '/about'}, {path: '/user/:id'}, {path: '/'}];

const App = () => {
    function fn() {
        console.log(window.a.b);
    }

    return (
        <Router history={history}>
            <>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/user/1">User1</Link>
                        </li>
                        <li>
                            <Link to="/user/2">User2</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/about" children={
                        () => <div>about</div>
                    }/>
                    <Route path="/user/:id" children={
                        () => <div>user</div>
                    }/>
                    <Route exact path="/" children={
                        () => <button onClick={fn}>Break the world</button>
                    }/>
                </Switch>
            </>
        </Router>
    );
}

Sentry.init({
    dsn: "http://c42de55cc64e46fe9824fa1c71b1e081@192.168.183.160:9000/2",
    integrations: [new Integrations.BrowserTracing({
        routingInstrumentation: Sentry.reactRouterV5Instrumentation(history, routes, matchPath),
    })],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    release: '0.0.1'
});

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
