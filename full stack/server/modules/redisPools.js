const pools = {};
module.exports = {

    setPool(name, pool) {
        pools[name] = pool;
    },
    getPool(name) {
        return pools[name];
    }
};