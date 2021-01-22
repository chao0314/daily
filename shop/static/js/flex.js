document.addEventListener('DOMContentLoaded', function () {
    var $ = document.querySelector.bind(document);
    var width = document.documentElement.clientWidth;
    $('html').style.fontSize = 100 * Number(width) / 375 + 'px';
    // console.log(width,$('html').style.fontSize)
});