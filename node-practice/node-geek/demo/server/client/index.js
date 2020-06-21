const fs = require('fs');
const path = require('path');
const protoBuf = require('protocol-buffers');
const schemas = protoBuf(fs.readFileSync(path.join(__dirname, './detail.proto')));
const PackHandler = require('../../../rpc/packhandler');
const RpcClient = require('../../../rpc-client');

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
exports = module.exports = new RpcClient({host: '127.0.0.1', port: 8090, handler});
