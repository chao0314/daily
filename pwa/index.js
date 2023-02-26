const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const webpush = require('web-push');
const app = express();
let list = require('./data.json');

// workbox 工具库 简化使用 pwa
// workbox ->workbox-webpack-plugin
//pwa 需要运行在 https  或 localhost

const vapidKeys = {
    publicKey: 'BKn9WZWSFKaRlWfxwg32xV5M_IYr_nUFRQnS8tb_fR_1X1Ga_xP2TGfObHtKZzDeVBSJfoNasD_-N5qnYyg5enc',
    privateKey: 'bmsKpg6rE-K-LgU_DAIPynBdD8AK8hal8IMfYo3IyVc'
}
const subs = [];
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, 'public')))
app.get('/api/list', (req, res) => {
    let start = Math.floor(Math.random() * (list.length - 20));
    res.json(list.slice(start, start + 20));
});
app.post('/add-sub', (req, res) => {
    subs.push(req.body);
    res.json({data: 'ok'})
});
webpush.setVapidDetails(
    'mailto:125301689@qq.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
app.get('/server-push', (req, res) => {
    subs.forEach(sub => webpush.sendNotification(sub, JSON.stringify('hello service worker')));
    res.end();
});
app.listen(3001, () => {
    console.log(`pwa server port:3000`)
});