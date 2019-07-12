import proxy from "./proxy";
import {domParser} from "./parser"

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
