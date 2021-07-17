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


export function baseCompile(template: string) {
    // 讲模板转换成ast语法树
    console.log(template)
}


// 从 template - > ast语法树   (vue里面 有指令 有插槽 有事件)
// ast - > transform -> codegen 
