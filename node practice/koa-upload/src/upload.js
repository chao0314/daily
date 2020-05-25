/*
*
 ------WebKitFormBoundaryIY4Im7RfUJnQ9chJ
Content-Disposition: form-data; name="name"

aaa
------WebKitFormBoundaryIY4Im7RfUJnQ9chJ
Content-Disposition: form-data; name="age"

www
-----WebKitFormBoundaryIY4Im7RfUJnQ9chJ
Content-Disposition: form-data; name="title"; filename="uml.jpg"

bytes.....
------WebKitFormBoundaryIY4Im7RfUJnQ9chJ--
*
* */


//'content-type': 'multipart/form-data; boundary=----WebKitFormBoundarygIIA9PZJ6DqKUG4S'

const fs = require('fs');
const uuid = require('uuid');

exports = module.exports = async (ctx, next) => {


    Buffer.prototype.split = function (sep) {
        if (typeof sep === 'string') sep = Buffer.from(sep);
        let len = sep.length;
        let arr = [];
        let offset = 0;
        let index = -1;
        while ((index = this.indexOf(sep, offset)) !== -1) {

            arr.push(this.slice(offset, index));
            offset = index + len;

        }
        arr.push(this.slice(offset));
        return arr;

    }

    const req = ctx.req;
    let buffer = [];
    req.on('data', chunk => {
        buffer.push(chunk);

    })

    req.on('end', chunk => {
        if (chunk && chunk.length > 0) buffer.push(chunk);
        let temp = Buffer.concat(buffer);

        // 与post中实际数据比 header 中的 boundary=---- 少两个 -
        let boundary = '--' + ctx.req.headers['content-type'].split('=')[1];

        let contents = temp.split(boundary).slice(1, -1);
        console.log(contents)

        let fields = {};
        let files = {};
        contents.forEach(entry => {

            //http 协议规定 两个 \r\n 来切分 Content-Disposition 和 value
            let [header, ...body] = entry.split('\r\n\r\n');
            console.log("-h--", header.toString())

            let [, key, , filename] = header.toString().match(/name="(.+?)"(.+?filename="(.+?)")?/);

            console.log(key, filename);
            if (filename) {
                //防止 图片等 二进制数据内有 \r\n\r\n 所以上面切过body不能用，普通 fields 数据不会出现这种情况。
                let body = entry.slice(header.length + '\r\n\r\n'.length, -2);//末尾有  \r\n 所以 -2

            } else {

                fields[key] = Buffer.concat(body).toString().trim();

            }

        })
        console.log(fields);
        console.log(files);

    })


}

