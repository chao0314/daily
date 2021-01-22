const Controller = require('@/controller');

class Login extends Controller {
    constructor() {
        super();
        this.loginService = this.map('login');
    }

    async login({name, password}) {

        return await this.loginService.login({name, password})


    }


}

exports = module.exports = new Login();