const fs = require('fs');
const Events = require('events');
const CR = Buffer.from('0D', 'hex'); //\r
const LF = Buffer.from('0A', 'hex'); //\n

class LineReader extends Events {
    constructor(path) {
        super();
        this._data = [];
        this._path = path;
        this._rs = null;
        this.on('newListener', (event, listener) => {
            if (event === 'line' && this._rs === null) {
                this._rs = fs.createReadStream(this._path);
                this._rs.on('readable', () => {
                    let buffer;
                    while ((buffer = this._rs.read(1)) !== null) {

                        if (buffer.compare(CR) === 0 || buffer.compare(LF) === 0) {
                            if (this._data.length > 0) {
                                this.emit('line', Buffer.from(this._data));
                                this._data.length = 0;
                            }
                        } else {
                            this._data.push(buffer[0]);
                        }
                    }

                });
                this._rs.on('end', () => {
                    if (this._data.length > 0) {
                        this.emit('line', Buffer.from(this._data));
                    }
                    this.emit('end');
                })
            }
        })
    }


}

let reader = new LineReader('./data.txt');
reader.on('line', function (buffer) {
    console.log('line', buffer.toString());
});
reader.on('end', function () {
    console.log('end');
});
