const crypto = require('crypto');


class Jwt {
    constructor(options = {}) {
        //...
        this.algName = options.algName || 'sha256';
        //if()  create lag; todo
        this.secret = options.secret || 'hello world';
        this.algInsatnce = Jwt.createAlg(this.algName, this.secret);

    }

    sign(payload) {

        let header = Jwt.toBase64Url({typ: 'JWT', alg: this.algName});

        payload = Jwt.toBase64Url(payload);

        let signed = this.algInsatnce.encode([header, payload].join("."))

        return [header, payload, signed].join('.');

    }

    verify(token) {

        if (this.algInsatnce.verify(token)) {

            let [, payload] = token.split('.');

            return JSON.parse(Jwt.decodeBase64Url(payload));


        }


    }


    static toBase64(payload) {
        return Buffer.from(JSON.stringify(payload)).toString('base64');

    }

    static toBase64Url(payload) {

        return this.toBase64(payload).replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '');

    }

    static decodeBase64Url(payload) {
        //base64  3*8 =>4*6(高位补零) 体积扩大1/3。原数据不足3字节时补=，解码时以4字节为单元。
        payload += new Array(5 - payload.length % 4);

        return Buffer.from(payload, 'base64').toString();

    }


    static createAlg(name, secret) {

        // todo some other alg

        return new SHA256(secret);
    }


}


class SHA256 {

    constructor(secret) {
        this.secret = secret;
    }

    encode(data) {

        return crypto.createHmac('sha256', this.secret).update(data).digest('base64');
    }

    // decode(signed, data) {
    //
    //     return this.encode(data) === signed;
    //
    // }

    verify(data) {

        let [header, payload, signed] = data.split('.');
        console.log('sign',signed,this.encode([header,payload].join(".")))
        return this.encode([header, payload].join('.')) === signed;
    }


}


exports = module.exports = Jwt;
