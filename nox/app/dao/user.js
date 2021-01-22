const Dao = require('@/dao');

class User extends Dao {
    constructor() {
        super();
        this.User = this.map('user');
    }

    async query({name, password}) {


        return await this.User.find({name, password});

    }


}


exports = module.exports = new User();