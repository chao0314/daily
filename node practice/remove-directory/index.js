const fsp = require('fs').promises;
const pathLib = require('path');

async function depthTraversal(path) {
    let oStats = await fsp.stat(path);
    if (oStats.isDirectory()) {
        let files = (await fsp.readdir(path)).map(file => depthTraversal(pathLib.join(path, file)));
        await Promise.all(files);
        await fsp.rmdir(path);
    } else {
        await fsp.unlink(path);
    }

}

function breadthTraversal(path) {

    

}

console.log('------------test------------------');

depthTraversal('./1').then(() => console.log('directory have been removed'));


