import {Type} from "./parser.js";

/*
* function render (){
*   return h('div',[
*     h('p','vue3'),
*     h('p','tpl')
*   ])
* }
*
* */

export const JsASTNodeType = {

    IDENTIFIER: 'identifier',
    FUNCTION_DECL: 'functionDecl',
    STRING_LITERAL: 'stringLiteral',
    CALL_EXPRESSION: 'callExpression',
    ARRAY_EXPRESSION: 'arrayExpression',
    RETURN_STATEMENT: 'returnStatement'
}

export const transform = (ast, transforms) => {

    const context = {
        currentNode: null,
        currentIndex: null,
        parent: null,
        transforms: transforms ?? [transformRoot, transformElement, transformText]


    }


    return traverseNode(ast, context);


}

function traverseNode(ast, context) {
    const existCbs = [];
    const {transforms} = context;
    context.currentNode = ast;

    for (let i = 0; i < transforms.length; i++) {

        const cb = transforms[i](context.currentNode, context);

        if (typeof cb === 'function') existCbs.push(cb);

    }

    const {children} = context.currentNode;
    const parent = context.currentNode;

    if (children) {

        for (let j = 0; j < children.length; j++) {

            context.parent = parent;
            context.currentIndex = j;
            traverseNode(children[j], context);

        }
    }


    for (let k = existCbs.length - 1; k >= 0; k--) {

        existCbs[k]();

    }

    return ast;

}

function transformRoot(node, context) {

    if (node.type !== Type.ROOT) return;
    //不考虑多根节点情况

    return () => {
        const returnValue = node.children[0].jsnode;
        node.jsnode = createFunctionDecl('render', [], [createReturnStatement(returnValue)]);
    }

}

function transformElement(node, context) {

    if (node.type !== Type.ELEMENT) return;

    // console.log('transformElement--start', node.tag);

    // children 处理完后的回调
    //需要用到 children 的 jsnode
    return () => {

        // console.log('transformElement--end', node.tag);
        //['div',h(1)] ['div',[h(1),h(2)]]
        const args = [createStringLiteral(node.tag)];

        if (node.children.length === 1) {

            args.push(node.children[0].jsnode)

        } else {
            // 包一层 ArrayExpression
            const arrayExpression = createArrayExpression(node.children.map(child => child.jsnode));

            args.push(arrayExpression);

        }

        node.jsnode = createCallExpression('h', args);

    }

}

function transformText(node, context) {

    if (node.type !== Type.TEXT) return;

    node.jsnode = createStringLiteral(node.content);


}


function createIdentifier(name) {

    return {
        type: JsASTNodeType.IDENTIFIER,
        name
    }
}


function createStringLiteral(value) {

    return {
        type: JsASTNodeType.STRING_LITERAL,
        value
    }

}

function createCallExpression(callee, args) {

    return {

        type: JsASTNodeType.CALL_EXPRESSION,
        callee: createIdentifier(callee),
        arguments: args

    }

}

function createArrayExpression(elements) {

    return {
        type: JsASTNodeType.ARRAY_EXPRESSION,
        elements

    }
}

function createFunctionDecl(name, params = [], body = []) {

    return {

        type: JsASTNodeType.FUNCTION_DECL,
        id: createIdentifier(name),
        params,
        body
    }
}

function createReturnStatement(value) {

    return {

        type: JsASTNodeType.RETURN_STATEMENT,
        return: value
    }

}

