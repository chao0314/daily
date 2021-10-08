function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
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


function iterator(head) {

    while (head) {

        console.log(head.val);
        head = head.next;
    }

}

//链表 快速排序

function quickSort(head, tail = null) {

    if (head === tail || !head || !head.next) return head;

    const flag = head;
    // 比 flag小的最后一节点
    //这个节点的 next 开始是 比 flag 大的了
    let leftLast = head;
    let p = head.next;

    while (p !== tail) {

        if (p.val < flag.val) {

            // 找到第一个比 flag 大的 节点
            leftLast = leftLast.next;
            //交换
            swap(leftLast, p);

        }

        p = p.next;

    }

    // 交换 leftLast 和 flag ， 最终形成 小 - flag - 大 的情况

    swap(leftLast, flag);

    quickSort(head, leftLast);

    quickSort(leftLast.next, tail);


    return head;


    function swap(nodeA, nodeB) {

        const temp = nodeA.val;

        nodeA.val = nodeB.val;

        nodeB.val = temp;

    }


}


const list = createLinkedList([4, 2, 1, 3]);


// iterator(quickSort(list, null))


// 非递归 快排

//todo...