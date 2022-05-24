const n = 12345678;
console.log(n.toLocaleString())
const reg = /\d{1,3}(?=(\d{3})+$)/g;

console.log(`${n}`.replace(reg, '$&,'));