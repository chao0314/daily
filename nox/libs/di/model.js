const DI = require('./di');

class Model extends DI {

    constructor() {
        if (new.target === Model) throw new Error('template Class Model');
        super(['store', 'model']);
    }


}

exports = module.exports = Model;



