//即时编译 性能？？？ 可以webpack 预编译 jsx
const register = require('babel-register');
register({
    presets: ['react']
});
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const App = require('./app.jsx');

exports = module.exports = function (props) {
    return ReactDOMServer.renderToString(React.createElement(App, props));
}


