function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

function Node(val, children) {
    this.val = val;
    this.children = children;
}


//剑指 Offer 55 - II. 平衡二叉树
//https://leetcode-cn.com/problems/ping-heng-er-cha-shu-lcof/

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
const isBalanced = function (root) {

    let isBalanced = true;


    if (root) getDepth(root);


    return isBalanced;

    function getDepth(root) {

        let depth = 0;

        if (!isBalanced || !root) return depth;

        depth++;

        const leftDepth = getDepth(root.left);
        const rightDepth = getDepth(root.right);

        if (Math.abs(leftDepth - rightDepth) > 1) isBalanced = false;

        return depth + Math.max(leftDepth, rightDepth);
    }


};

//617. 合并二叉树
//https://leetcode-cn.com/problems/merge-two-binary-trees/

/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 */

//先广度遍历 得到结果再 合并 构造新树
const mergeTrees = function (root1, root2) {






function iterator(root){

    const  result = [];
    const queue = [];






}

};