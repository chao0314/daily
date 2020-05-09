const fs = require('fs');
const EventEmitter = require('events');

class WriteStream extends EventEmitter {
    constructor(path, options = {}) {
        super();
        if (!path) throw new Error('need path');
        this._path = path;
        this._autoClose = options.autoClose || true;
        this._highWaterMark = options.highWaterMark || 2;
        this._flags = options.flags || 'w';
        this._allowWaterMark = true;
        this._inputSize = 0;
        this._fd = void 0;
        this._cache = new LinkList();
        this._flowing = false;
        this._position = 0;
        this._end = false;
        this._open(this._path, this._flags);


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

    _destroy(error) {
        if (error) this.emit('error', error);
        if (this._autoClose && this._fd) fs.close(this._fd, () => {
            this._fd = void 0;
            this.emit('close');
        });

    }

    destroy() {
        this._destroy();
    }


    write(chunk, callback) {
        if (this._end) throw  new Error('stream has been closed');
        if (this._fd === void 0) this.once('open', () => this.write(chunk, callback));
        else {
            let buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
            this._inputSize += buffer.length;
            if (this._allowWaterMark) this._allowWaterMark = this._highWaterMark >= this._inputSize;
            if (this._flowing) this._cache.append({buffer, callback});
            else this._write(this._fd, buffer, callback)

        }

        return this._allowWaterMark;


    }

    end(chunk, callback) {
        if (this._end) return;
        this.write(chunk, callback);
        this._end = true;

    }


    _clearCache() {
        let cache = this._cache.unshift();
        if (cache) {
            let {buffer, callback} = cache;
            this.write(buffer, callback);
        } else {
            if (!this._allowWaterMark) {
                this._allowWaterMark = true;
                this.emit('drain');
            }

            if (this._end) {
                this.emit('finish');
                this._destroy();

            }
        }


    }

    _write(fd, buffer, callback) {

        this._flowing = true;
        fs.write(fd, buffer, 0, buffer.length, this._position, (err, bytesWritten) => {
            if (err) {
                this._destroy(err);
            } else {
                this._flowing = false;
                this._inputSize -= bytesWritten;
                this._position += bytesWritten;
                callback instanceof Function && callback();
                this._clearCache();

            }
        });

    }


}

//用链表代替数组 防止数据量太大 数组移动性能太低 数组塌陷
class LinkList {

    constructor() {
        this._header = null;
        this._footer = null;
        this.length = 0;
    }

    append(element) {
        let node = new Node(element);
        if (this._header === null) {
            this._header = node;
            this._footer = node;
        } else {
            this._footer.next = node;
        }

        this.length++;

    }

    unshift() {
        if (this.length === 0) return null;
        let header = this._header;
        this._header = header.next;
        this.length--;
        return header.element;

    }
}

class Node {

    constructor(element) {
        this.element = element;
        this.next = null;
    }
}


exports = module.exports = WriteStream;