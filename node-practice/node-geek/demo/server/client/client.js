const fs = require('fs');
const path = require('path');
const protobuf = require('protocol-buffers');
const schemas = protobuf(fs.readdirSync(path.join(__dirname, './detail.proto')));
const PackHandler = require('../../../rpc/packhandler');
const mockData = require('../../mockdata/column');

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