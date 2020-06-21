class Handler {
    constructor({schemas}) {
        if (new.target === Handler) throw new Error('abstract class');
        this.map = {
            8: 'UInt64BE',
            4: 'UInt32BE',
            2: 'UInt16BE',
            1: 'UInt8'
        };
        this.schemas = schemas;
    }

    encode() {
    };

    decode() {
    };

    checkReceiveComplete() {
    };

    mapMethod(length, prefix = 'read') {
        return `${prefix}${this.map[Number(length)]}`;

    }

}

exports = module.exports = Handler;