const DI = require('./di');

class Router extends DI {

    constructor() {
        if (new.target === Router) throw new Error('template Class Router');
        super(['controller']);
    }

}

exports = module.exports = Router;



