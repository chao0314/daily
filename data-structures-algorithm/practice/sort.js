let arr = [1, '3', 3, 6, 5, 2, 7, 4];

// 冒泡  核心 ：两两交换  原地 O(n2)
function bubble(arr) {

    for (let i = 0; i < arr.length - 1; i++) {

        for (let j = 0; j < arr.length - 1 - i; j++) {

            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

            }

        }


    }

    return arr;


}

// console.log(bubble(arr));


// 每次选择剩下的最小的  O(n2) 不稳定 原地
// 选择的时候 可能会交换数值的位置 导致相等数值的相对位置改变

function selectionSort(arr) {

    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                const temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }

        }

    }
    return arr;
}


// console.log(selectionSort(arr));


//插入排序 将未排序的数据，插入到已排序的数据中
//O(n2) 原地 稳定

function insertionSort(arr) {
    // 要插入的数值
    for (let i = 1; i < arr.length; i++) {
        const insert = arr[i];
        //已经排好序的数值
        for (let j = i - 1; j >= 0; j--) {
            if (insert < arr[j]) {
                //挨个后移，留出空，后续放入数值
                arr[j + 1] = arr[j];
            } else {
                arr[j + 1] = insert;
                break;
            }
        }


    }

    return arr;

}

// console.log(insertionSort(arr));

// 归并排序 O(nlogn)  非原地 需要申请空间 O(n) 稳定
// 1 对折划分 2 两个有序数组合并
//先分，后合 ，合的时候排序

function mergeSort(arr, left, right) {

    if (left >= right) return;
    const middle = Math.floor((left + right) / 2);

    mergeSort(arr, left, middle);
    mergeSort(arr, middle + 1, right);

    merge(arr, left, middle, right);

    return arr;

    function merge(arr, left, middle, right) {
        const temp = [];
        let pLeft = left;
        let pRight = middle + 1;

        while (pLeft <= middle && pRight <= right) {

            const leftV = arr[pLeft];
            const rightV = arr[pRight];

            if (leftV <= rightV) {
                temp.push(leftV);
                pLeft++;
            } else {
                temp.push(rightV);
                pRight++;
            }

        }

        while (pLeft <= middle) {
            temp.push(arr[pLeft++]);
        }

        while ((pRight <= right)) {
            temp.push(arr[pRight++]);
        }

        for (let i = 0; i < temp.length; i++) {

            arr[left + i] = temp[i];

        }


    }

}

// console.log(mergeSort(arr, 0, arr.length - 1));


//快速排序 原地 不稳定 时间复杂度 O(nlogn) 空间复杂度 o(logn) 性能比 堆排序好
//选择基准点 分大小，递归分治排序，组合时不需要做排序
// 先分 后合，分的时候排序


function quickSort(arr, left, right) {

    if (left < right) {

        const partitionIndex = getPartitionIndex(arr, left, right);
        // 左侧 小值 排序
        quickSort(arr, left, partitionIndex - 1);
        // 右侧 大值 排序
        quickSort(arr, partitionIndex + 1, right);

    }


    return arr;

    function getPartitionIndex(arr, left, right) {
        const flag = arr[right];

        while (left < right) {

            while (left < right && arr[left] <= flag) {
                left++;
            }

            // 因为选最后一个最为参照点，而且循环结束后 会对参照点特殊处理，所以此时 left 可以直接赋值覆盖
            if (left < right) {
                arr[right] = arr[left];
                right--;
                //left 不 -- ，不动是为了后续 right直接覆盖

            }


            while (left < right && arr[right] > flag) {
                right--;
            }

            //左右 交换
            if (left < right) {
                //此时的left 在上面也已经用过了，可以直接赋值覆盖
                arr[left] = arr[right];
                left++;
                //right 不 -- ，不动是为了后续 left直接覆盖
            }


        }

        // left === right
        arr[left] = flag;
        return left;

    }


}

// console.log(quickSort(arr, 0, arr.length - 1));

//面试题 10.01. 合并排序的数组
//https://leetcode-cn.com/problems/sorted-merge-lcci/
/**
 * @param {number[]} A
 * @param {number} m
 * @param {number[]} B
 * @param {number} n
 *
 */

// 插入排序
const merge = function (A, m, B, n) {

    for (let i = 0; i < B.length; i++) {

        const valueB = B[i];

        for (let j = m - 1; j >= -1; j--) {

            const valueA = A[j];

            if (valueA !== undefined && valueA > valueB) {

                A[j + 1] = valueA;

            } else {
                A[j + 1] = valueB;
                m++;
                break;

            }
        }


    }

    return A;

};


// console.log(merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3))
// console.log(merge([0, 0, 3, 0, 0, 0, 0, 0, 0], 3, [-1], 1))


//242. 有效的字母异位词
//https://leetcode-cn.com/problems/valid-anagram/

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isAnagram = function (s, t) {

    const sortS = s.split("").sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).join("");
    const sortT = t.split("").sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).join("");

    return sortS === sortT;


};


// console.log(isAnagram("anagram", "nagaram"))


//1502. 判断能否形成等差数列
//https://leetcode-cn.com/problems/can-make-arithmetic-progression-from-sequence/

/**
 * @param {number[]} arr
 * @return {boolean}
 */

const canMakeArithmeticProgression = function (arr) {

    if (arr.length > 2) {
        const sortArr = arr.sort((a, b) => a - b);
        let diff = sortArr[1] - sortArr[0];
        for (let i = 2; i < sortArr.length; i++) {

            if (sortArr[i] - sortArr[i - 1] !== diff) return false;

        }
    }

    return true;

};

//252. 会议室
//https://leetcode-cn.com/problems/meeting-rooms/


/**
 * @param {number[][]} intervals
 * @return {boolean}
 */
const canAttendMeetings = function (intervals) {

    if (intervals.length > 1) {

        const sortIntervals = intervals.sort(([a,], [b,]) => a - b);
        for (let i = 0; i < sortIntervals.length - 1; i++) {

            if (sortIntervals[i][1] > sortIntervals[i + 1][0]) return false
        }
    }
    return true;

};

//56. 合并区间
//https://leetcode-cn.com/problems/merge-intervals/
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */

// 区间排序后， 如果前一个区间的结束 大于等于 后一个区间的开始就进行合并
const mergeIntervals = function (intervals) {

    if (intervals.length < 2) return intervals;
    const sorted = intervals.sort(([a,], [b,]) => a - b);
    for (let i = 0; i < sorted.length - 1; i++) {

        const intervalOne = sorted[i];
        const intervalTwo = sorted[i + 1];

        if (intervalOne[1] >= intervalTwo[0]) {

            intervals[i] = null;
            if (intervalOne[1] >= intervalTwo[1]) intervals[i + 1] = intervalOne;
            else intervals[i + 1] = [intervalOne[0], intervalTwo[1]];
        }


    }

    return intervals.filter(interval => interval);


};


//剑指 Offer 21. 调整数组顺序使奇数位于偶数前面
//https://leetcode-cn.com/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof/
/**
 * @param {number[]} nums
 * @return {number[]}
 */
const exchange = function (nums) {

    let left = 0;
    let right = nums.length - 1;

    while (left < right) {

        while (left < right && nums[left] % 2 === 1) left++;

        while (left < right && nums[right] % 2 === 0) right--;

        const temp = nums[left];
        nums[left] = nums[right];
        nums[right] = temp;


    }

    return nums;


};


// console.log(exchange([1, 2, 3, 4]))

//75. 颜色分类
//https://leetcode-cn.com/problems/sort-colors/
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 实现一个排序
// 快排
const sortColors = function (nums) {


    quickSort(nums, 0, nums.length - 1);

    return nums;


    function quickSort(nums, left, right) {


        if (left < right) {

            const partitionIndex = getPartitionIndex(nums, left, right);

            quickSort(nums, left, partitionIndex - 1);

            quickSort(nums, partitionIndex + 1, right);


        }

        function getPartitionIndex(nums, left, right) {

            const flag = nums[right];


            while (left < right) {

                while (left < right && nums[left] <= flag) left++;

                if (left < right) nums[right--] = nums[left];

                while (left < right && nums[right] > flag) right--;

                if (left < right) nums[left++] = nums[right];

            }

            // left === right
            nums[left] = flag;
            return left;


        }


    }


};


//交换 两次
/*
* @param {number[]} nums
* */
const sortColors2 = function (nums) {

    let left = 0;
    let right = nums.length - 1;

    while (left < right) {

        while (left < right && nums[left] !== 2) left++
        while (left < right && nums[right] === 2) right--
        if (left < right) swap(nums, left++, right--);


    }

    left = 0;

    if (nums[right] === 2) right--;

    while (left < right) {

        if (nums[left] === 0) {
            left++;
            continue;

        }
        if (nums[right] === 1) {

            right--;
            continue;
        }

        if (left < right) swap(nums, left++, right--);

    }


    return nums;

    function swap(nums, left, right) {

        const temp = nums[left];
        nums[left] = nums[right];
        nums[right] = temp;
    }


}


// console.log(sortColors([2, 0, 2, 1, 1, 0]))
// console.log(sortColors2([2, 0, 2, 1, 1, 0]))
// console.log(sortColors2([1, 0]))
// console.log(sortColors2([1, 2]))


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

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

//147. 对链表进行插入排序
//https://leetcode-cn.com/problems/insertion-sort-list/

/**
 * @param {ListNode} head
 * @return {ListNode}
 */

const insertionSortList = function (head) {

    const dummyHead = new ListNode();

    let p = head;

    if (!head || !head.next) return head;

    while (p) {
        let sortedP = dummyHead;
        const pVal = p.val;

        while (sortedP.next) {

            if (sortedP.next.val < pVal) {

                sortedP = sortedP.next;

            } else break;

        }

        const next = sortedP.next;
        sortedP.next = p;
        // sortedP.next = new ListNode(p.val, next);
        const pTemp = p;
        p = p.next;
        pTemp.next = next;

        /*
         const next = sortedP.next;
        sortedP.next = p;
        sortedP.next = new ListNode(p.val, next);
        p = p.next;
        * */

    }

    return dummyHead.next;

};

//148. 排序链表
//https://leetcode-cn.com/problems/sort-list/
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

// 链表 归并排序
const sortList = function (head) {


    return mergeSort(head, null);


    function mergeSort(head, tail = null) {

        if (!head) return head;
        if (head.next === tail) {
            head.next = null;
            return head;
        }
        let slow = head;
        let fast = head;

        while (fast !== tail) {
            slow = slow.next;
            fast = fast.next;
            if (fast !== tail) fast = fast.next;
        }

        const middle = slow;

        return merge(mergeSort(head, middle), mergeSort(middle, tail));


        function merge(headOne, headTwo) {

            const dummyHead = new ListNode();
            let dummyP = dummyHead;

            let pOne = headOne;
            let pTwo = headTwo;
            while (pOne && pTwo) {

                if (pOne.val <= pTwo.val) {
                    dummyP.next = pOne
                    pOne = pOne.next;
                } else {
                    dummyP.next = pTwo
                    pTwo = pTwo.next;
                }


                dummyP = dummyP.next;

            }

            if (pOne) dummyP.next = pOne;

            if (pTwo) dummyP.next = pTwo;

            return dummyHead.next;

        }


    }


};

// 非递归 归并 自底向上
const sortList2 = function (head) {

    const len = getLen(head);
    let step = 1;
    while (step < len) {

        const newHead = new ListNode();
        let newTail = newHead;
        let p = head;

        // 以 step 为步长的 多轮合并
        while (p) {

            let count = 0;
            const left = p;

            while (count < step && p) {
                p = p.next;
                count++;
            }

            // 本轮 结束
            // 已经没有右侧 需要合并了，直接添加到尾部即可

            if (!p) {
                newTail.next = left;
                break;
            }

            count = 0;
            const middle = p;

            while (count < step && p) {
                p = p.next;
                count++;
            }

            const right = p;

            // console.log("+++++", left.val, "--", middle.val, "--", right)
            const {head, tail} = merge(left, middle, right);

            // console.log("----", head.val, tail.val)

            newTail.next = head;
            newTail = tail;
            p = right;


        }


        head = newHead.next;
        step *= 2;


    }


    return head;


    function merge(left, middle, right) {

        const newHead = new ListNode();
        let newP = newHead;

        let leftP = left;
        let rightP = middle;

        // 断开联系


        while (leftP !== middle && rightP !== right) {

            if (leftP.val <= rightP.val) {

                newP.next = leftP;
                leftP = leftP.next;

            } else {

                newP.next = rightP;
                rightP = rightP.next;
            }

            newP = newP.next;

        }

        while (leftP !== middle) {
            newP.next = leftP;
            leftP = leftP.next;
            newP = newP.next;

        }

        while (rightP !== right) {
            newP.next = rightP;
            rightP = rightP.next;
            newP = newP.next
        }
        newP.next = null;
        return {head: newHead.next, tail: newP};

    }


    function getLen(head) {
        let count = 0;
        while (head) {
            count++;
            head = head.next;
        }

        return count;
    }


}


const list = createLinkedList([4, 2, 1, 3]);
//
// console.log(sortList(list))
console.log(sortList2(list))

//215. 数组中的第K个最大元素
//https://leetcode-cn.com/problems/kth-largest-element-in-an-array/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
//借助 快排
const findKthLargest = function (nums, k) {


    return quickSelect(nums, 0, nums.length - 1, k);


    function quickSelect(nums, left, right, k) {

        if (k >= 0 && left <= right && right >= k - 1) {

            const partitionIndex = getPartitionIndex(nums, left, right);

            if (partitionIndex === k - 1) return nums[partitionIndex];
            if (partitionIndex > k - 1) return quickSelect(nums, left, partitionIndex - 1, k);
            if (partitionIndex < k - 1) return quickSelect(nums, partitionIndex + 1, right, k);

        }


        function getPartitionIndex(nums, left, right) {

            const flag = nums[right];

            while (left < right) {

                while (left < right && nums[left] > flag) left++;

                if (left < right) nums[right--] = nums[left];

                while (left < right && nums[right] <= flag) right--;

                if (left < right) nums[left++] = nums[right];


            }

            nums[left] = flag;

            return left;


        }


    }


};


// console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2));
// console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4));


//面试题 17.14. 最小K个数
//https://leetcode-cn.com/problems/smallest-k-lcci/

/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
const smallestK = function (arr, k) {

    if (k <= 0) return [];
    if (arr.length <= k) return arr;

    return quickSelect(arr, 0, arr.length - 1, k);

    function quickSelect(nums, left, right, k) {

        if (left <= right && right >= k - 1) {

            const partitionIndex = getPartitionIndex(nums, left, right);

            if (partitionIndex === k - 1) return nums.slice(0, partitionIndex + 1);
            if (partitionIndex > k - 1) return quickSelect(nums, left, partitionIndex - 1, k);
            if (partitionIndex < k - 1) return quickSelect(nums, partitionIndex + 1, right, k);

        }


        function getPartitionIndex(nums, left, right) {

            const flag = nums[right];

            while (left < right) {

                while (left < right && nums[left] <= flag) left++;

                if (left < right) nums[right--] = nums[left];

                while (left < right && nums[right] > flag) right--;

                if (left < right) nums[left++] = nums[right];


            }

            nums[left] = flag;

            return left;


        }
    }


};

// console.log(smallestK([1, 3, 5, 7, 2, 4, 6, 8], 4))

//剑指 Offer 51. 数组中的逆序对
//https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof/

/**
 * @param {number[]} nums
 * @return {number}
 */

//借助 归并排序
const reversePairs = function (nums) {

    if (nums <= 1) return 0;
    let globalResult = 0;

    mergeResolve(nums, 0, nums.length - 1);


    return globalResult;

    function mergeResolve(nums, left, right) {

        if (left < right) {

            const middle = Math.floor((left + right) / 2);

            mergeResolve(nums, left, middle);
            mergeResolve(nums, middle + 1, right);

            merge(nums, left, middle, right);

        }


    }

    function merge(nums, left, middle, right) {

        let lp = left;
        let rp = middle + 1;
        const temp = [];

        while (lp <= middle && rp <= right) {

            const leftV = nums[lp];
            const rightV = nums[rp];

            if (leftV <= rightV) {

                temp.push(leftV);
                // 在这之前有几个 右侧的，那就是这个左侧数值的逆序对
                globalResult += (rp - middle - 1);

                lp++;

            } else {
                temp.push(rightV);
                rp++;

            }


        }

        while (lp <= middle) {

            temp.push(nums[lp]);

            globalResult += (rp - middle - 1);
            lp++;

        }

        while (rp <= right) {

            temp.push(nums[rp++]);
        }


        for (let i = 0; i < temp.length; i++) {

            nums[left + i] = temp[i];
        }


    }


};


// console.log(reversePairs([7, 5, 6, 4]))