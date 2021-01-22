const Car = require('../model/car');
const path = require('path');

async function find(filter = {}, page = 1, size = 10, project, option) {
    page = Number(page);
    size = Number(size);
    //todo sort...
    let docs = await Car.find(filter, project, option).skip((page - 1) * size).limit(size);

    return docs.map(doc => {

        let {_id: ID, title, price, features, images, description} = doc;

        features = features.split(',').map(entry => {

            let [key, value] = entry.split('|');
            return {key, value};
        });

        images = images.split(',');

        return {ID, title, price, features, images, description};

    })


}

async function findByID(ID) {

    return find({_id: ID});

}

async function rowCount() {
    return (await Car.aggregate([
        {$group: {_id: null, count: {$sum: 1}}},
        {$project: {_id: 0}}

    ]))[0] || {count:0};

}

async function create(data) {

    let doc = handleUploadData(data);
    return await Car.create(doc);


}

async function deleteOne(ID = '') {

    return await Car.deleteOne({_id: ID});

}

async function updateOne(ID = '', data = {}) {

    let doc = handleUploadData(data);
    return await Car.updateOne({_id: ID}, doc);
}

function handleUploadData(data) {

    let {title = '', price = '', featureKey = [], featureValue = [], description = '', images = []} = data;
    if (typeof featureKey === 'string') featureKey = [featureKey];
    if (typeof featureValue === 'string') featureValue = [featureValue];
    let features = [];
    for (let i = 0; i < featureKey.length; i++) {
        features.push(`${featureKey[i]}|${featureValue[i] || ''}`);
    }
    features = features.join(',');
    images = images.map(img => path.parse(img.path).base).join(',');
    return {title, price, features, description, images}
}


exports = module.exports = {
    find,
    create,
    deleteOne,
    updateOne,
    rowCount,
    findByID

}