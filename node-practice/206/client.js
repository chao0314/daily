const http = require('http');
const fs = require('fs');
const path = require('path');
const url = 'http://localhost:8090'
const file = path.resolve(__dirname, './download.txt');
let fd = fs.openSync(file, 'a');
let flowing = true;

let step = 5;
let total = 0;
let init = {
    start: 0,
    end: 4
}

// 0 4
// 5 9
// 10 14

process.stdin.on('data', chunk => {
    console.log('stdin ----', chunk.toString());
    if (chunk.toString().includes('p')) {
        flowing = false;
    } else if (!flowing) {
        flowing = true;
        console.log('resume', init.start, init.end);
        download(url, init);
    }

})


function download(url, init) {
    let {start, end} = init;
    http.get(url, {headers: {Range: `bytes=${start}-${end}`}}, res => {
        if (!total) total = res.headers['content-range'].split('/')[1];
        res.on('data', chunk => {
            console.log('---data---', chunk, chunk.length);
            if (chunk.length > 0) fs.write(fd, chunk, 0, chunk.length, start, () => {
                init.start += step;
                init.end += step;

                if (chunk.length === step && flowing) {

                    sleep(1000);
                    download(url, init);
                } else if (chunk.length < step) fs.close(fd, (err) => {
                    if (err) console.log(err)
                    else console.log('download over');
                });
            });

        })

    })

}

download(url, init);


function sleep(time) {

    let start = Date.now();
    while (time > Date.now() - start) {
    }

}

