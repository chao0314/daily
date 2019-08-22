const express = require('express');

const app = express();
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});
app.get('/roles-route', (req, res) => {
    res.json({
       routes: [
            {
                pid: -1,
                name: '购物车',
                id: 1,
                path: 'cart',
            },
            {
                pid: 1,
                name: '购物车列表',
                id: 2,
                path: 'list',
            },
            {
                pid: 2,
                name: '彩票',
                id: 3,
                path: 'lottery',
            },
            {
                pid: 2,
                name: '商品',
                id: 4,
                path: 'product',
            },
        ],
    });
});
app.listen(3000,()=>console.log("listen 3000"));
