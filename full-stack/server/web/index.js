import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from "./components/index/App";
import HeaderSearch from "./components/common/HeaderSearch";

//browser side
if (typeof window !== "undefined") {
    window.App = App;
    window.HeaderSearch = HeaderSearch;
}
//server side
export function render(appData) {
    return ReactDOMServer.renderToString(<App {...appData}/>);
}
