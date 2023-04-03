import {Error} from "mongoose/lib/browser";

const template = `<div id="123" v-show="display" :name="name">
    <p>p1</p>
    <p>p2</p>
</div>`


const Type = {
    ROOT: 'root',
    TEXT: 'text',
    ELEMENT: 'element',
    COMMENT: 'comment',
    ATTRIBUTE: 'attribute'
}

// parse template to  AST (template AST)
export function parse(tplStr) {

    const context = {

        source: tplStr,

        advanceBy(num) {
            //消除指定长度字符串
            context.source = context.source.slice(num);

        },
        advanceSpaces() {
            // 消除空格字符串
            const regExp = /^\s+/;
            const source = context.source;
            const match = regExp.exec(source);

            if (match) context.source = source.slice(match[0].length);


        }


    }

    const nodes = parseChildren(context, []);

    return {

        type: Type.ROOT,

        children: nodes

    }


}


function parseAttributes(context) {
    const {advanceBy, advanceSpaces} = context;
    const props = [];
    const regExp = /^[^\s/>=]+/i;
    // <div id=123 v-show='display'></div>
    //模板属性都 都在 > 或者 /> (自闭和标签) 之前
    while (!context.source.startsWith('>') && !context.source.startsWith('/>')) {

        //匹配属性名
        const match = regExp.exec(context.source);

        if (!match) throw  new Error('invalid attribute');
        const name = match[0];
        advanceBy(name.length);
        advanceSpaces();
        //消耗 = 等号
        advanceBy(1);
        //消耗等号后的空格
        advanceSpaces();

        let value = null;
        // 有可能是单引号：‘value' 双引号："value" 无引号 value
        const quote = context.source[0];
        const hasQuote = quote === "'" || quote === '"';

        if (hasQuote) {
            //消耗 前半个引号
            advanceBy(1);
            const endIndex = context.source.indexOf(quote);
            if (endIndex > -1) {
                value = context.source.slice(0, endIndex);
                advanceBy(value.length);
                //消耗 后半个引号
                advanceBy(1);
            } else throw  new Error('invalid quote');

        } else {
            // 没有引号，则将下一个空格之前的内容都做为 value
            const regExp = /^\S+/;

            const match = regExp.exec(context.source);

            if (!match) throw  new Error('invalid attributes');

            value = match[0];

            advanceBy(value.length);


        }

        props.push({
            type: Type.ATTRIBUTE,
            name,
            value

        })
        // 消耗 属性值后面的 空格
        advanceSpaces();

    }

    return props;

}

function parseTag(context) {

    const {source, advanceBy, advanceSpaces} = context;
    const redExp = /^<([a-z][^\s/>]*)/i;
    const match = redExp.exec(source);
    if (!match) throw new Error('invalid tag');
    //消耗匹配的标签名 <div </div
    advanceBy(match[0].length);
    //消耗空格
    advanceSpaces();
    //解析属性
    const props = parseAttributes(context);
    //是否是自闭和标签
    const isSelfClosed = context.source.startsWith('/>');
    //消耗闭合的 > 或者 />
    advanceBy(isSelfClosed ? 2 : 1);
    return {
        type: Type.ELEMENT,
        tag: match[1],
        props,
        children: [],
        isSelfClosed
    }

}


function parseEndTag(context) {

    const {source, advanceBy, advanceSpaces} = context;
    const regExp = /^<\/([a-z][^\s/>]*)/i;
    const match = regExp.exec(source);
    if (!match) throw new Error('invalid end tag');
    advanceBy(match[0].length);
    advanceSpaces();
    advanceBy(1);
}


function parseElement(context, ancestors = []) {

    const element = parseTag(context);
    ancestors.push(element);
    element.children = parseChildren(context, ancestors);
    ancestors.pop();

    if (context.source.startsWith(`</${element.tag}>`)) {

        parseEndTag(context);

    } else {
        // 闭合标签不匹配
        console.error('闭合标签不匹配');
    }

    return element;

}

function parseComment(context, ancestors) {


}

function parseText(context, ancestors) {


}

function parseInterpolation(context, ancestors) {


}

function isEnd(context, ancestors) {
    // 判断标签是否结束

}

function parseChildren(context, ancestors = []) {

    const {source} = context;
    const nodes = [];
    let node = null;

    while (isEnd(context, ancestors)) {

        //标签开始
        if (source.startsWith('<')) {

            if (/^[a-z]+/i.test(source)) {
                //element tag
                node = parseElement(context, ancestors);

            } else if (source.startsWith('<!--')) {
                // comment
                node = parseComment(context, ancestors);

            } else {
                console.error('invalid  < ');
            }

        } else if (source.startsWith('{{')) {
            // 花括号 表达式
            node = parseInterpolation(context, ancestors);


        } else {
            //剩余都按照文本处理
            node = parseText(context, ancestors);
        }

    }

    nodes.push(node);

    return nodes;

}