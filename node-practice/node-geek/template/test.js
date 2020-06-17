const path = require('path');
const Template = require('./index');

let engine = new Template(path.resolve(__dirname, './tpl'));

let data = {hello: 'world', sub: 'this is sub'};

let res = engine.render('test.html', data);
console.log(res);


