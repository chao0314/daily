class Kvue {
    constructor(options) {
        this.$options = options;
        this._data = options.data;
        this.dep = new Dep();
        //劫持数据；
        this.observer(this._data, this.dep);
        this.compile(options.el);
    }

    observer(data, dep) {
        Object.keys(data).forEach(key => {
            let value = data[key];
            Object.defineProperty(data, key, {
                configurable: true,
                enumerable: true,
                get() {
                    console.log('get', key)
                    // if (Dep.target) {
                    //     dep.addSub(Dep.target);
                    // }
                    return value;
                },
                set(newValue) {
                    console.log("set", newValue);
                    if (newValue !== value)
                        value = newValue;
                    dep.notify(newValue);

                }
            })
        })

    }

    compile(el) {
        let element = document.querySelector(el);
        this.compileNode(element);
    }

    compileNode(element) {
        let childNodes = element.childNodes;
        // console.log(childNodes);
        Array.from(childNodes).forEach(node => {
            if (node.nodeType == 3) {
                //文本
                // console.log(node);
                let nodeContent = node.textContent;
                // console.log(nodeContent);
                let reg = /\{\{\s*(\S*)\s*\}\}/;
                if (reg.test(nodeContent)) {
                    // console.log("("+RegExp.$1+")");
                    node.textContent = this._data[RegExp.$1];
                    new Watcher(this, RegExp.$1, newValue => {
                        node.textContent = newValue;
                    });
                }
            } else if (node.nodeType == 1) {
                //标签
                let attrs = node.attributes;
                Array.from(attrs).forEach(attr => {
                    // console.log(attr);
                    let attrName = attr.name;
                    let attrValue = attr.value;
                    console.log(attrName);
                    if (attrName.indexOf("v-") == 0) {
                        attrName = attrName.substr(2);
                        console.log(attrName);
                        if (attrName == "model") {
                            node.value = this._data[attrValue];
                            node.addEventListener("input", e => {
                                console.log(e.target.value);
                                this._data[attrValue] = e.target.value;
                            })
                            new Watcher(this, attrValue, newValue => {
                                node.value = newValue;
                            });
                        }


                    }
                })

                if (node.childNodes.length > 0) {
                    this.compileNode(node);
                }
            }

        })
    }
}


class Dep {
    constructor() {
        this.subs = [];
    }

    addSub(sub) {
        this.subs.push(sub);
    }

    notify(newValue) {
        this.subs.forEach(v => {
            v.update(newValue);
        })
    }
}

class Watcher {
    constructor(vm, exp, cb) {
        // Dep.target = this;
        // vm._data[exp];
        vm.dep.addSub(this);
        this.cb = cb;
        // Dep.target = null
    }

    update(newValue) {
        console.log("更新了", newValue);
        this.cb(newValue);
    }
}