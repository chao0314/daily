const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
export const enum NodeTypes {
    ROOT,
    ElEMENT,
    TEXT,
    SIMPLE_EXPRESSION = 4,
    INTERPOLATION = 5,
    ATTRIBUTE = 6,
    DIRECTIVE = 7,
    COMPOUND_EXPRESSION = 8,
    TEXT_CALL = 12,
    VNODE_CALL = 13,
}

type Context = {
    line: number,
    column: number,
    offset: number,
    source: string,
    originalSource: string
}

type Cursor = {
    column: number,
    line: number,
    offset: number
}

type Location = {
    start: Cursor,
    end: Cursor,
    source: string
}

type Node = {
    type: number,
    loc: Location,
    content?: string | Node,
    tag?: string,
    isStatic?: boolean,
    isConstant?: boolean,
    children?: Node[],
    isSelfClosing?: boolean

}

function createParserContext(tpl: string): Context {

    tpl = tpl.trim();

    return {
        line: 1,
        column: 1,
        offset: 0,
        source: tpl,
        originalSource: tpl
    }


}

function isEnd(context: Context) {

    return context.source.length === 0;

}

function parseText(context: Context): Node {

    //遇到 < {{ 这两个字符 说明纯文本结束
    const endTokens = ["<", "{{"];
    const {source, originalSource} = context;
    let endIndex = source.length;
    for (let i = 0; i < endTokens.length; i++) {
        let index = source.indexOf(endTokens[i]);
        if (index !== -1 && endIndex > index) endIndex = index;
    }
    // 多个文本空格  替换为一个
    const content = source.slice(0, endIndex).replace(/\s+/g, " ");

    const start = getCursor(context);
    advance(context, endIndex);
    const end = getCursor(context);


    return {
        type: NodeTypes.TEXT,
        content,
        loc: {
            start,
            end,
            source: originalSource.slice(start.offset, end.offset)
        }

    }


}


function advance(context, index) {

    const {source} = context;

    context = mutationPosition(context, source, index);

    context.source = source.slice(index);

    return context;


}


function mutationPosition(ctx: Context | Cursor, source: string, index: number) {

    let lineCount = 0;
    let newLineStartIndex = -1;

    // '\n'.charCodeAt(0) === 10
    for (let i = 0; i < index; i++) {
        //换行符
        if (source.charCodeAt(i) === 10) {
            lineCount++;
            newLineStartIndex = i;
        }


    }
    ctx.offset += index
    ctx.line += lineCount;
    //没换行 列数直接加，换行了重新计算
    ctx.column = newLineStartIndex === -1 ? ctx.column + index : index - newLineStartIndex;
    return ctx;
}


function getCursor(context: Context): Cursor {

    const {line, column, offset} = context;
    return {line, column, offset};


}


function parseInterpolation(context: Context): Node {

    //{{ name }}
    const start = getCursor(context);
    //裁掉 {{
    advance(context, 2);
    const {source, originalSource} = context;
    const innerStart = getCursor(context);
    //留作后面更新 innerEnd
    const innerEnd = getCursor(context);
    const closeIndex = source.indexOf("}}");

    //有可能包含 空白 换行等
    const rawContent = source.slice(0, closeIndex);
    const content = rawContent.trim();

    // 裁掉中间内容
    advance(context, closeIndex);

    const spaceOffset = rawContent.indexOf(content);
    //前段 有 空白 换行等 更新 innerStart
    if (spaceOffset > 0) mutationPosition(innerStart, rawContent, spaceOffset);
    //更新 innerEnd  ，内容有 空白 换行等
    mutationPosition(innerEnd, rawContent, spaceOffset + content.length);
    // 裁掉 }}
    advance(context, 2);

    const end = getCursor(context);

    return {

        type: NodeTypes.INTERPOLATION,
        content: {
            type: NodeTypes.SIMPLE_EXPRESSION,
            isStatic: false,
            isConstant: false,
            content: originalSource.slice(innerStart.offset, innerEnd.offset),
            loc: {
                start: innerStart,
                end: innerEnd,
                source: originalSource.slice(innerStart.offset, innerEnd.offset)
            }

        },
        loc: {
            start,
            end,
            source: originalSource.slice(start.offset, end.offset)
        }
    }


}

function advanceSpace(context: Context) {

    const spaceRegExp = /^\s+/;
    const match = spaceRegExp.exec(context.source);
    if (match) advance(context, match[0].length);

}


const elementStack = [];

function parseElement(context: Context): Node {

    //<div>hello<p>{{name}}</p></div>
    const tagStartReg = /^<([A-Za-z]+)\s*/i;
    const tagEndReg = /^<\/([A-Za-z]+)\s*>/i;
    const start = getCursor(context);
    const match = tagStartReg.exec(context.source);
    const endMatch = tagEndReg.exec(context.source);

    if (match) {
        const tag = match[1];
        advance(context, match[0].length);
        advanceSpace(context);
        // todo...attributes




        //自闭和标签
        const isSelfClosing = context.source.startsWith('/>');
        if (isSelfClosing) advance(context, 2);
        else if (context.source.startsWith('>')) {

            //非自闭和标签
            advance(context, 1);
            console.log('tag', tag)


        } else throw  new Error('tag invalid closed');


        // 非自闭和的 loc 的 end 和 source 后续更新

        const end = getCursor(context);

        let element = {
            type: NodeTypes.ElEMENT,
            tag,
            children: null,
            isSelfClosing,
            loc: {
                start,
                end: isSelfClosing ? end : null,
                source: isSelfClosing ? context.originalSource.slice(start.offset, end.offset) : ""
            }

        }

        if (!isSelfClosing) elementStack.push(element);
        //处理 子内容
        // if (tag === 'p') debugger
        element.children = parseTpl(context);
        return element;


    } else if (endMatch) {

        //处理 关闭标签
        console.log("end match", endMatch, elementStack)

        const endTag = endMatch[1];
        const element = elementStack.pop();
        console.log(endTag, element.tag)
        if (endTag !== element.tag) throw new Error('tag no matched');
        advance(context, endMatch[0].length);

        //更新 element end 和 source
        element.loc.end = getCursor(context);
        element.loc.source = context.originalSource.slice(element.loc.start.offset, element.loc.end.offset);


    } else throw new Error('tag invalid start ' + context.source);


}

function parseTpl(context: Context) {

    const astNodes: Node[] = [];

    while (!isEnd(context)) {
        const {source} = context;
        let node: Node;
        //模板语法
        if (source.startsWith("{{")) {
            console.log("interpolation");
            node = parseInterpolation(context);

            //元素
        } else if (source.startsWith("<")) {
            console.log('element');
            node = parseElement(context);


            //文本
        } else {

            console.log("text");
            node = parseText(context);


        }

        node && astNodes.push(node);


    }

    return astNodes;


}

function baseParse(tpl: string) {

    const context = createParserContext(tpl);
    const ast = parseTpl(context);

    return ast;


}


export function baseCompile(template: string) {
    // 讲模板转换成ast语法树
    const ast = baseParse(template);
    console.log(ast)
}


// 从 template - > ast语法树   (vue里面 有指令 有插槽 有事件)
// ast - > transform -> codegen 
