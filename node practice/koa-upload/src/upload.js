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

        // ��post��ʵ�����ݱ� header �е� boundary=---- ������ -
        let boundary = '--' + ctx.req.headers['content-type'].split('=')[1];

        let contents = temp.split(boundary).slice(1, -1);
        console.log(contents)

        let fields = {};
        let files = {};
        contents.forEach(entry => {

            //http Э��涨 ���� \r\n ���з� Content-Disposition �� value
            let [header, ...body] = entry.split('\r\n\r\n');
            console.log("-h--", header.toString())

            let [, key, , filename] = header.toString().match(/name="(.+?)"(.+?filename="(.+?)")?/);

            console.log(key, filename);
            if (filename) {
                //��ֹ ͼƬ�� �������������� \r\n\r\n ���������й�body�����ã���ͨ fields ���ݲ���������������
                let body = entry.slice(header.length + '\r\n\r\n'.length, -2);//ĩβ��  \r\n ���� -2

            } else {

                fields[key] = Buffer.concat(body).toString().trim();

            }

        })
        console.log(fields);
        console.log(files);

    })


}

