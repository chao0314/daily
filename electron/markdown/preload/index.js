const marked = require('marked');

window.addEventListener('message', e => {

    const data = e.data;

    if (data.channel === 'raw-text') rawTextToHtml(data.value)


})


function rawTextToHtml(rawText) {

    const html = marked(rawText);

    window.postMessage({
        channel: "to-html",
        value: html

    }, "*")


}