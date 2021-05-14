class VText extends VNode {
    constructor(dom, context) {
        assert(context instanceof Component);
        super(dom);
        this._context = context;
        this._value = dom.nodeValue.trim();
    }

    render() {
        console.log("text node render", this);
        let n = 0;
        while (this._value.indexOf("{{", n) !== -1) {
            let stack = ["{", "{"];
            let sFlag, dFlag, end;
            let v = this._value;
            for (let i = n + 2; i < v.length; i++) {
                if (/\}/.test(v[i]) && !sFlag && !dFlag) {
                    stack.pop();
                } else if (/\{/.test(v[i]) && !sFlag && !dFlag) {
                    stack.push(v[i]);
                } else if (/\'/.test(v[i]) && !dFlag) {
                    sFlag = !sFlag;
                } else if (/\"/.test(v[i]) && !sFlag) {
                    dFlag = !dFlag;
                }

                if (stack.length === 0) {
                    end = i + 1;
                    break;
                }

            }
            assert(stack.length === 0, `${v} invalid`);
            console.log(v.slice(n, end));
            n = end;
        }
    }
}