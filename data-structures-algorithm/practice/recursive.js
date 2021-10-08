//剑指 Offer 10- I. 斐波那契数列  https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/

/**
 * @param {number} n
 * @return {number}
 */

const fibMemo = {};
const fib = function (n) {
    if (n === 0) return 0
    if (n === 1) return 1;
    let result = fibMemo[n];
    if (!result) {
        result = fib(n - 1) + fib(n - 2);
        fibMemo[n] = result;
    }

    return result % 1000000007;

};

//剑指 Offer 10- II. 青蛙跳台阶问题 https://leetcode-cn.com/problems/qing-wa-tiao-tai-jie-wen-ti-lcof/

/**
 * @param {number} n
 * @return {number}
 */
const waysMemo = {}
const numWays = function (n) {

    if (n === 0) return 1;
    if (n === 1) return 1;

    let result = waysMemo[n];
    if (!result) {
        result = numWays(n - 1) + numWays(n - 2);
        waysMemo[n] = result;

    }
    return result % 1000000007;

};

//面试题 08.01. 三步问题  https://leetcode-cn.com/problems/three-steps-problem-lcci/

/**
 * @param {number} n
 * @return {number}
 */
const stepMemo = {};
const waysToStep = function (n) {

    if (n === 0) return 1;
    if (n === 1) return 1;
    if (n === 2) return 2;
    if (n === 3) return 4;
    let result = stepMemo[n];
    if (!result) {
        result = waysToStep(n - 1) + waysToStep(n - 2) + waysToStep(n - 3);
        stepMemo[n] = result;

    }

    return result % 1000000007;
};


//剑指 Offer 06. 从尾到头打印链表  https://leetcode-cn.com/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof/

/**
 * @param {ListNode} head
 * @return {number[]}
 */
const reversePrint = function (head) {

    const result = [];
    if (!head) return result;

    function reverse(head) {

        if (head.next) {
            reverse(head.next);
        }
        result.push(head.val);

    }

    reverse(head);

    return result;

};

// 剑指 Offer 24. 反转链表 https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/
/**
 * Definition for singly-linked list.
 function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */

const reverseList = function (head) {

    const newHead = new ListNode();
    let tail = newHead;
    if (!head) return newHead.next;

    function reverse(head) {

        if (head.next) {

            reverse(head.next)
        }
        tail.next = new ListNode(head.val);
        tail = tail.next;

    }

    reverse(head);

    return newHead.next;

};

//剑指 Offer 25. 合并两个排序的链表  https://leetcode-cn.com/problems/he-bing-liang-ge-pai-xu-de-lian-biao-lcof/

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const mergeTwoLists = function (l1, l2) {

    const head = new ListNode();
    let tail = head;
    let h1 = l1;
    let h2 = l2;

    function merge(h1, h2) {
        if (h1 && h2) {
            if (h1.val <= h2.val) {
                tail.next = new ListNode(h1.val);
                h1 = h1.next;
            } else {
                tail.next = new ListNode(h2.val);
                h2 = h2.next;
            }
            tail = tail.next;

            merge(h1, h2);

        } else {
            while (h1) {
                tail.next = new ListNode(h1.val);
                tail = tail.next;
                h1 = h1.next;
            }

            while (h2) {
                tail.next = new ListNode(h2.val);
                tail = tail.next;
                h2 = h2.next;
            }

        }


    }

    merge(h1, h2);


    return head.next;


};

//剑指 Offer 16. 数值的整数次方 https://leetcode-cn.com/problems/shu-zhi-de-zheng-shu-ci-fang-lcof/

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
const myPow = function (x, n) {


    if (n === 0) return 1;
    else if (n > 0) {
        //奇数
        if (n % 2 === 1) return x * myPow(x, n - 1);
        //偶数
        if (n % 2 === 0) return myPow(x * x, n / 2);

    } else if (n < 0) {

        return 1 / (x * myPow(x, -n - 1));

    }


};

const myPow2 = function (x, n) {

    if (n === 0) return 1;
    if (n === 1) return x;
    if (n === 2) return x * x;

    if (n > 0) {

        const half = myPow(x, Math.floor(n / 2));
        if (n % 2 === 0) return half * half;
        else return half * half * x;

    } else if (n < 0) return 1 / (x * myPow(x, -n - 1));


}

//面试题 08.05. 递归乘法 https://leetcode-cn.com/problems/recursive-mulitply-lcci/

/**
 * @param {number} A
 * @param {number} B
 * @return {number}
 */
const multiply = function (A, B) {

    if (B === 0) return 0;
    if (B === 1) return A;
    if (B === 2) return A + A;
    if (B === 3) return A + A + A;
    return A + multiply(A, B - 1);

};


const multiply2 = function (A, B) {

    if (A === 0 || B === 0) return 0;
    if (A === 1) return B;
    if (B === 1) return A;


    const min = Math.min(A, B);
    const max = Math.max(A, B);

    const half = multiply(Math.floor(min / 2), max);

    if (min % 2 === 0) return half + half;
    else return half + half + max;

};