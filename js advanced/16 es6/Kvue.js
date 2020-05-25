class Kvue extends EventTarget{
    constructor(options){
        super();
        this.options = options;
        this.compile();
        this.observer(this.options.data);
    }
    observer(data){
        Object.keys(data).forEach(key=>{
            this.defineReact(data,key,data[key]);
        })
    }
    defineReact(data,key,value){
        let _this = this;
        Object.defineProperty(data,key,{
            configurable:true,
            enumerable:true,
            get(){
                return value;
            },
            set(newValue){
                console.log("set...");
                // let event = new Event(key);
                let event = new CustomEvent(key,{
                    detail:newValue
                });
                _this.dispatchEvent(event);
                value = newValue;
            }
        })
    }
    compile(){
        let eles = document.querySelector(this.options.el);
        let childNodes = eles.childNodes;
        this.compileNodes(childNodes);
    }
    compileNodes(childNodes){
        childNodes.forEach(node=>{
            // console.log(node)
            if(node.nodeType==1){
                // console.log("节点");
                let attrs = node.attributes;
                console.log(attrs);
                [...attrs].forEach(attr=>{
                    let attrName = attr.name;
                    let attrValue = attr.value;
                    // console.log(attrName,attrValue);
                    attrName = attrName.substr(2);
                    if(attrName==="html"){
                        node.innerHTML = this.options.data[attrValue]; 
                    }else if (attrName==="model"){
                        node.value = this.options.data[attrValue];
                        node.addEventListener("input",e=>{
                            // console.log(e.target.value);
                            this.options.data[attrValue] = e.target.value;
                        })
                    }
                })
                if(node.childNodes.length>0){
                    this.compileNodes(node.childNodes);
                }
            }else if(node.nodeType==3){
                // console.log("文本");
                let reg = /\{\{\s*(\S+)\s*\}\}/g;
                let textContent = node.textContent;
                // console.log(textContent)
                let test = reg.test(textContent);
                if(test){
                    // 初次渲染；
                    let $1 = RegExp.$1;
                    // console.log($1)
                    // node.textContent = this.options.data[$1];
                    node.textContent = textContent.replace(reg,this.options.data[$1]);
                    //更新渲染视图；
                    this.addEventListener($1,e=>{
                        console.log("设置了值；",e.detail);
                        let newValue = e.detail;
                        let oldValue = this.options.data[$1];
                        let reg = new RegExp(oldValue,"g");
                        node.textContent = node.textContent.replace(reg,newValue);
                    })
                }
            }
        })
    }



}