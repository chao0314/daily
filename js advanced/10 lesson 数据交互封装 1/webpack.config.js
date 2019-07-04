const path = require("path");
module.exports = function (env = {}) {
    const {dev} = env;
    return {
        mode:dev?"development":"production",
        entry: path.resolve(__dirname,"src/index.js"),
        output: {

        }
    }
};