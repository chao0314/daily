const template = `<div id="123" v-show="display" :name="name">
    <p>p1</p>
    <p>p2</p>
</div>`


const Type = {
    ROOT: 'root',
    TEXT: 'text',
    ELEMENT: 'element',
    COMMENT: 'comment'
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


}

function parseTag(context, type = 'start') {

}


function parseElement(context, ancestors = []) {

    const element = parseTag(context);
    ancestors.push(element);
    element.children = parseChildren(context, ancestors);
    ancestors.pop();

    if (context.source.startsWith(`</${element.tag}>`)) {

        parseTag(context, 'end');
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

            node = parseText(context, ancestors);
        }

    }

    nodes.push(node);

    return nodes;

}