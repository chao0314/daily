import {patchStyle} from "../../vue-simple-3/packages/runtime-dom/src/patch/patchStyle";
import componentInstanceProxyHandler from "../../vue-simple-3/packages/runtime-core/src/componentInstanceProxyHandler";

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

//






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


    if (postorder.length <= 1) return true;
    return verify(postorder, 0, postorder.length - 1);


    function verify(postorder, left, right) {


        if (left >= right) return true;
        const root = postorder[right];

        //找到左右子树分割点 也就是第一个比 root 大的节点

        let i = left;

        while (i < right && postorder[i] < root) i++;

        let j = i;

        while (j < right) {

            if (postorder[j] < root) return false;

            j++;

        }


        // 检验 左树
        const leftVerify = verify(postorder, left, i - 1);

        if (!leftVerify) return false;

        //检验 右树
        const rightVerify = verify(postorder, i, right - 1);


        return rightVerify


    }


};


//543. 二叉树的直径
//https://leetcode-cn.com/problems/diameter-of-binary-tree/

/**
 * @param {TreeNode} root
 * @return {number}
 */

// 转化为递归求 左 右 子树的最大深度，那么，左子树的最大深度  +  右子树的最大深度  = 树的最大直径
const diameterOfBinaryTree = function (root) {

    let diameter = 0;

    if (root) deep(root);

    return diameter;


    function deep(root) {

        if (root) {

            const leftMaxDepth = deep(root.left);
            const rightMaxDepth = deep(root.right);

            const curDiameter = leftMaxDepth + rightMaxDepth;

            if (curDiameter > diameter) diameter = curDiameter;

            return 1 + Math.max(leftMaxDepth, rightMaxDepth);

        }


        return 0;


    }


};


//剑指 Offer 34. 二叉树中和为某一值的路径
// https://leetcode-cn.com/problems/er-cha-shu-zhong-he-wei-mou-yi-zhi-de-lu-jing-lcof/

/**
 * @param {TreeNode} root
 * @param {number} target
 * @return {number[][]}
 */

// 递归 判断每个叶子节点 判断是否满足条件
const pathSum = function (root, target) {

    const result = [];
    const path = [];

    if (root) traversal(root, 0);
    return result;


    function traversal(root, pathSum) {

        if (root) {

            pathSum += root.val;
            path.push(root.val);

            if (!root.left && !root.right) {

                if (pathSum === target) result.push(path.slice(0));

                path.pop();

                return;
            }

            if (root.left) traversal(root.left, pathSum);

            if (root.right) traversal(root.right, pathSum);

            // 这个节点都遍历过了 弹出路径中的该节点

            path.pop();

        }

    }

};

// 订正

//124. 二叉树中的最大路径和
// https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/

/**
 * @param {TreeNode} root
 * @return {number}
 */

// 因为不需要一定过根节点 那么 实际上是求 以任意节点为 转折点（局部根节点） 的情况下 路径和的最大值
// 递归 计算每个转折点的 路径和，与当前最大值进行比较
// 路径和 是指 左 (可选)+ 中间  + 右（可选）  可选 是因为负数就不要了
const maxPathSum = function (root) {

    // 来源于题目的设定的边界值
    let result = -10001;

    deep(root);

    return result;

    function deep(root) {

        let sum = 0;

        if (root) {

            const val = root.val;
            sum += val;

            const leftSum = deep(root.left);
            const rightSum = deep(root.right);
            //左侧非负，有价值
            if (leftSum > 0) sum += leftSum;
            //右侧非负，有价值
            if (rightSum > 0) sum += rightSum;

            if (sum > result) result = sum;

            // 当前节点退出，那么其作为 左/右 某侧分支的存在只需要返回某个路径和的最大值
            // 同时要考虑 左右子树 路径和为负值的情况
            if (leftSum > 0 && rightSum > 0) return val + Math.max(leftSum, rightSum);

            if (leftSum > 0) return val + leftSum;

            if (rightSum > 0) return val + rightSum;


        }

        return sum;


    }


};


//437. 路径总和 III
//https://leetcode-cn.com/problems/path-sum-iii/

/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
const pathSum3 = function (root, targetSum) {

    let result = 0;
    const cache = new Set();
    const rootCache = new Set();
    deep(root);

    return result;


    function deep(root, parentSum) {

        if (root) {

            const val = root.val;

            //单个节点 既符合条件，但是要排除重复计算的情况

            if (val === targetSum && !cache.has(root)) {

                result++;
                // console.log('---cur---', val);
                cache.add(root);

            }

            // 判断条件排除 初始根节点 否则 会向下执行两遍
            // console.log("parentSum", parentSum, "val", val)
            if (parentSum !== void 0) {

                if (parentSum + val === targetSum) {

                    // console.log('+++cur+++', parentSum, val);
                    result++
                }

                deep(root.left, parentSum + val);
                deep(root.right, parentSum + val);
            }


            // 排除以 该节点为 局部根节点 即起点的重复遍历
            if (!rootCache.has(root)) {

                rootCache.add(root);
                deep(root.left, val);

                deep(root.right, val);


            }


        }


    }


};































