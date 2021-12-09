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

    // const temp = [];
    //
    // for (let i = 0; i < result.length; i++) {
    //
    //     const levelRes = result[i];
    //
    //     for (let j = 1; j < levelRes.length; j++) {
    //
    //         levelRes[j - 1].right = levelRes[j];
    //         levelRes[j - 1].left = null;
    //     }
    //
    //     const last = levelRes[levelRes.length - 1];
    //
    //     last.left = null;
    //     last.right = null;
    //
    //     temp[i] = levelRes[0];
    //
    //
    // }
    //
    // console.log(temp);
    return temp;


};