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
            console.log("--pinyin--not--match--", line);
        }
    }

});

// console.log(pinyinMap.entries());
console.log("pinyin init");

function word2pinyin(word) {
    let aResult = [];
    word = word.trim();
    if (word) {
        let aPinyin = pinyinMap.get(word[0]);
        let aPinyin2 = word2pinyin(word.slice(1));
        if (!aPinyin) aPinyin = [word[0]];
        if (aPinyin2.length > 0) {
            aPinyin.forEach(pinyin => {
                aPinyin2.forEach(pinyin2 => {
                    aResult.push(`${pinyin}${pinyin2}`);
                })
            });
        } else {
            aResult = aPinyin;
        }

    }
    return aResult;
}


module.exports = word2pinyin;
