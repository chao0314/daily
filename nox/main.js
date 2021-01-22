require('module-alias/register');
const Installer = require("@/libs/installer");
const app = require('./app.js');
(async () => {
    const installer = new Installer(app);
    await installer.install();
    app.start();
})()

