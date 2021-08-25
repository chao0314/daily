function ListNode(val, next) {
    this.val = val;
    this.next = next;
}

//203. 移除链表元素 https://leetcode-cn.com/problems/remove-linked-list-elements/
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 *
 */

const removeElements = function (head, val) {

    let p = head
    let newHead = new ListNode();
    let tail = newHead;

    while (p) {

        if (p.val !== val) {

            tail.next = p;
            tail = tail.next;
        }

        p = p.next;


    }
    tail.next = null;

    return newHead.next;

};


//876. 链表的中间结点  https://leetcode-cn.com/problems/middle-of-the-linked-list/

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const middleNode = function (head) {

    let slow = head;
    let fast = head.next;

    while (fast) {
        slow = slow.next;
        fast = (fast.next && fast.next.next) || null;
    }

    return slow

};

//83. 删除排序链表中的重复元素 https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const deleteDuplicates = function (head) {

    const newHead = new ListNode();
    newHead.next = head;
    let prev = head;
    while (prev) {
        const next = prev.next;
        if (next && prev.val === next.val) prev.next = next.next;
        else prev = next;

    }

    return newHead.next;


};

//剑指 Offer 25. 合并两个排序的链表 https://leetcode-cn.com/problems/he-bing-liang-ge-pai-xu-de-lian-biao-lcof/

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const mergeTwoLists = function (l1, l2) {

    const head = new ListNode();
    let tail = head;
    let p1 = l1;
    let p2 = l2;

    while (p1 && p2) {

        if (p1.val <= p2.val) {

            tail.next = p1;
            p1 = p1.next;

        } else {

            tail.next = p2;
            p2 = p2.next;
        }
        tail = tail.next;

    }

    if (p1) tail.next = p1;
    if (p2) tail.next = p2;

    return head.next;


};


//2. 两数相加 https://leetcode-cn.com/problems/add-two-numbers/

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = function (l1, l2) {

    const head = new ListNode();
    let tail = head;
    let flag = 0;
    let p1 = l1;
    let p2 = l2;

    while (p1 || p2) {

        const v1 = p1 ? p1.val : 0;
        const v2 = p2 ? p2.val : 0;

        const val = v1 + v2 + flag;
        flag = Math.floor(val / 10);
        tail.next = new ListNode(val - flag * 10);
        if (p1) p1 = p1.next;
        if (p2) p2 = p2.next;
        tail = tail.next;
    }

    if (flag) tail.next = new ListNode(flag);

    return head.next;

};

//206. 反转链表 https://leetcode-cn.com/problems/reverse-linked-list/

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const reverseList = function (head) {
    const newHead = new ListNode();
    let p = head;
    while (p) {

        let next = newHead.next;
        newHead.next = new ListNode(p.val, next);
        p = p.next;

    }

    return newHead.next;
};

//234. 回文链表 https://leetcode-cn.com/problems/palindrome-linked-list/


/**
 * @param {ListNode} head
 * @return {boolean}
 */
const isPalindrome = function (head) {




};