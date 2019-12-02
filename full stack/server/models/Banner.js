const {getPool} = require('@/modules/databasePools');
const main = getPool('main');

async function getBanner() {

    let aData = await main.query(`SELECT * FROM meituan.banner_table as bt ORDER BY bt.position, bt.order;`);
    let banners = [];
    let sliders = [];

    aData.forEach(v => {
        v.img = `/files/${v.img}`;
        if (v.position === 1) sliders.push(v);
        else banners.push(v);
    });

    return {banners, sliders};

}

module.exports = {
    getBanner
};