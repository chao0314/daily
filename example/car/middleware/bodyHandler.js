const body = require('koa-better-body');
const convert = require('koa-convert');
const {uploadDir} = require('../config');
const fsp = require('fs').promises;

exports = module.exports = {

    handleUrlencoded(option = {}) {

        let def = {
            multipart: false,
            onerror: (error, ctx) => {
                if (error) {
                    console.log(error)
                    ctx.status = 406;
                    ctx.body = 'Not Acceptable';
                }

            }
        };
        option = Object.assign({}, def, option);
        return convert(body(option));

    },

    handleMultipart(option = {}) {
        let def = {
            uploadDir,
            keepExtensions: true,
            maxFileSize: 10 * 1024 * 1024,
            onerror: (error, ctx) => {
                console.log('handleMultipart',error)
                if (error) {
                    ctx.status = 413;
                    ctx.body = 'Payload Too Large';
                }

            }

        };

        option = Object.assign({}, def, option);

        return convert.compose(body(option), async (ctx, next) => {

            console.log('fields', ctx.request.fields);
            console.log('--------------------------');
            // console.log('files', ctx.request.files);
            let entries = Object.entries(ctx.request.fields);
            let unlinks = [];
            entries.forEach(([key, value]) => {
                if (Array.isArray(value) && value[0]['path']) {
                    value = value.map(({size, path}) => {
                        if (size === 0) {
                            unlinks.push(fsp.unlink(path))
                            return null;
                        }
                        return value;
                    }).filter(v => v);

                    if (value.length === 0) delete ctx.request.fields[key];

                }


            })


            try {
                await Promise.all(unlinks);
            } catch (e) {
                console.log('unlink error', e);

            }

            console.log('fields', ctx.request.fields);
            await next();

        })

    }


}


