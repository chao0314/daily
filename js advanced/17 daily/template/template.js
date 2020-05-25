const fs = require('fs').promises;


/**
 echo('<ul>');
 for(let i=0; i < data.supplies.length; i++) {
    echo('<li>');
    echo(data.supplies[i]);
    echo('</li>');
};
 echo('</ul>');
 **/


async function render(path, data) {


    let exprValue = /<%=(.+?)%>/g;
    let express = /<%([\s\S]+?)%>/g;//要匹配换行符所以不能用 .
    let raw = await fs.readFile(path, 'utf8');


    let content = raw.replace(exprValue, function (match, $1) {
        return '`); \r\n echo(' + $1 + '); \r\n echo(`';
    }).replace(express, function (match, $1) {
        return '`); \r\n ' + $1 + ' \r\n echo(`'
    });

    let template = 'let html = ""; \r\n with(data){ \r\n echo(`' + content + '`); \r\n }; \r\n return html; \r\n function echo(tpl){html += tpl};';


    let compile = new Function('data', `${template}`);

    return compile(data);


}

render('./template.html', {name: 'hello world'}).then(data => {

    fs.writeFile('./test.html', data);


}).catch(e => console.log(e));


