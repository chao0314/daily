function ListNode(val, next) {
    this.val = val;
    this.next = next;
}


function createLinkedList(nodes = []) {


    let head = new ListNode();
    let tail = head;
    for (let i = 0; i < nodes.length; i++) {

        tail.next = new ListNode(nodes[i]);

        tail = tail.next;
    }

    return head.next;


}


function linkedListIterator(head, cb) {

    let p = head;
    while (p) {
        const val = p.val;
        cb && cb(val);
        console.log(val);
        p = p.next;

    }


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

    let slow = head;
    let fast = head.next;
    let count = 2;
    //找到中间节点
    while (fast) {
        slow = slow.next;
        if (fast.next && fast.next.next) {
            fast = fast.next.next;
            count += 2;
        } else {
            if (fast.next) count++;
            fast = null;
        }

    }

    let nextHalf;
    let prevHalf = head;
    //根据奇数偶数处理中间节点特殊情况
    if (count % 2 === 1) nextHalf = slow.next;
    else nextHalf = slow;
    //翻转节点
    nextHalf = reverseList(nextHalf);
    while (prevHalf && nextHalf) {
        if (prevHalf.val !== nextHalf.val) return false;
        prevHalf = prevHalf.next;
        nextHalf = nextHalf.next;
    }

    return true;


};

//328. 奇偶链表 https://leetcode-cn.com/problems/odd-even-linked-list/
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const oddEvenList = function (head) {

    if (!head || !head.next) return head;
    let oddPre;
    let odd = head;
    let evenPre;
    let even = head.next;
    const evenHead = head.next;

    while (odd || even) {
        let oddTemp;
        let evenTemp;
        if (odd) {
            if (!oddPre) oddPre = odd;
            else oddTemp = odd;
            odd = (odd.next && odd.next.next) || null;
        }
        if (even) {
            if (!evenPre) evenPre = even;
            else evenTemp = even;
            even = (even.next && even.next.next) || null;
        }

        //最后赋值否则原来的链就断开了
        if (oddTemp) {
            oddPre.next = oddTemp;
            oddPre = oddPre.next;
        }
        if (evenTemp) {
            evenPre.next = evenTemp;
            evenPre = evenPre.next;

        }

    }

    //奇数偶数链表拼接起来
    oddPre.next = evenHead;
    evenPre.next = null;


    return head;


};

// let link = createLinkedList([1, 2, 3, 4, 5])
// // linkedListIterator(link);
// linkedListIterator(oddEvenList(link));

//25. K 个一组翻转链表  https://leetcode-cn.com/problems/reverse-nodes-in-k-group/
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
const reverseKGroup = function (head, k) {

    const reverseList = function (head) {
        const newHead = new ListNode();
        let p = head;
        let tail;
        while (p) {

            let next = newHead.next;
            newHead.next = new ListNode(p.val, next);
            if (!next) tail = newHead.next;
            p = p.next;

        }

        return [newHead.next, tail];
    };
    let p = head;
    let count = 0;
    let nextHead = head;
    let prevTail;
    let newHead;
    while (p) {
        count++;

        if (count % k === 0) {
            const head = nextHead;
            nextHead = p.next;
            //与后面断开
            p.next = null;
            p = nextHead;
            const [reversedHead, reversedTail] = reverseList(head);

            if (newHead && prevTail) {

                prevTail.next = reversedHead;

            } else {

                newHead = reversedHead;
            }

            prevTail = reversedTail;

        } else {

            p = p.next
        }


    }

    if (nextHead) prevTail.next = nextHead;

    return newHead;


};

// let head = createLinkedList([1, 2, 3, 4, 5])
// // linkedListIterator(link);
// linkedListIterator(reverseKGroup(head, 2));

//剑指 Offer 22. 链表中倒数第k个节点 https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
const getKthFromEnd = function (head, k) {
    let count = 0;
    let p = head;

    while (p) {
        count++;
        p = p.next;
    }
    let index = 0;
    p = head;
    while (p) {

        if (index++ === count - k) return p;

        p = p.next;
    }


};

//19. 删除链表的倒数第 N 个结点 https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
const removeNthFromEnd = function (head, n) {

    let count = 0;
    const newHead = new ListNode(null, head);
    let slow = newHead;
    let fast = newHead.next;

    while (fast) {

        if (count === n) {
            slow = slow.next;
        } else {
            count++;
        }

        fast = fast.next;

    }

    slow.next = slow.next.next;

    return newHead.next;


};