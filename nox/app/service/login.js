const Service = require('@/service');

class Login extends Service {
    constructor() {
        super();
        this.userDao = this.map('user');
    }

    async login({name, password}) {

        let result = await this.userDao.query({name, password});
        return result.length === 1;

    }
}

exports =  module.exports =  new Login();