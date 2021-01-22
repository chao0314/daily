const {store: {db: {uri, option}}} = require('../config');
const question = require('./question');
const md5 = require('../utils/md5');
const mongoose = require('mongoose');
mongoose.connect(uri, option).catch(err => console.log('mongoose', err));

let adminSchema = new mongoose.Schema({
    ID: String,
    username: String,
    password: String
}, {collection: "admin"})
let Admin = mongoose.model("admin", adminSchema);
question.start();

(async () => {

    while (true) {
        let username = await question.ask('输入注册管理员账号：');
        if (!username) break;
        let admin = Admin.find({username});
        if (admin.length > 0) console.log('该用户名已经注册');
        else {
            let first = await question.ask('请输入密码：');
            let second = await question.ask('请确认密码：');
            if (first !== second) console.log('密码不一致，创建失败');
            else {
                let password = md5(first);
                await Admin.create({username, password});
                console.log('创建成功');
            }

        }

    }

    question.close();

})()
