import {assert} from "./utils";

const key = ["new", "class", "for", "if"];

export function exp(str, data) {
    let arr = parser(str).map(item => {
            if (typeof item === "string") return JSON.stringify(item);
            else {
                return item.exp.replace(/(?<![\.\$\w])[\$_a-z][\$\w]*/ig, s => {
                    if ((s in window || key.includes(s)) && !data[s]) return s;
                    return `data.${s}`
                })


            }
        }
    );
    console.log(arr);
    return eval(arr.join(""));

}

function parser(str) {
    let start = str.search(/(?<!\\)['"]/);
    let chars, flag, end = start + 1, result = [];
    if (start === -1) return [{exp: str}];
    else {
        chars = str[start];
        while (start !== -1 && end < str.length) {
            flag = true;
            if (str[end] === chars && !/\\/.test(str[end - 1])) {
                flag = false;
                result.push({exp: str.slice(0, start)});
                result.push(str.slice(start + 1, end));
                str = str.slice(end + 1);
                start = str.search(/(?<!\\)['"]/);
                chars = str[start];
                end = start + 1;
            } else {
                end++;
            }

        }
        if (flag) assert(false, "invalid string");
        result.push({exp: str.slice(end)});
        return result;
    }


}
