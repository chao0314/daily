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

