const http = require('http');
const cache = [];

let server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': "text/plain"})
    res.end('hello child process');
    for (i = 0; i < 1000000; i++) {

        cache.push({name: "hello memory"});
    }
    // sleep(100000);

})

server.listen(8080, () => console.log('child process running'));


function sleep(time) {

    let start = Date.now()
    while (Date.now() - time < start) {
    }

}