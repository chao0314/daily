//144. 二叉树的前序遍历  https://leetcode-cn.com/problems/binary-tree-preorder-traversal/


function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
const preorderTraversal = function (root) {

    const result = [];

    traversal(root);

    return result;

    function traversal(node) {
        if (!node) return;
        result.push(node.val);
        if (node.left) traversal(node.left);
        if (node.right) traversal(node.right);

    }


};


//94. 二叉树的中序遍历  https://leetcode-cn.com/problems/binary-tree-inorder-traversal/

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
const inorderTraversal = function (root) {

    const result = [];
    traversal(root);
    return result;

    function traversal(node) {

        if (!node) return;

        if (node.left) traversal(node.left);
        result.push(node.val);
        if (node.right) traversal(node.right);


    }


};

//145. 二叉树的后序遍历  https://leetcode-cn.com/problems/binary-tree-postorder-traversal/

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
const postorderTraversal = function (root) {

    const result = [];
    traversal(root);
    return result;

    function traversal(node) {

        if (!node) return;
        if (node.left) traversal(node.left);
        if (node.right) traversal(node.right);
        result.push(node.val);

    }

};


function Node(val, children) {
    this.val = val;
    this.children = children;
}

//589. N 叉树的前序遍历  https://leetcode-cn.com/problems/n-ary-tree-preorder-traversal/

/**
 * @param {Node|null} root
 * @return {number[]}
 */
const preorder = function (root) {

    const result = [];
    traversal(root);

    return result;

    function traversal(node) {

        if (!node) return;
        result.push(node.val);
        for (let i = 0; i < node.children.length; i++) {

            traversal(node.children[i]);
        }

    }


};

//590. N 叉树的后序遍历  https://leetcode-cn.com/problems/n-ary-tree-postorder-traversal/

/**
 * @param {Node|null} root
 * @return {number[]}
 */
const postorder = function (root) {

    const result = [];

    traversal(root);
    return result;

    function traversal(node) {

        if (!node) return;

        for (let i = 0; i < node.children.length; i++) {

            traversal(node.children[i]);

        }

        result.push(node.val);
    }


};

//剑指 Offer 32 - I. 从上到下打印二叉树  https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-lcof/

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 广度优先  借助队列
const levelOrder = function (root) {

    const result = [];
    if (root) {

        const queue = [root];

        while (queue.length > 0) {

            const node = queue.shift();

            result.push(node.val);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);

        }

    }

    return result;

};

//102. 二叉树的层序遍历  https://leetcode-cn.com/problems/binary-tree-level-order-traversal/

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
const levelOrder2 = function (root) {

    const result = new map();

    if (root) {

        const queue = [];


    }





};