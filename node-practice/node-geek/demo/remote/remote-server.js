const fs = require('fs');
const path = require('path');
const Server = require('../../rpc-server');
const Router = require('../../rpc-server/router');
const protoBuf = require('protocol-buffers');
const schemas = protoBuf(fs.readFileSync(path.join(__dirname, './detail.proto')));
const PackHandler = require('../../rpc/packhandler');
const mockData = require('../mockdata/column');
const reqProto = {
    seq: [0, 3],
    schemaName: [4, 19],
    bodyLength: [20, 23]
};

const resProto = {
    seq: [0, 3],
    schemaName: [4, 19],
    bodyLength: [20, 23]
};


let handler = new PackHandler({schemas, reqProto, resProto});

let router = new Router();

router.use('ColumnRequest', (req, ctx) => {

    console.log('ColumnRequest----', req);

    let data = {
        schemaName: 'ColumnResponse',
        body: {
            column: mockData[0],
            recommendColumns: mockData.slice(1)
        }
    };
    ctx.send(data);


});


let server = new Server({handler});

server.use(router.routes());
server.listen(8090, () => {
    console.log('rpc server port : 8090');
});


