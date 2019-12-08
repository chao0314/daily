const fs = require('fs');
const path = require('path');

let pinyinMap = new Map();
fs.readFileSync(path.resolve(__dirname, './pinyin.txt')).toString().split(/\r\n|\r|\n/).forEach(line => {
    let set = new Set();
    line = line.trim();
    if (line) {
        let aMatch = /（([\w\s]+)）/g.exec(line.slice(1));
        if (aMatch) {
            aMatch[1].trim().replace(/\d/g, '').split(' ').forEach(v => set.add(v));
            pinyinMap.set(line[0], Array.from(set));
        } else {
            console.log("---not----", line, "----", aMatch);
        }
    }

});

// console.log(pinyinMap.entries());

function word2pinyin(word) {
    let aResult = [];
    if

}
