const mongoose = require( 'mongoose');


let adminSchema = new mongoose.Schema({
    ID: String,
    username: String,
    password: String
}, {collection: "admin"})

exports = module.exports = mongoose.model("admin", adminSchema);