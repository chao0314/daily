import parseHtml from "./parseHtml";

const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g //文本节点的内容 注意  g 模式
/*
* initRender.js
* _c('div', {id: 'app', style: {color: 'red'}}, _t('hello'), _c('span', {}, _t('world')));
*
* _c(tagName,props,...children) 创建元素 ,props 包括但不限于 attrs
*
* _t(text) 创建文本节点 text:hello {{name}} world => "hello" + name + "world"
*
* _s(obj)  用于文档输出对象信息， let obj = {name:"hello"} , tpl 直接输出{{obj}} 为 [object object], need JSON.stringify()
*
* */


export default function compileToFunction(template) {

    let root = parseHtml(template);
    // console.log(root);
    if (root && root.type === 1) {

        let codeStr = genCode(root);
        let renderStr = `with(this){return ${codeStr}}`;
        return new Function(renderStr);

    } else throw new Error('need root element or template error');

}

function genCode(node) {

    if (node.type === 1) {
        //element node
        let {tagName, attrs, children} = node;
        let props = genProps(attrs);
        // console.log(props);
        children = genChildren(children);
        return `_c(${JSON.stringify(tagName)},${JSON.stringify(props)},${children.join(',')})`;


    } else if (node.type === 3) {
        // text node    hello {{name}} world => "hello" + name + "world"
        let {text: rawText} = node;
        let fragment = [];
        let textMatch;
        let lastIndex = defaultTagRE.lastIndex = 0;
        // console.log('rawText', rawText);
        while ((textMatch = defaultTagRE.exec(rawText)) !== null) {
            let {index} = textMatch;
            fragment.push(JSON.stringify(rawText.slice(lastIndex, index)), `_s(${textMatch[1]})`);
            lastIndex = defaultTagRE.lastIndex;

        }
        fragment.push(JSON.stringify(rawText.slice(lastIndex)));

        return `_t(${fragment.join('+')})`;


    }


}

function genProps(attrs = [{}]) {
    let props = {};

    attrs.forEach(({key, value}) => {

        if (key === 'style') {
            props.style = {};
            let entries = value.split(';');
            entries.forEach(entry => {
                let [key, value] = entry.split(':');
                props.style[key] = value;
            })
        } else {

            props[key] = value;
        }
    })

    return props;

}

function genChildren(children = [{}]) {

    return children.map(child => genCode(child));

}
