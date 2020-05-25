const obj = require('./thrid');

function edit() {
    setTimeout(() => {
        obj.name = 'ohhh edit';
    }, 1000);

}

module.exports = edit;