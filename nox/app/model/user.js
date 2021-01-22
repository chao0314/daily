const Mongo = require('@/mongo');


class User extends Mongo {
    constructor() {
        super('User');

    }

    schema(Schema) {

        return {
            name: String,
            age: Number,
            gender: String,
            password: String
        }

    }

    action(){

        console.log("model method this is " ,this);
    }


}

exports = module.exports = new User();






