const {getPool} = require('@/modules/databasePools');
const main = getPool('main');


async function getCatalog() {
    let result = [];
    let aQuery = [main.query(`SELECT 
    item.title AS item_title, item.href AS item_href,
    sub.position,sub.title AS sub_title, sub.href AS sub_href,sub.\`order\` AS sub_order
FROM
    catalog_item_table AS item
LEFT JOIN
    sub_catalog_table AS sub ON item.sub_catalog_ID = sub.ID
ORDER BY sub.position ASC , sub.order, item.\`order\` ASC;`),
        main.query(`SELECT 
        position,title,href 
FROM catalog_table 
ORDER bY position ASC, 'order' ASC;`)

    ];
    let [subCatalogAndItems, catalogs] = await Promise.all(aQuery);
    catalogs.forEach(({position, title, href}) => {
        if (result[position]) result[position].titles.push({title, href});
        else result[position] = {
            titles: [{title, href}],
            children: []
        }

    });

    subCatalogAndItems.forEach(({position, sub_order, sub_title, sub_href, item_title, item_href}) => {
        if (result[position].children[sub_order])
            result[position].children[sub_order].children.push({item_title, item_href});
        else
            result[position].children[sub_order] = {
                sub_title,
                sub_href,
                children: [{item_title, item_href}]
            }

    });
    // console.dir(subCatalogAndItems, {depth: null});

    return result;


}

module.exports = {
    getCatalog
};