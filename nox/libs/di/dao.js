const DI = require('./di');

class Dao extends DI {

    constructor() {
        if (new.target === Dao) throw new Error('template Class Dao');
        super(['model', 'dao']);
    }

    query() {
        throw new Error('abstract method');
    }

    insert() {
        throw new Error('abstract method');

    }

    update() {
        throw new Error('abstract method');

    }

    delete() {
        throw new Error('abstract method');

    }


}

exports = module.exports = Dao;



