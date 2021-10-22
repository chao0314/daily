//1. 两数之和 https://leetcode-cn.com/problems/two-sum/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function (nums, target) {

    const hash = new Map();

    for (let i = 0; i < nums.length; i++) hash.set(nums[i], i);

    for (let j = 0; j < nums.length; j++) {

        const value = target - nums[j];

        const matchIndex = hash.get(value);

        if (matchIndex && matchIndex !== j) return [j, matchIndex];


    }


}

// 15. 三数之和 https://leetcode-cn.com/problems/3sum/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
const threeSum = function (nums, target = 0) {

    const hash = new Map();
    const result = [];
    // 排序 为了后面 排除重复的结果
    // 重复的放在一起
    nums = nums.sort((a, b) => a - b);

    for (let i = 0; i < nums.length; i++) hash.set(nums[i], i);

    for (let j = 0; j < nums.length; j++) {

        //避免 a 重复 ,a 已经用过了
        if (j !== 0 && nums[j] === nums[j - 1]) continue;

        for (let k = j + 1; k < nums.length; k++) {

            // 重复的 b 跳过， 第二轮 b 已经用过了， k ！== j+1 是因为 允许重复的数字  [-1 -1 2] 可以
            if (k !== j + 1 && nums[k] === nums[k - 1]) continue;

            const value = target - nums[k] - nums[j];

            const matchIndex = hash.get(value);

            // matchIndex  >k 保证不重复，matchIndex 是从 k 后面的 排序序列中选取的，  1 2 5   1 5 2 重复
            if (matchIndex && matchIndex > k) result.push([nums[j], nums[k], nums[matchIndex]]);

        }


    }


    return result;
};


function ListNode(val, next) {
    this.val = val;
    this.next = next;
}

// 160. 相交链表
// https://leetcode-cn.com/problems/intersection-of-two-linked-lists/

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
const getIntersectionNode = function (headA, headB) {

    const set = new Set();

    while (headA) {

        set.add(headA);
        headA = headA.next;
    }

    while (headB) {

        if (set.has(headB)) return headB;
        else headB = headB.next;
    }

    return null;

};

//141. 环形链表  https://leetcode-cn.com/problems/linked-list-cycle/

/**
 * @param {ListNode} head
 * @return {boolean}
 */
const hasCycle = function (head) {

    const set = new Set();

    while (head) {

        if (set.has(head)) return true;
        else {

            set.add(head);
            head = head.next;
        }

    }

    return false;


};

//面试题 02.01. 移除重复节点 https://leetcode-cn.com/problems/remove-duplicate-node-lcci/

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const removeDuplicateNodes = function (head) {

    const set = new Set();
    let newHead = new ListNode();
    let p = newHead;
    while (head) {

        if (!set.has(head.val)) {
            set.add(head.val);
            p.next = head;
            head = head.next;
            p = p.next;
            p.next = null;
        } else head = head.next;


    }

    return newHead.next;

};

//面试题 16.02. 单词频率  https://leetcode-cn.com/problems/words-frequency-lcci/

/**
 * @param {string[]} book
 */
const WordsFrequency = function (book) {

    this.hash = new Map();

    for (let i = 0; i < book.length; i++) {

        const word = book[i];
        const count = this.hash.get(word) || 0;
        this.hash.set(word, count + 1);
    }

};

/**
 * @param {string} word
 * @return {number}
 */
WordsFrequency.prototype.get = function (word) {

    return this.hash.get(word) || 0;

};

//面试题 01.02. 判定是否互为字符重排  https://leetcode-cn.com/problems/check-permutation-lcci/

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
const CheckPermutation = function (s1, s2) {

    const hash = new Map();

    for (let i = 0; i < s1.length; i++) {

        const char = s1[i];
        const count = hash.get(char) || 0;
        hash.set(char, count + 1);

    }

    for (let j = 0; j < s2.length; j++) {

        const char = s2[j];
        const count = hash.get(char);
        if (!count) return false;
        else {
            if (count === 1) hash.delete(char);
            else hash.set(char, count - 1);
        }

    }

    return hash.size === 0;


};


//剑指 Offer 03. 数组中重复的数字  https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/

/**
 * @param {number[]} nums
 * @return {number}
 */
const findRepeatNumber = function (nums) {

    const set = new Set();

    for (let i = 0; i < nums.length; i++) {

        const value = nums[i];
        if (set.has(value)) return value;
        else set.add(value);

    }


};

//242. 有效的字母异位词 https://leetcode-cn.com/problems/valid-anagram/

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isAnagram = function (s, t) {

    const hash = new Map();

    for (let i = 0; i < s.length; i++) {

        const value = s[i];
        const count = hash.get(value) || 0;
        hash.set(value, count + 1);

    }


    for (let j = 0; j < t.length; j++) {

        const char = t[j];
        const count = hash.get(char);
        if (!count) return false;
        if (count === 1) hash.delete(char);
        else hash.set(char, count - 1);

    }

    return hash.size === 0;

};

//49. 字母异位词分组  https://leetcode-cn.com/problems/group-anagrams/

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
const groupAnagrams = function (strs) {

    const hash = new Map();

    for (let i = 0; i < strs.length; i++) {

        let s = strs[i];
        if (s.length > 1) s = s.split("").sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).join("");


        let match = hash.get(s);

        if (match) match.push(strs[i]);
        else match = [strs[i]]
        hash.set(s, match);

    }

    return Array.from(hash.values());


};


// console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))

//136. 只出现一次的数字 https://leetcode-cn.com/problems/single-number/

/**
 * @param {number[]} nums
 * @return {number}
 */
const singleNumber = function (nums) {

    const hash = new Map();


    for (let i = 0; i < nums.length; i++) {

        const key = nums[i];
        const count = hash.get(key) || 0;
        hash.set(key, count + 1);

    }

    for (let [key, value] of hash) {

        if (value === 1) return key

    }

};


//349. 两个数组的交集  https://leetcode-cn.com/problems/intersection-of-two-arrays/

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
const intersection = function (nums1, nums2) {

    const hash = new Map();

    for (let i = 0; i < nums1.length; i++) hash.set(nums1[i], 1);

    for (let j = 0; j < nums2.length; j++) {

        const key = nums2[j]
        const count = hash.get(key) || 0;

        if (count) hash.set(key, count + 1);

    }

    for (let [key, count] of hash) if (count === 1) hash.delete(key);

    return Array.from(hash.keys());


};

//1122. 数组的相对排序  https://leetcode-cn.com/problems/relative-sort-array/

/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
const relativeSortArray = function (arr1, arr2) {

    const hash = new Map();
    const result = [];

    for (let i = 0; i < arr1.length; i++) {

        const key = arr1[i];
        const count = hash.get(key) || 0;
        hash.set(key, count + 1);
    }


    for (let j = 0; j < arr2.length; j++) {

        const key = arr2[j];

        const count = hash.get(key);
        hash.delete(key)
        for (let k = 0; k < count; k++) result.push(key);

    }

    const entry = Array.from(hash.entries()).sort(([key1,], [key2,]) => key1 - key2);

    for (let [key, value] of entry) {

        for (let l = 0; l < value; l++) result.push(key);

    }

    return result;


};

//706. 设计哈希映射  https://leetcode-cn.com/problems/design-hashmap/

const MyHashMap = function () {

    this.SLOTS_COUNT = 1024;
    this.slots = [];


};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
MyHashMap.prototype.put = function (key, value) {

    const hashKey = this.hash(key);
    const slot = this.slots[hashKey];

    if (slot) {

        let p = slot;
        let prev = slot;

        while (p) {

            const entry = p.val;

            // 删除
            if (entry.key === key) {

                prev.next = p.next;

            } else {

                prev = p;

            }

            p = p.next;


        }


        prev.next = new ListNode({key, value});


    } else {

        const head = new ListNode();
        head.next = new ListNode({key, value});
        this.slots[hashKey] = head;
    }


};

/**
 * @param {number} key
 * @return {number}
 */
MyHashMap.prototype.get = function (key) {

    const hashKey = this.hash(key);

    const slot = this.slots[hashKey];

    if (slot) {

        let p = slot;

        while (p) {

            const entry = p.val;
            if (entry.key === key) return entry.value;
            p = p.next;
        }

    }

    return -1;


};

/**
 * @param {number} key
 * @return {void}
 */
MyHashMap.prototype.remove = function (key) {

    const hashKey = this.hash(key);
    const slot = this.slots[hashKey];
    if (slot) {

        let p = slot;
        let prev = slot;
        while (p) {
            const entry = p.val;
            if (entry.key === key) {
                prev.next = p.next;
                return;
            } else {

                prev = p;
                p = p.next;
            }

        }

    }

};


MyHashMap.prototype.hash = function (key) {

    return key % this.SLOTS_COUNT;

};


//146. LRU 缓存机制  https://leetcode-cn.com/problems/lru-cache/

function DoubleLinkedNode(key, value, prev, next) {

    this.key = key;
    this.value = value;
    this.prev = prev;
    this.next = next;
}


/**
 * @param {number} capacity
 */
var LRUCache = function (capacity = 100) {

    this.size = 0;
    this.capacity = capacity;
    this.map = new Map();
    this.head = new DoubleLinkedNode();
    this.tail = new DoubleLinkedNode();
    this.head.next = this.tail;
    this.tail.prev = this.head;


};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {





};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {





};

LRUCache.prototype.removeNode =  function (node){




}


LRUCache.prototype.addNodeToTail =  function (node){



}


