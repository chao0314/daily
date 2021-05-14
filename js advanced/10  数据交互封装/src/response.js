import {assert} from "./util";

export default function (xhr) {
    assert(xhr instanceof XMLHttpRequest);
    return {
        success: true,
        data: xhr.response,
        status: xhr.status,
        headers: getHeaders(xhr),
        xhr
    }
}

function getHeaders(xhr) {
    let headers = xhr.getAllResponseHeaders().split("\r\n").filter(header => header);
    headers = headers.reduce(function (init, v) {
        let [key, value] = v.split(": ");
        init[key] = value;
        return init;
    }, {});
    return headers;
}