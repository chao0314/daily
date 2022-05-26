const http = require('http');
const queryString = require('querystring');
const mock = require('./data/index');

/*
*
* /api/list
*
* /api/detail/:id
*
*
* */


let server = http.createServer((req, res) => {
    let url = req.url;
    if (url.startsWith('/fav')) return;
    console.log(req.url, queryString.parse(req.url));
    let result = 'not found'

    if (url.startsWith('/api/list')) {


        result = mock.map(({id, name, img, frequency}) => {
                return {id, name, img, frequency}
            }
        )


    }
    if (url.startsWith('/api/detail/')) {

        let curID = url.split('/').pop();
        result = mock.find(({id}) => id === curID);


    }


    res.writeHead(200, {
        'Access-Control-Allow-Origin': "*",
        'Content-Type': "application/json"
    })
    res.end(JSON.stringify(result));


})

server.listen(8088, () => console.log('server port 8088'));