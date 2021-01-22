const path = require('path');
const fsp = require('fs').promises;

async function traversal(pathname, routepath) {
    let result = [];
    let route = void 0;
    let files = await fsp.readdir(pathname, {withFileTypes: true});
    for (let file of files) {
        if (file.name.startsWith('_')) continue;
        let filepath = path.join(pathname, file.name);
        if(routepath)  route = path.join(routepath, path.parse(file.name).name);
        if (file.isDirectory()) {

            let childFiles = await traversal(filepath, route);
            result = result.concat(childFiles);
        } else {

            if (routepath) filepath = {route, filepath}
            result.push(filepath);
        }

    }


    return result;
}


exports = module.exports = {
    traversal
}


// (async function () {
//
//     let result = await traversal(path.resolve(__dirname, "../app/router"), "/");
//     console.log(result)
//     result.forEach(item => {
//         console.log(item.route.replace(/\//, '/'))
//     })
//
// })()
