const DI = require('./di');

class Controller extends DI {

    constructor() {
        if (new.target === Controller) throw new Error('template Class Controller');
        super(['service','controller']);
    }


}

exports = module.exports = Controller;



