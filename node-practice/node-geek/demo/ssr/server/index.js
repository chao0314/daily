//��ʱ���� ���ܣ����� ����webpack Ԥ���� jsx
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


