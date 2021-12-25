class Heap {

    constructor(compare, count) {

        this.count = count;
        this.store = [void 0];
        // 从 1 开始便于计算
        this.index = 1;
        if (!compare instanceof Function) throw  new Error("compare need be function");
        this.compare = compare;

    }


    buildHeap(arr) {

        this.store = this.store.concat(arr);

        this.index = this.store.length;


        //倒叙 建堆 效率高 O(n)
        for (let i = this.store.length; i > 0; i--) {

            this.topToDownHeapify(i);

        }


    }


    sort() {

        let index = this.index;

        while (--this.index > 1) {

            this.swap(1, this.index);

            this.topToDownHeapify();

        }

        this.index = index;

        return this.store;

    }

    swap(indexA, indexB) {

        const temp = this.store[indexA];

        this.store[indexA] = this.store[indexB];

        this.store[indexB] = temp;

    }


    //自底向上 堆化 O(nlogn)
    downToTopHeapify() {

        let lastIndex = this.index - 1;
        let parentIndex = Math.floor(lastIndex / 2);

        // 默认是小顶堆
        while (lastIndex > 0 && this.compare(this.store[parentIndex], this.store[lastIndex]) > 0) {

            this.swap(parentIndex, lastIndex);
            lastIndex = parentIndex;
            parentIndex = Math.floor(lastIndex / 2);
        }

    }


    //自顶向下 堆化  优化  O(n)
    topToDownHeapify(parentIndex = 1) {

        // console.log("----index---", this.index)

        // console.log("parentIndex----", parentIndex);

        while (parentIndex < this.index) {

            // console.log("parentIndex****", parentIndex);

            let index = parentIndex;
            let childIndex = parentIndex * 2;

            if (childIndex < this.index && this.compare(this.store[parentIndex], this.store[childIndex]) > 0) {
                index = childIndex;
                // 两个子节点都大/小  选最后一个
                if (childIndex + 1 < this.index && this.compare(this.store[childIndex], this.store[childIndex + 1]) > 0) index = childIndex + 1;

            } else if (childIndex + 1 < this.index && this.compare(this.store[parentIndex], this.store[childIndex + 1]) > 0) index = childIndex + 1;


            // 不需要堆化

            // console.log("parentIndex---index", parentIndex, index);
            if (parentIndex === index) return;
            this.swap(parentIndex, index);
            parentIndex = index;

        }
    }

    insert(element) {

        if (this.count && this.index > this.count) throw new Error("store full")
        else {

            this.store[this.index++] = element;

            //堆化 调整
            this.downToTopHeapify();
        }

    }

    remove() {

        if (this.index >= 1) {

            const top = this.peek();

            this.swap(1, --this.index);

            //堆化 调整
            this.topToDownHeapify();

            // 剔除0 便于堆化 操作
            if (this.index === 0) this.index = 1;

            return top;
        } else throw new Error("store empty");


    }

    peek() {

        return this.store[1];

    }

    size() {

        return this.index - 1;
    }


}


// 堆排序  原地  不稳定  nlog(n)

//小顶堆
// const hp1 = new Heap((a, b) => a - b);
// hp1.buildHeap([4, 7, 6, 3, 2, 8, 5]);
// console.log(hp1.store)
// hp1.buildHeap([1]);
// console.log(hp1.store);
// // hp1.remove();
// // console.log(hp1.store)
// // hp1.sort();
// // console.log(hp1.store)
// hp1.insert(1);
// console.log(hp1.store)
// hp1.sort();
// console.log(hp1.store)


// const min = new Heap((a, b) => a - b);
// const max = new Heap((a, b) => b - a);
//
// max.insert(1);
// min.insert(2);
// console.log(max.store, min.store);
// min.insert(3);
// console.log(min.store);
// const val = min.remove();
// console.log("val---", val);
// max.insert(val);
// console.log("------",max.store, min.store);
// console.log(max.peek(),"--size----",max.size(), min.size());

//23. 合并K个升序链表
//https://leetcode-cn.com/problems/merge-k-sorted-lists/

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */

function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

//借助小顶堆
const mergeKLists = function (lists) {


    const minHeap = new Heap((a, b) => a - b);

    const head = new ListNode();
    let tail = head;


    //建堆
    for (let i = 0; i < lists.length; i++) {

        const list = lists[i];

        const values = [];

        let p = list;
        while (p) {
            values.push(p.val);
            p = p.next
        }

        if (values.length > 0) minHeap.buildHeap(values);


    }


    console.log(minHeap.store);


    while (minHeap.size() > 0) {

        tail.next = new ListNode(minHeap.remove());

        tail = tail.next;

    }


    return head.next;


};


// console.log(mergeKLists([[-1,1],[-3,1,4],[-2,-1,0,2]]))

// const hp = new Heap((a, b) => a - b);
//
// // hp.buildHeap([-1, 1, -3, 1]);
// hp.buildHeap([-1,1]);
// hp.buildHeap([-3,1,4]);
// hp.buildHeap([-2,-1,0,2]);
// console.log(hp.store);
// hp.sort();
// console.log(hp.store)

//347. 前 K 个高频元素
//https://leetcode-cn.com/problems/top-k-frequent-elements/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

//借助 大 顶堆  和 hash表
const topKFrequent = function (nums, k) {

    const result = [];
    if (!nums.length > 0) return result;
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {

        const key = nums[i];
        const value = map.get(key) || 0;
        map.set(key, value + 1);
    }

    const maxHeap = new Heap(([, valueA], [, valueB]) => valueB - valueA);


    maxHeap.buildHeap(Array.from(map.entries()));


    for (let i = 0; i < k; i++) {

        result.push(maxHeap.remove()[0]);
    }

    return result;

};


// console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2));

//295. 数据流的中位数
//https://leetcode-cn.com/problems/find-median-from-data-stream/

// 维护两个堆  大顶堆 存放  n/2  或者 n/2 + 1 个数据 根据总数是奇数还是偶数不同
// 小顶堆  存放 n/2 个数据
// 总数是奇数的情况 中位数是 大顶堆 堆顶  n/2 + 1
//总数是偶数的情况 中位数是  （大顶堆堆顶 + 小顶堆堆顶）/2
const MedianFinder = function () {

    this.count = 0;
    this.minHeap = new Heap((a, b) => a - b);
    this.maxHeap = new Heap((a, b) => b - a);
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {

    const maxTop = this.maxHeap.peek();

    if (this.maxHeap.size() === 0 || num < maxTop) this.maxHeap.insert(num);
    else this.minHeap.insert(num);
    this.count++;

    const half = Math.floor(this.count / 2);

    if (this.count % 2 === 0) {

        while (this.maxHeap.size() > half) {

            this.minHeap.insert(this.maxHeap.remove());
        }


    } else {

        while (this.maxHeap.size() > half + 1) {
            this.minHeap.insert(this.maxHeap.remove());
        }

    }

    while (this.minHeap.size() > half) {

        this.maxHeap.insert(this.minHeap.remove());


    }

};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {

    if (this.count % 2 === 0) return (this.maxHeap.peek() + this.minHeap.peek()) / 2;

    return this.maxHeap.peek();

};


// const mf = new MedianFinder();
//
// mf.addNum(1);
// mf.addNum(2);
// console.log("XXXXXX", mf.maxHeap.store, mf.minHeap.store)
// mf.addNum(3);
// console.log("=====", mf.maxHeap.store, mf.minHeap.store)

