import React, {} from 'react';
import ReactDOMServer from 'react-dom/server';
import App from "./components/App";

//server side

if (typeof window !== "undefined") {
    window.App = App;
}

export function render() {
    return ReactDOMServer.renderToString(<App/>);
}
