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
    tag?: string,
    props?: PropNode[],
    content?: string | Node,
    isStatic?: boolean,
    isConstant?: boolean,
    children?: Node[],
    isSelfClosing?: boolean

}

type PropNode = {

    type: number,
    name: string,
    loc: Location,
    value?: Node,
    exp?: Node,
    arg?: Node,
    modifier?: string[]
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

function parseAttributes(context: Context) {

    const props: PropNode[] = [];

    // const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
    while (context.source.length > 0 && context.source.search(/^\/?>/) === -1) {

        console.log("attrs----", context.source)
        const prop = parseAttr(context);
        prop && props.push(prop);
        advanceSpace(context);
    }

    return props.length > 0 ? props : null;


}

/*
* type PropNode = {

    type: number,
    name: string,
    loc: Location,
    value?: Node,
    exp?: Node,
    arg?: Node,
    modifier?: string[]
}

* */

function parseAttr(context: Context) {
    const attrReg = /^((\@?\:?[\w\-\.]+)\s*=\s*)(\"?\'?\s*(\w+)\s*\"?\'?)/;
    const match = attrReg.exec(context.source);
    if (match) {
        const start = getCursor(context);
        const [all, pre, key, last, value] = match;
        console.log("attr match", all, pre, key, last, value);
        const prop: PropNode = {} as PropNode;
        const dirReg = /^(@|v-on:|:|v-bind:)/i;
        const dirMatch = dirReg.exec(key);

        //:click.native = "handle"  key :click.native
        if (dirMatch) {
            const [prefix] = dirMatch;
            prop.type = NodeTypes.DIRECTIVE;
            if (prefix === "@" || prefix === "v-on:") prop.name = 'on';
            if (prefix === ':' || prefix === "v-bind:") prop.name = 'bind';
            advance(context, prefix.length);
            const argStart = getCursor(context);
            const argAndModifier = key.slice(prefix.length);
            let arg = argAndModifier, modifier = []
            //有修饰符
            if (argAndModifier.indexOf(".")) [arg, ...modifier] = argAndModifier.split(".");
            advance(context, arg.length);
            const argEnd = getCursor(context);
            prop.modifier = modifier;
            prop.arg = {
                type: NodeTypes.SIMPLE_EXPRESSION,
                content: arg,
                isStatic: true,
                isConstant: true,
                loc: {
                    start: argStart,
                    end: argEnd,
                    source: arg
                }
            }

            advance(context, pre.length - prefix.length - arg.length);
            // :value = " 'value' " 裁掉 空格 引号等
            const valueIndex = last.indexOf(value);
            const expPreSpaceAndQuote = last.slice(0, valueIndex);
            advance(context, valueIndex);
            const expStart = getCursor(context);
            advance(context, value.length);
            const expEnd = getCursor(context);
            //此处与 html属性 attr不同 attr, 带有 引号等 source 是 last 不是 value

            advance(context, last.length - value.length - expPreSpaceAndQuote.length);

            prop.exp = {
                type: NodeTypes.SIMPLE_EXPRESSION,
                content: value,
                isStatic: false,
                isConstant: false,
                loc: {
                    start: expStart,
                    end: expEnd,
                    source: value
                }


            }


        } else {
            prop.type = NodeTypes.ATTRIBUTE;
            prop.name = key;
            advance(context, pre.length);
            const valueStart = getCursor(context);
            //可能有 单引号 双引号 空格等
            advance(context, last.length);
            const valueEnd = getCursor(context);
            prop.value = {
                type: NodeTypes.TEXT,
                content: value,
                loc: {
                    start: valueStart,
                    end: valueEnd,
                    source: last
                }

            };

        }

        prop.loc = {
            start,
            end: getCursor(context),
            source: all
        }


        return prop;


    }


}


function parseElement(context: Context) {

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


        const props = parseAttributes(context);
        console.log("----props----", props);

        //自闭和标签
        const isSelfClosing = context.source.startsWith('/>');
        if (isSelfClosing) advance(context, 2);
        else if (context.source.startsWith('>')) {

            //非自闭和标签
            advance(context, 1);
            console.log('tag', tag)

        } else throw  new Error('tag invalid closed: ' + context.source);


        // 非自闭和的 loc 的 end 和 source 后续更新

        const end = getCursor(context);

        const element: Node = {
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
        if (props) element.props = props;
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
    // 多节点处理
    const rootStart = getCursor(context);
    const ast = parseTpl(context);
    const rootEnd = getCursor(context);


    return {
        type: NodeTypes.ROOT,
        children: ast,
        loc: {
            start: rootStart,
            end: rootEnd,
            source: context.originalSource
        }

    };


}


export function baseCompile(template: string) {
    // 讲模板转换成ast语法树
    const ast = baseParse(template);


    console.log(ast)
}


// 从 template - > ast语法树   (vue里面 有指令 有插槽 有事件)
// ast - > transform -> codegen 
