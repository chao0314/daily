const DI = require('./di');

class Service extends DI {

    constructor() {
        if (new.target === Service) throw new Error('template Class Service');
        super(['dao', 'service']);
    }


}

exports = module.exports = Service;



