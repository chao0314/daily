module.exports = function (date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let d = date.getDate();
    let h = date.getHours();
    let m = date.getMinutes();

    return `${year}${month > 9 ? month : '0' + month}${d > 9 ? d : '0' + d}${h > 9 ? h : '0' + h}${m > 9 ? m : '0' + m}`;

};