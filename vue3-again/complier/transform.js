import {Type} from "./parser.js";

export const transform = (ast, transforms) => {

    const context = {
        currentNode: null,
        currentIndex: null,
        parent: null,
        transforms: transforms ?? [transformElement, transformText]


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

function transformElement(node, context) {

    if (node.type !== Type.ELEMENT) return;

    console.log('transformElement--start', node.tag);
    //todo

    return () => {

        console.log('transformElement--end', node.tag);

    }

}

function transformText(node, context) {
    if (node.type !== Type.TEXT) return;
    console.log('transformText--', node.content);


}

const JsNodeType = {

    IDENTIFIER: 'identifier',
    STRING_LITERAL: 'stringLiteral',
    CALL_EXPRESSION: 'callExpression',
    ARRAY_EXPRESSION: 'arrayExpression'

}

function createStringLiteral(value) {

    return {

        type:

    }


}

