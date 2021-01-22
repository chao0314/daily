const mongoose = require('mongoose');


let carSchema = new mongoose.Schema({
    ID: String,
    title: String,
    price: String,
    features: String,
    description: String,
    images: String
}, {collection: "car"})

exports = module.exports = mongoose.model("car", carSchema);