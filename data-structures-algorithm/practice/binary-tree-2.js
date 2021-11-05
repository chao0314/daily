import {counterSlice} from "../../react practice/redux-toolkit/my-app/src/features/counter/counterSlice";

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

//近似两个链表合并
const mergeTrees = function (root1, root2) {

    if (!root1) return root2;
    if (!root2) return root1;

    const treeNode = new TreeNode(root1.val + root2.val);

    treeNode.left = mergeTrees(root1.left, root2.left);
    treeNode.right = mergeTrees(root1.right, root2.right);

    return treeNode;

};

//226. 翻转二叉树
//https://leetcode-cn.com/problems/invert-binary-tree/

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
const invertTree = function (root) {

    if (root) {

        const temp = root.left;

        root.left = invertTree(root.right);

        root.right = invertTree(temp);


    }


    return root;


};


//101. 对称二叉树
//https://leetcode-cn.com/problems/symmetric-tree/

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
const isSymmetric = function (root) {


    if (root) {

        return checkSymmetric(root.left, root.right);

    }


    return false;

    function checkSymmetric(left, right) {

        // null     null
        if (!left && !right) return true;

        if (left && right && left.val === right.val) {

            return checkSymmetric(left.left, right.right) && checkSymmetric(left.right, right.left);
        }

        return false;


    }

}

// 错误 订正

//98. 验证二叉搜索树
//https://leetcode-cn.com/problems/validate-binary-search-tree/

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
const isValidBST = function (root) {

    if (!root) return false;
    let isValid = true;

    checkTreeValid(root);


    return isValid;

    function checkTreeValid(root) {

        //已经是无效的 直接退出 不需要继续 递归 ，剪枝 优化
        if (!root || !isValid) return isValid;

        let min = root.val;
        let max = root.val;
        const midVal = root.val;
        // 递归收集每个子树的最小值 最大值

        if (root.left) {

            // 根据二叉树的特性  越往底层 数值越小(left)、大(right)
            const result = checkTreeValid(root.left);
            if (isValid) {
                const [subMin, subMax] = result
                if (subMax >= midVal) return isValid = false;
                else min = subMin;
            } else return isValid


        }

        if (root.right) {
            const result = checkTreeValid(root.right);
            if (isValid) {
                const [subMin, subMax] = result;
                if (subMin <= midVal) return isValid = false;
                else max = subMax;
            } else return isValid;


        }


        return [min, max];


    }
}

//剑指 Offer 54. 二叉搜索树的第k大节点
//https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof/

/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
const kthLargest = function (root, k) {

    let count = 0;
    let result;
    if (root) {

        deep(root);

    }

    return result;

    function deep(root) {

        if (root.right) {

            deep(root.right);

        }

        if (count === k) return result;
        count++;
        if (count === k) result = root.val

        if (root.left) {

            deep(root.left);
        }


    }


};

//538. 把二叉搜索树转换为累加树
//https://leetcode-cn.com/problems/convert-bst-to-greater-tree/

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
const convertBST = function(root) {


};

