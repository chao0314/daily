import {patchStyle} from "../../vue-simple-3/packages/runtime-dom/src/patch/patchStyle";

function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}


function ListNode(val) {
    this.val = val;
    this.next = null;
}

//236. 二叉树的最近公共祖先  https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
const lowestCommonAncestor = function (root, p, q) {

    let ancestor;


    if (root) traversal(root)

    function traversal(root) {

        if (ancestor) return;
        // 注意递归 函数调用栈的变量
        let count = 0;


        //先递 拆分
        if (root.left) count += traversal(root.left)
        if (root.right) count += traversal(root.right);
        //后归
        if (root.val === p.val || root.val === q.val) count++;
        if (count === 2 && !ancestor) ancestor = root;

        return count;


    }


    return ancestor;


};


//剑指 Offer 68 - I. 二叉搜索树的最近公共祖先
// https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-zui-jin-gong-gong-zu-xian-lcof/

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
const lowestCommonAncestor2 = function (root, p, q) {

    let ancestor;

    if (root) traversal(root);

    return ancestor;

    function traversal(root) {
        if (ancestor) return;
        let count = 0;
        if (root.left && (root.val > p.val || root.val > q.val)) count += traversal(root.left);
        if (root.right && (root.val < p.val || root.val < q.val)) count += traversal(root.right);

        if (root.val === p.val || root.val === q.val) count++;
        if (count === 2 && !ancestor) ancestor = root;
        return count;
    }


};

//114. 二叉树展开为链表 https://leetcode-cn.com/problems/flatten-binary-tree-to-linked-list/
/**
 * @param {TreeNode} root
 *  Do not return anything, modify root in-place instead.
 */
const flatten = function (root) {

    if (!root) return;

    let head = new TreeNode();
    let tail = head;

    preorder(root);

    return head.right;

    function preorder(root) {

        const left = root.left;
        const right = root.right;

        tail.right = root;
        root.left = null;
        root.right = null;

        tail = tail.right;

        if (left) preorder(left);
        if (right) preorder(right);


    }


};

//面试题 17.12. BiNode https://leetcode-cn.com/problems/binode-lcci/

//中序遍历

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
const convertBiNode = function (root) {

    if (!root) return root;

    let head = new TreeNode();
    let tail = head;
    inorder(root);

    return head.right;

    function inorder(root) {

        const left = root.left;
        const right = root.right;

        if (left) inorder(left);
        tail.right = root;
        root.left = null;
        root.right = null;
        tail = tail.right;
        if (right) inorder(right);


    }


};

//剑指 Offer 36. 二叉搜索树与双向链表  https://leetcode-cn.com/problems/er-cha-sou-suo-shu-yu-shuang-xiang-lian-biao-lcof/

/**
 * @param {Node} root
 * @return {Node}
 */

// 中序遍历

const treeToDoublyList = function (root) {

    if (!root) return root;
    let head = new TreeNode();
    let tail = head;
    inorder(root);
    head.right.left = tail;
    tail.right = head.right;

    return head.right;


    function inorder(root) {

        const left = root.left;
        const right = root.right;

        if (left) inorder(left);

        tail.right = root;
        root.left = tail;
        root.right = null;
        tail = tail.right;

        if (right) inorder(right);


    }


};

//面试题 04.03. 特定深度节点链表  https://leetcode-cn.com/problems/list-of-depth-lcci/

/**
 * @param {TreeNode} tree
 * @return {ListNode[]}
 */
const listOfDepth = function (tree) {

    if (!tree) return tree;
    const queue = [tree];
    const cache = new Map();
    const result = [];
    cache.set(tree, 0);

    while (queue.length > 0) {

        const node = queue.shift();

        const level = cache.get(node);

        const levelResult = result[level] || [];

        levelResult.push(node);

        result[level] = levelResult;


        if (node.left) {

            queue.push(node.left);
            cache.set(node.left, level + 1);

        }

        if (node.right) {


            queue.push(node.right);
            cache.set(node.right, level + 1);
        }


    }

    const temp = [];

    for (let i = 0; i < result.length; i++) {

        const levelRes = result[i];
        const head = new ListNode(levelRes[0].val);
        let tail = head;

        for (let j = 1; j < levelRes.length; j++) {

            tail.next = new ListNode(levelRes[j].val);
            tail = tail.next;
        }

        temp[i] = head;


    }

    return temp;


};

//105. 从前序与中序遍历序列构造二叉树
// https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */


/*
*            4
           /   \
*         2     5
*        / \     \
*       1   3     6
*      /
*     0
*
*
* pre : 4 2 1 0 3 5 6
*
*  in : 0 1 2 3 4 5 6
*
* post: 0 1 3 2 6 5 4
*
* */
const buildTree = function (preorder, inorder) {

    if (preorder.length <= 1) return new TreeNode(preorder[0]);


    return create(0, preorder.length - 1, 0, inorder.length - 1);


    function create(preS, preE, inS, inE) {

        if (preS > preE) return null;

        const curRoot = new TreeNode(preorder[preS]);

        const inorderIndex = inorder.indexOf(curRoot.val);

        const leftCount = inorderIndex - inS;

        const leftTree = create(preS + 1, preS + leftCount, inS, inS + leftCount - 1);

        const rightTree = create(preS + 1 + leftCount, preE, inS + leftCount + 1, inE);

        curRoot.left = leftTree;

        curRoot.right = rightTree;

        return curRoot;


    }


};

//889. 根据前序和后序遍历构造二叉树
//https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/


/**
 * @param {number[]} preorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
const constructFromPrePost = function (preorder, postorder) {

    if (preorder.length <= 1) return new TreeNode(preorder[0]);


    return create(0, preorder.length - 1, 0, postorder.length - 1);


    function create(preS, preE, postS, postE) {


        if (preS > preE) return null;

        const curRoot = new TreeNode(preorder[preS]);

        // 后面还有
        if (preS + 1 <= preE) {
            const leftSubRootVal = preorder[preS + 1];
            const postIndex = postorder.indexOf(leftSubRootVal);
            const leftSubCount = postIndex - postS + 1;
            const leftTree = create(preS + 1, preS + leftSubCount, postS, postS + leftSubCount - 1);
            const rightTree = create(preS + 1 + leftSubCount, preE, postS + leftSubCount, postE - 1);
            curRoot.left = leftTree;
            curRoot.right = rightTree;

        }


        return curRoot;

    }

};


//106. 从中序与后序遍历序列构造二叉树

//https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/

/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
const buildTree2 = function (inorder, postorder) {


    if (inorder.length <= 1) return new TreeNode(inorder[0]);


    return create(0, inorder.length - 1, 0, postorder.length - 1);

    function create(inS, inE, postS, postE) {

        if (inS > inE) return null;

        const curRoot = new TreeNode(postorder[postE]);

        const inIndex = inorder.indexOf(postorder[postE]);

        const leftSubCount = inIndex - inS;

        const leftTree = create(inS, inS + leftSubCount - 1, postS, postS + leftSubCount - 1);
        const rightTree = create(inIndex + 1, inE, postS + leftSubCount, postE - 1);

        curRoot.left = leftTree;
        curRoot.right = rightTree;
        return curRoot;

    }


};

//剑指 Offer 33. 二叉搜索树的后序遍历序列

//https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-hou-xu-bian-li-xu-lie-lcof/

/**
 * @param {number[]} postorder
 * @return {boolean}
 */
const verifyPostorder = function (postorder) {





};

