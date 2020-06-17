const fs = require('fs');
const vm = require('vm');
const path = require('path');

class Template {
    constructor(path) {
        this.baseDir = path;
        this.cache = {}
        // this.context = vm.createContext(this);

        this.context = vm.createContext({

            include: this.include.bind(this)

        })
    }

    include(filename, data) {
        let _render = this.cache[filename];
        if (_render === void 0) return this.render(filename, data);
        return _render(data);


    }

    render(filename, data = {}) {

        let _render = this.cache[filename];
        if (_render === void 0) {
            // let raw = fs.readFileSync(path.join(this.baseDir, filename));
            _render = vm.runInContext(`
             (function (data) {
                    with (data) {
                        return \`${fs.readFileSync(path.join(this.baseDir, filename))}\`;
                     }
  
                 })
                `, this.context);

            console.log(_render.toString());

            this.cache[filename] = _render;
        }

        return _render(data);

    }


}

exports = module.exports = Template;