const Banner = require('../model/banner');
const path = require('path');

async function find(filter = {}) {
    return Banner.aggregate([
        {$match: filter},
        {
            $project: {ID: '$_id', title: 1, sub_title: 1, image: 1, _id: 0}
        }]);

}

async function create({title = '', sub_title = '', image = []}) {
    let doc = {title, sub_title};
    if (image.length === 1) doc.image = path.parse(image[0].path).name;
    return await Banner.create(doc);
}

async function deleteOne(ID = '') {

    return await Banner.deleteOne({_id: ID})

}

async function updateOne(ID = '', {title = '', sub_title = '', image = []}) {

    let doc = {title, sub_title};
    if (image.length === 1) doc.image = path.parse(image[0].path).name;

    return await Banner.updateOne({_id: ID}, doc);
}

exports = module.exports = {
    find,
    create,
    deleteOne,
    updateOne

}