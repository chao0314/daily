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
    let newP = newHead;

    while (p) {

        if (p.val !== val) {

            newP.next = p;
            newP = newP.next;
        }

        p = p.next;


    }
    newP.next = null;

    return newHead.next;

};


//876. 链表的中间结点  https://leetcode-cn.com/problems/middle-of-the-linked-list/

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const middleNode = function (head) {

    let slow = head;
    let fast = head;

    while (fast) {
        slow = slow.next;
        fast = (fast.next && fast.next.next) || null;
    }

    return  slow

};