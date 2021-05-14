const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const secret = '31415926';
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    // if (req.path !== '/login') {
    //     let token = req.headers.authorization;
    //     jwt.verify(token, secret, (err, decode) => {
    //             if (err) {
    //                 res.status = 403;
    //                 res.json({err: "token invalid"})
    //             } else {
    //                 next();
    //             }
    //         }
    //     )
    // } else {
    next();
    // }

});
app.use(bodyParser.json());
app.post('/login', (req, res) => {
    let {name, password} = req.body;
    if (name === 'admin' && password === '123456') {
        let token = jwt.sign({name}, secret, {expiresIn: '2h'});
        console.log(token);
        res.json({name, token})
    }
});

app.post('/verify', (req, res) => {
    const token = req.headers.authorization;
    console.log("verify token",token);
    jwt.verify(token, secret, (err, decode) => {
        if (err) {
            res.status = 403;
            res.json({err: "token invalid"})
        } else {
            let token = jwt.sign({name:"admin"}, secret, {expiresIn: '2h'});
            console.log("verify",token);
            res.json({token})
        }
    });

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
app.listen(3000, () => console.log("listen 3000"));
