import {assert} from "./utils";

export function exp(str, data) {


}

function parser(str) {
    let start = str.indexOf(/['"]/);
    let chars, flag, end, result = [];
    if (start === -1) return [{exp: str}];
    else {
        chars = str[start];
        flag = true;
        end = start + 1;
        while (start !== -1 && end < str.length) {
            if (str[end] === chars && !/\\/.test(str[end - 1])) {
                flag = false;
                result.push({exp: str.slice(0, start)});
                result.push(str.slice(start, end));
                str = str.slice(end + 1);
                start = str.indexOf(/["']/);
            }
            end++;

        }
    }


}