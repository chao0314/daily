const crypto = require('crypto');
const secret = 'hello world';

// const SHA256 =

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

        let [header, payload, signed] = token.split('.');


    }


    static toBase64(payload) {
        return Buffer.from(JSON.stringify(payload)).toString('base64');

    }

    static toBase64Url(payload) {

        return this.toBase64(payload).replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '');

    }

    static createAlg(name, secret) {

        // todo some other alg

        return new SHA256(secret);
    }


}


class SHA256 {

    constructor(secret) {
        this.secret = secret;
        this.instance = crypto.createHmac('sha256', secret);
    }

    encode(data) {

        return this.instance.update(data).digest('base64');
    }

    decode(data) {


    }


}


exports = module.exports = Jwt;
