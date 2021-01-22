const Model = require('./model');

class MongoModel extends Model {
    constructor(name = new.target.name) {
        super()
        let mongoose = this.map('mongoose');
        let schema = new mongoose.Schema(this.schema(mongoose.Schema));
        let Target = new.target;
        //mount static method
        Reflect.ownKeys(Target)
            .filter(key => typeof Target[key] === 'function')
            .forEach(key => schema.static(key, Target[key]));
        //mount instance method
        Reflect.ownKeys(Reflect.getPrototypeOf(this))
            .filter(key => typeof this[key] === 'function' && key !== 'constructor' && key !== 'schema')
            .forEach(key => schema.method(key, this[key]));

        return mongoose.model(name, schema);


    }

    schema(Schema) {
        throw  new Error('abstract method');

    }


}

exports = module.exports = MongoModel;






