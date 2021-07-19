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
    end: Cursor
}

type Node = {
    type: number,
    content?: string,
    loc: Location

}

function createParserContext(tpl: string): Context {

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

function parseText(context: Context) {

    //遇到 < {{ 这两个字符 说明纯文本结束
    const endTokens = ["<", "{{"];
    const {source} =  context;
    let endIndex = 0;
    for (let i = 0; i < endTokens.length; i++) {

        let index =  source.indexOf(endTokens[i]);


    }


}

function parseTpl(context: Context) {

    const astNodes: Node[] = [];

    while (!isEnd(context)) {
        const {source} = context;
        let node: Node;
        //模板语法
        if (source.startsWith("{{")) {

            //元素
        } else if (source.startsWith("<")) {


            //文本
        } else {

            node = parseText(context);


        }


    }

}

function baseParse(tpl: string) {

    const context = createParserContext(tpl);


}


export function baseCompile(template: string) {
    // 讲模板转换成ast语法树
    const ast = baseParse(template);
    console.log(ast)
}


// 从 template - > ast语法树   (vue里面 有指令 有插槽 有事件)
// ast - > transform -> codegen 
