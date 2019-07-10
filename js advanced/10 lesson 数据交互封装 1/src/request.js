export default function (options) {
    let {method, url, data, responseType, headers} = options;
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.responseType = responseType;

    for (let prop in headers) {
        if (headers.hasOwnProperty(prop)) {
            xhr.setRequestHeader(encodeURIComponent(prop), encodeURIComponent(headers[prop]));
        }
    }

    xhr.send(data);
    return new Promise(function (resolve, reject) {
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if ((this.status >= 200 && this.status < 300) || this.status === 304) {
                    resolve(xhr);
                } else {
                    reject(xhr);
                }
            }
        };
    })

}


