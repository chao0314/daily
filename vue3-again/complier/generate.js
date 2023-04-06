import {JsASTNodeType} from "./transform.js";

export function generate(ast) {

    const context = {

        code: '',
        //两个空格缩进
        currentIndent: 0,
        push(code) {

            context.code += code;
        },
        newLine() {
            context.code += `\n${'  '.repeat(context.currentIndent)}`;
        },
        indentNewLine() {
            // 增加缩进 并新起一行
            context.currentIndent++;
            context.newLine();

        },
        deIndentNewLine() {
            // 减少缩进 并新起一行
            context.currentIndent--;
            context.newLine();

        }

    }

    genCode(ast, context);


    return context.code;
}


function genCode(node, context) {
    // console.log(node)
    switch (node.type) {

        case JsASTNodeType.FUNCTION_DECL:
            genFunctionDecl(node, context);
            break;

        case JsASTNodeType.RETURN_STATEMENT:
            genReturnStatement(node, context);
            break;

        case JsASTNodeType.CALL_EXPRESSION:
            genCallExpression(node, context);
            break;

        case JsASTNodeType.ARRAY_EXPRESSION:
            genArrayExpression(node, context);
            break;

        case JsASTNodeType.STRING_LITERAL:
            genStringLiteral(node, context);
            break;
    }


}

function genNodeList(nodes = [], context) {

    const {push} = context;
    // [a,b,] => a,b,c
    for (let i = 0; i < nodes.length; i++) {

        const node = nodes[i];

        genCode(node, context);

        if (i !== nodes.length - 1) {

            push(', ');
        }
    }


}

/*
* function render (){
*   return h('div',[
*     h('p','vue3'),
*     h('p','tpl')
*   ])
* }
*
* */

function genFunctionDecl(node, context) {

    const {push, indentNewLine, deIndentNewLine} = context;

    push(`function ${node.id.name}(`);

    genNodeList(node.params, context);

    push(') {');

    indentNewLine();

    // body 内的 语句

    for (let i = 0; i < node.body.length; i++) {

        const statementNode = node.body[i];

        genCode(statementNode, context);
    }

    deIndentNewLine();
    push('}');

}

function genReturnStatement(node, context) {

    const {push} = context;

    push('return ');

    genCode(node.return, context);

}

function genCallExpression(node, context) {

    const {push} = context;
    const {callee, arguments: args} = node;
    push(`${callee.name}(`);
    genNodeList(args, context);
    push(')');

}

function genArrayExpression(node, context) {

    const {push} = context;

    push('[');
    genNodeList(node.elements, context);
    push(']');


}

function genStringLiteral(node, context) {

    const {push} = context;

    push(`'${node.value}'`);


}
