let template = `<div id ="app" title="hello">{{name}}<span>world</span></div>`;

const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; // 标签/命名空间
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; //命名空间:标签
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头的正则 捕获的内容是标签名 <div
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的 id="app" id='app' id=app
const startTagClose = /^\s*(\/?)>/;  // 匹配标签结束的 > 或 />
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g //文本节点的内容
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的 </div>


let root;
let stack = [];

function onStart(tagName, attrs) {
    console.log('onStart', tagName, attrs);

    let astNode = {
        tagName,
        type: 1,
        parent: null,
        children: []
    }

    stack.push(astNode);

    if (!root) root = astNode;
    else {
        let parent = stack[stack.length - 1];
        parent.children.push(astNode);
        astNode.parent = parent;
    }


}

function onText(text) {
    console.log('onText', text);

}

function onEnd(tagName) {
    console.log('onEnd', tagName);

}


function parseHtml(tpl = "") {

    while (tpl = tpl.trim()) {
        let startMatch = tpl.match(startTagOpen);
        let endMatch = tpl.match(endTag);
        if (startMatch) {
            let [full, tagName] = startMatch;
            let attrs = [];
            tpl = tpl.slice(full.length);
            let attrMatch;
            while ((attrMatch = tpl.match(attribute))) {
                let [full, key, ...value] = attrMatch;
                console.log('attribute', value);
                attrs.push({
                    [key]: value[1] || value[2] || value[3]
                })
                tpl = tpl.slice(full.length);
            }

            let startClose = tpl.match(startTagClose);
            if (startClose) {

                tpl = tpl.slice(startClose[0].length);

                onStart(tagName, attrs);

                // 可能是 单标签  <input />结束 或 双标签  <p>xxx</p>未闭合
                // <input />// hello world
                // <p>      // hello world</p>

                let nextFlag = tpl.indexOf('<');
                if (nextFlag !== -1) {
                    let text = tpl.slice(0, nextFlag);
                    tpl = tpl.slice(nextFlag);
                    if (startClose[0] === '/>') {
                        onEnd(tagName);
                    }
                    onText(text);

                } else {
                    //自闭合标签 之后没有没有其他标签（开始或结束）， 但有文本，说明格式不对。
                    if (startClose[0] === '/>' && tpl.length > 0) throw new Error('tag not match close ')

                }


            } else {
                throw new Error('start tag not close');
            }


        } else if (endMatch) {

            onEnd(endMatch[1]);
            tpl = tpl.slice(endMatch[0].length);

        } else {
            console.log('there is something out of tag :', tpl);
            break;
        }
    }

}


parseHtml(template);