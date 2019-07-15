import proxy from "./proxy";
import {domParser} from "./parser"
import {exp} from "./expression";

let p = {
    a: 1,
    arr: [1, 2, 3],
    b: {
        c: 123
    }
};

window.ppp = proxy(p, function (prop) {
    console.log(prop, "变了");
});

let oDiv = document.getElementById("root");

console.log(domParser(oDiv));
let s = "'sss---'+a+arr[1]+b.c+ new Date()";

console.log(exp(s, p));