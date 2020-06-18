const fs = require('fs');
const path = require('path');
const Server = require('../rpc-server');
const Router = require('../rpc-server/router');
const protobuf = require('protocol-buffers');
const schemas = protobuf(fs.readdirSync(path.join(__dirname, './detail.proto')));
const PackHandler = require('../rpc-server/packhandler');
const reqProto = {
    seq: [0, 3],
    schemaName: [4, 19],
    bodyLength: [20, 23]
}

const resProto = {
    seq: [0, 3],
    schemaName: [4, 19],
    bodyLength: [20, 23]
}

let handler = new PackHandler(schemas);
let router = new Router();

let server = new Server({handler, reqProto, resProto})