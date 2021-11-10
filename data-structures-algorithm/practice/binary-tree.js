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


// 二叉树 前序遍历 非递归

const preorderTraversal1 = function (root) {

    const result = [];
    const stack = [];

    if (root) {

        while (root) {

            result.push(root.val);

            stack.push(root);
            root = root.left

        }


        while (stack.length > 0) {

            const top = stack.pop();
            const right = top.right;

            if (right) {

                stack.push(right);

                result.push(right.val);

                let left = right.left
                while (left) {

                    result.push(left.val);
                    stack.push(left);
                    left = left.left;

                }

            }

        }


    }
    return result;


}


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

    const result = [];
    const cache = new Map();


    if (root) {

        const queue = [root];
        cache.set(root, 0);

        while (queue.length > 0) {

            const node = queue.shift();

            const curLevel = cache.get(node);

            const levelNodes = result[curLevel] || [];

            levelNodes.push(node.val);

            result[curLevel] = levelNodes;

            cache.delete(node);


            if (node.left) {

                queue.push(node.left);
                cache.set(node.left, curLevel + 1);
            }
            if (node.right) {
                queue.push(node.right);
                cache.set(node.right, curLevel + 1);
            }


        }


    }

    return result;
};

//剑指 Offer 32 - III. 从上到下打印二叉树 III
// https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-iii-lcof/

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
const levelOrder3 = function (root) {

    const result = [];

    if (root) {

        const cache = new Map();
        const queue = [root];
        cache.set(root, 0);

        while (queue.length > 0) {

            const node = queue.shift();
            const level = cache.get(node);
            const levelNodes = result[level] || [];
            levelNodes.push(node.val);
            result[level] = levelNodes;
            cache.delete(node);

            if (node.left) {

                queue.push(node.left);
                cache.set(node.left, level + 1);

            }
            if (node.right) {

                queue.push(node.right);
                cache.set(node.right, level + 1);
            }


        }

        for (let i = 0; i < result.length; i++) {

            if (i % 2 === 1) result[i] = result[i].reverse();


        }


    }


    return result;


};

// 429. N 叉树的层序遍历  https://leetcode-cn.com/problems/n-ary-tree-level-order-traversal/

/**
 * @param {Node|null} root
 * @return {number[][]}
 */
const levelOrder4 = function (root) {

    const result = [];

    if (root) {

        const queue = [root];
        const cache = new Map();
        cache.set(root, 0);

        while (queue.length > 0) {

            const node = queue.shift();
            const level = cache.get(node);
            const levelNodes = result[level] || [];
            levelNodes.push(node.val);
            result[level] = levelNodes;
            cache.delete(node);

            if (node.children && node.children.length > 0) {

                for (let i = 0; i < node.children.length; i++) {
                    const child = node.children[i];
                    queue.push(child);
                    cache.set(child, level + 1);
                }

            }

        }


    }

    return result;

};

// 513. 找树左下角的值 https://leetcode-cn.com/problems/find-bottom-left-tree-value/
/**
 * @param {TreeNode} root
 * @return {number}
 */
const findBottomLeftValue = function (root) {

    let result = -1;
    let maxHeight = 0;
    if (root) {

        const queue = [root];
        const cache = new Map([[root, 0]]);

        while (queue.length > 0) {

            const node = queue.shift();

            const level = cache.get(node);
            cache.delete(node);

            if (node.left) {

                queue.push(node.left);
                cache.set(node.left, level + 1);
                if (level + 1 > maxHeight) {
                    maxHeight = level + 1;
                    result = node.left.val;
                }

            }
            if (node.right) {
                queue.push(node.right);
                cache.set(node.right, level + 1);
                // 同层 left 已经处理了 不会再处理，除非 同层 没有严格的左节点，只有这一个右节点 作为最左的节点
                if (level + 1 > maxHeight) {
                    maxHeight = level + 1;
                    result = node.right.val;
                }

            }
            if (!node.left && !node.right && level === 0) {
                // 只有一个根节点
                result = root.val;

            }


        }


    }

    return result;

};

// 每层自右向左层序遍历  完整遍历完 最后一个 必然是 左下角的节点

const findBottomLeftValue2 = function (root) {

    if (root) {
        const queue = [root];
        let result;
        while (queue.length > 0) {

            const node = queue.shift();

            result = node.val;

            if (node.right) queue.push(node.right);
            if (node.left) queue.push(node.left);

        }


        return result;

    }


};


//104. 二叉树的最大深度

//https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/

/**
 * @param {TreeNode} root
 * @return {number}
 */
const maxDepth = function (root) {

    let depth = 0;
    if (root) {

        depth++;

        const leftDepth = maxDepth(root.left);
        const rightDepth = maxDepth(root.right);

        depth += Math.max(leftDepth, rightDepth);

    }

    return depth;


};

//559. N 叉树的最大深度
//https://leetcode-cn.com/problems/maximum-depth-of-n-ary-tree/

/**
 * @param {Node|null} root
 * @return {number}
 */
const maxDepth2 = function (root) {

    let depth = 0;

    if (root) {

        depth++

        const childDepth = [];

        for (let i = 0; i < root.children.length; i++) {

            const child = root.children[i];
            childDepth[i] = maxDepth2(child);
        }

        if (childDepth.length > 0) depth += Math.max(...childDepth);


    }

    return depth;


};


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
const convertBST = function (root) {

    let sum = 0;

    if (root) {

        iterator(root);

    }

    return root;

    function iterator(node) {


        if (!node) return;

        iterator(node.right);

        sum += node.val;

        node.val = sum;

        iterator(node.left);


    }


};


//面试题 04.06. 后继者
//https://leetcode-cn.com/problems/successor-lcci/

// 看作是 二叉树 的中序遍历
// 而不是二叉查找树 更贴切 一些

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @return {TreeNode}
 */
const inorderSuccessor = function (root, p) {

    let result;
    let next;


    if (root) {

        inorder(root)
    }

    return next;

    function inorder(node) {

        if (!node || next) return;


        inorder(node.left);

        if (result && !next) next = node;


        if (node.val === p.val) {

            result = node;

        }


        inorder(node.right);


    }


};


