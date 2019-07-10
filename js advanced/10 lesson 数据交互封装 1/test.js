import Axios from "./src/index";

Axios.defaults.baseUrl = "http://localhost:8088";
Axios.get({
    url: "data/data.json",
    params: {
        a: 1,
        b: 2
    }
}).then(res => console.log("get---", res));
Axios({
    url: "data/data.json",
    method: "get"
}).then(res => console.log("get-all---", res));


let other = Axios.create();
other.get({
    url: "http://localhost:8088/data/other.json",
    headers: {
        "content-type": "json"
    },
    data: {a: 1, b: 2},
    transformRequest(data) {
        console.log("transformRequest", data);
        return data
    },
    transformResponse(data) {
        console.log("transformResponse", data);
        return data
    }
}).then(res => console.log("other-get---", res));

other.interceptos.request.use(function (config) {
    console.log("request interceptor", config);
    return config;
});
other.interceptos.response.use(function (response) {
    console.log("response interceptors", response);
    return response;
}, function (e) {
    console.log("error interceptors", e);
    return Promise.reject(e);
});

//todo test error
let other2 = Axios.create();
other2.post({
    url: "http://localhost:8088/data/other.json",
    headers: {
        "content-type": "json"
    },
    data: {a: 1, b: 2},
    transformRequest(data) {
        console.log("transformRequest", data);
        return data
    },
    transformResponse(data) {
        console.log("transformResponse", data);
        return data
    }
}).then(res => console.log("other-get---", res));

other2.interceptos.request.use(function (config) {
    console.log("request interceptor", config);
    return config;
});
other2.interceptos.response.use(function (response) {
    console.log("response interceptors", response);
    return response;
}, function (e) {
    console.log("error interceptors", e);
    return Promise.reject(e);
});