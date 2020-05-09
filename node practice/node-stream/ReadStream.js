const fs = require('fs');
const EventEmitter = require('events');

class ReadStream extends EventEmitter {
    constructor(path, options = {}) {
        super();
        if (!path) throw new Error('need path');
        this._path = path;
        this._flags = options.flags || 'r';
        this._start = options.start || 0;
        this._offset = this._start;
        this._autoClose = options.autoClose || true;
        this._highWaterMark = options.highWaterMark || 4;
        this._flowing = true;
        this._fd = void 0;
        this._open(this._path, this._flags);
        this.on('newListener', (type) => {
            if (type === 'data') this._read(this._fd);
        })

    }

    _open(path, flags, callback) {

        fs.open(path, flags, (err, fd) => {
            if (err) this._destroy(err);
            else {
                this._fd = fd;
                this.emit('open', fd);
            }
            callback instanceof Function && callback(err, fd);
        })


    }

    _read(fd) {
        if (fd === void 0) this.once('open', fd => this._read(fd));
        else {
            let buffer = Buffer.alloc(this._highWaterMark);
            fs.read(fd, buffer, 0, this._highWaterMark, this._offset, (err, bytesRead) => {
                if (err) this._destroy(err);
                else {
                    if (bytesRead > 0) {
                        this.emit('data', buffer.slice(0, bytesRead));
                        this._offset += bytesRead;
                        if (this._flowing) this._read(fd);
                    } else {
                        this.emit('end');
                        this._destroy();
                    }
                }


            })


        }
    }

    _destroy(error) {
        if (error) this.emit('error', error);
        if (this._autoClose && this._fd) fs.close(this._fd, () => this.emit('close'));

    }

    pause() {
        this._flowing = false;
    }

    resume() {
        this._flowing = true;
        this._read(this._fd);
    }

    pipe(ws) {
        this.on('data', chunk => {
            let allow = ws.write(chunk);
            if (!allow) {
                this.pause();
                ws.once('drain', () => {
                    this.resume();
                })
            }

        });

        this.on('end', () => ws.end(''));

    }


}

exports = module.exports = ReadStream;