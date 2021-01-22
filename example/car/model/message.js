const mongoose = require('mongoose');


let messageSchema = new mongoose.Schema({
    ID: String,
    name: String,
    email: String,
    title: String,
    content: String,
    date: {type: Date, default: Date.now}
}, {collection: "message"})

exports = module.exports = mongoose.model("message", messageSchema);