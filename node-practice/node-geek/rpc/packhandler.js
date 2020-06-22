const Handler = require('./handler');


class PackHandler extends Handler {

    constructor(options) {
        super(options);
        this.reqProto = options.reqProto;
        this.resProto = options.resProto;
        this.headerLength = Object.values(this.reqProto).reduce((pre, [, cur]) => Math.max(pre, cur), 0) + 1;
    }

    decode(buffer) {

        let header = buffer.slice(0, this.headerLength);
        let body = buffer.slice(this.headerLength);
        let start = 0, end = 0;
        let {seq, schemaName} = this.reqProto;
        [start, end] = seq;
        seq = header[this.mapMethod(end - start + 1)](start);
        [start, end] = schemaName;
        let schemaNameBuf = buffer.slice(start, end + 1);
        //slice ox00 ,buffer invalid padding data
        let index = schemaNameBuf.indexOf(0);
        if (index > 0) schemaNameBuf = schemaNameBuf.slice(0, index);
        schemaName =  schemaNameBuf.toString('utf8');
        body = this.schemas[schemaName].decode(body);

        return {
            seq,
            schemaName,
            body
        }

    }

    encode(data) {

        let {seq, schemaName, bodyLength} = this.resProto;
        let start = 0, end = 0;
        [start, end] = seq;
        let seqBuf = Buffer.alloc(end - start + 1);
        seqBuf[this.mapMethod(end - start + 1, 'write')](data.seq);
        [start, end] = schemaName;
        let schemaNameBuf = Buffer.alloc(end - start + 1);
        schemaNameBuf.write(data.schemaName, 0, 'utf8');
        let bodyBuf = this.schemas[data.schemaName].encode(data.body);
        [start, end] = bodyLength;
        let bodyLengthBuf = Buffer.alloc(end - start + 1);
        bodyLengthBuf[this.mapMethod(end - start + 1, 'write')](bodyBuf.length);
        return Buffer.concat([seqBuf, schemaNameBuf, bodyLengthBuf, bodyBuf]);

    }

    checkReceiveComplete(buffer) {
        if (buffer.length > this.headerLength) {
            let header = buffer.slice(0, this.headerLength);
            let [start, end] = this.reqProto.bodyLength;
            let bodyLength = header[this.mapMethod(end - start + 1)](start);
            let total = this.headerLength + bodyLength;
            if (buffer.length >= total) return total;
        }
        return -1;

    }
}

expors = module.exports = PackHandler;