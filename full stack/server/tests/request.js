const request = require('../utils/request');

request('https://cn.bing.com').then(res => {
    console.log("res",res)
}).catch(e => console.log(e));