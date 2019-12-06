import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from "./components/App";

//browser side
if (typeof window !== "undefined") {
    window.App = App;
}

//server side
export function render(appData) {
    return ReactDOMServer.renderToString(<App {...appData}/>);
}
