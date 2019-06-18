class VText extends VNode{
    constructor(dom,context){
        assert(context instanceof Component);
        super(dom);
        this._context = context;
        this._value = dom.nodeValue.trim();
    }

    render(){
        console.log("text node render");
    }
}