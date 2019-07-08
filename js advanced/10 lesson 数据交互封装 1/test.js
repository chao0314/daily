import Axios from "./src/index";

Axios.defaults.baseUrl = "http://localhost:8088";
Axios.get({
    url: "data/data.json"
});
Axios({
    url: "data/data.json",

});