export const Type = {
    ROOT: 'root',
    TEXT: 'text',
    ELEMENT: 'element',
    COMMENT: 'comment',
    ATTRIBUTE: 'attribute',
    INTERPOLATION: 'interpolation'
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


    };

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

    advanceSpaces();
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
    //消耗 >
    advanceBy(1);
    //消耗空格
    advanceSpaces();
}


function parseElement(context, ancestors = []) {
    const element = parseTag(context);
    ancestors.push(element);
    // throw element
    // debugger
    element.children = parseChildren(context, ancestors);
    ancestors.pop();

    if (context.source.startsWith(`</${element.tag}>`)) {

        parseEndTag(context);

    } else {
        //虽然结束了 但是以当前元素的闭合标签结束 例如：<div><p></div></p> -> <div><p></div>
        // 闭合标签不匹配
        throw new Error('闭合标签不匹配');
    }

    return element;

}

function parseComment(context, ancestors) {

    const {advanceBy, advanceSpaces} = context;
    //消费 <!--;
    advanceBy('<!--'.length);
    const closedIndex = context.source.indexOf('-->');

    if (closedIndex === -1) throw  new Error('mismatch <!--');

    const content = context.source.slice(0, closedIndex);

    advanceBy(content.length);

    advanceBy('-->'.length);

    advanceSpaces();

    return {
        type: Type.COMMENT,
        content

    }

}

function parseText(context, ancestors) {

    // 1 文本遇到 < 结束
    // 2 文本遇到 {{ 结束
    // 3 文本直到最后 结束
    const {advanceBy, advanceSpaces} = context;
    let endIndex = context.source.length;
    const ltIndex = context.source.indexOf('<');
    const delimiterIndex = context.source.indexOf('{{');

    if (ltIndex > -1 && ltIndex < endIndex) endIndex = ltIndex;

    if (delimiterIndex > -1 && delimiterIndex < endIndex) endIndex = delimiterIndex;

    const content = context.source.slice(0, endIndex);

    advanceBy(content.length);

    advanceSpaces();

    return {

        type: Type.TEXT,
        content

    }


}

function parseInterpolation(context, ancestors) {

    // 插值符号 {{ xxx }}
    const {advanceBy, advanceSpaces} = context;
    //消费 {{
    advanceBy(2);
    const closedIndex = context.source.indexOf('}}');

    if (closedIndex === -1) throw  new Error('mismatch }}');

    const content = context.source.slice(0, closedIndex);

    advanceBy(content.length);
    //消耗 }}
    advanceBy(2);
    advanceSpaces();

    return {

        type: Type.INTERPOLATION,
        content
    }

}

function isEnd(context, ancestors) {
    // 判断标签是否结束
    //模板字符串耗尽
    const {source} = context;
    if (!source) return true;
    //找到了对应的开始标签
    //此处考虑兼容处理特殊请款  <div><p></div></p>
    //是截取处理 <div><p></div>
    //当然另一种处理方法是直接报错

    const ancestor = ancestors[ancestors.length - 1];

    if (ancestor && source.startsWith(`</${ancestor.tag}`)) return true;

    // 兼容 处理 不匹配的 标签
    for (let i = ancestors.length - 2; i > 0; i--) {

        const tag = ancestors[i].tag;

        if (source.startsWith(`</${tag}`)) {

            console.error(`${tag} mismatch`);

            return true;

        }

    }


    return false;


}

function parseChildren(context, ancestors = []) {

    const {advanceSpaces} = context;
    const nodes = [];
    //清理空白

    while (!isEnd(context, ancestors)) {

        advanceSpaces();
        let node = null;
        //标签开始
        if (context.source.startsWith('<')) {

            if (/^<[a-z]+/i.test(context.source)) {
                //element tag
                node = parseElement(context, ancestors);

            } else if (context.source.startsWith('<!--')) {
                // comment
                node = parseComment(context, ancestors);

            } else {
                throw new Error(`invalid  ${context.source}`);
            }

        } else if (context.source.startsWith('{{')) {
            // 花括号 表达式
            node = parseInterpolation(context, ancestors);


        } else {
            //剩余都按照文本处理
            node = parseText(context, ancestors);
        }


        nodes.push(node);
    }


    return nodes;

}

