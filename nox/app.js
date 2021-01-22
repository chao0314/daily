const Application = require('@/libs/application');
const mongoose = require('mongoose');
const redis = require('redis');
//mongodb://super:*****@192.168.183.150:28017/?authSource=admin&replicaSet=rs0&readPreference=primary&appname=MongoDB%20Compass&ssl=false
//readPreference=secondaryPreferred
// let readUri = 'mongodb://reader:reader123@192.168.183.150:28017,192.168.183.151:28018,192.168.183.152:28019/test?authSource=admin&replicaSet=rs0';
let uri = 'mongodb://writer:writer123@192.168.183.150:28017,192.168.183.151:28018,192.168.183.152:28019/test';
let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: 'admin',
    replicaSet: 'rs0',
    readPreference: 'secondaryPreferred',
    w: 'majority',
    wtimeout: 15000,
    readConcern: {level: 'majority'},
    j: true
}
mongoose.connect(uri, options)

let app = new Application();

app.store({mongoose})

app.before(async (ctx, next) => {
    console.warn(ctx.url);
    console.log('---------before middleware-------');
    await next()

})
app.use(async (ctx, next) => {

    console.log('---------normal middleware-------');
    await next()

})

app.after(async (ctx, next) => {
    console.log('------------after middleware-------');

    ctx.body = "nothing found"
})
app.error((e, ctx) => {
    console.log(e);

    ctx.body = 'server interval error';
})

app.listen(8080, () => {
    console.log("server 8080");
})
exports = module.exports = app;


