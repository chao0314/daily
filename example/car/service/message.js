const Message = require('../model/message');

async function find(filter = {}, page = 1, size = 10) {
    page = Number(page);
    size = Number(size);
    return Message.aggregate([
        {$match: filter},
        {$sort: {date: -1}},
        {$skip: (page - 1) * size},
        {$limit: size},
        {
            $project: {
                ID: '$_id',
                _id: 0,
                name: 1,
                email: 1,
                title: 1,
                content: 1,
                date: 1
            }
        }])
}

async function deleteOne(ID = '') {

    return Message.deleteOne({_id: ID});

}

async function deleteMany(IDs = []) {

    return Message.deleteMany({_id: {$in: IDs}});
}


async function create(doc) {

    return Message.create(doc);


}

async function rowCount() {

    return (await Message.aggregate([{
        $count: 'count'
    }]))[0] || {count: 0};

}

exports = module.exports = {
    find,
    create,
    deleteOne,
    deleteMany,
    rowCount
}