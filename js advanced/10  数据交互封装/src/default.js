export default {
    baseUrl: "",
    method: "get",
    headers: {
        common: {
            "X-Request-By": "XMLHttpRequest"
        },
        get: {},
        post: {},
        delete: {}
    },
    responseType: "json",
    transformRequest(data) {
        return data;
    },
    transformResponse(data) {
        return data;
    }
}