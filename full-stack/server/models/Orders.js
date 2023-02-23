const film = require('./OrdersFilm');
const group = require('./OrdersGroup');

const map = {film, group, '0': group, '2': film};

async function getByID(ID, type) {

    return await map[type].getByID(ID);
}

async function insert(goods, type) {
    return await map[type].insert(goods);
}

async function search(keyword, type) {
    return await map[type].search(keyword);

}

async function queryInID(ID, type) {
    console.log(ID, type);
    return await map[type].queryInID(ID);

}

module.exports = {getByID, insert, search, queryInID};