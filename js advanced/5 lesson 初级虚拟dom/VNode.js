class VNode {
    constructor(dom){
        assert(new.target === VNode);
        assert(dom instanceof Node);
        this._dom = dom;
    }
    render(){
        assert(false);
    }
}