const mongoose = require('mongoose');

let bannerSchema = new mongoose.Schema({
    ID: String,
    title: String,
    sub_title: String,
    image: String
}, {collection: "banner"})

exports = module.exports = mongoose.model("banner", bannerSchema);