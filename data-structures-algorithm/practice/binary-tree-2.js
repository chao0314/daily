function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
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

