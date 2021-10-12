//704. 二分查找 https://leetcode-cn.com/problems/binary-search/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search = function (nums, target) {

    let left = 0;
    let right = nums.length - 1;


    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midVal = nums[mid];
        if (midVal === target) return mid;

        if (midVal > target) right = mid - 1;
        else left = mid + 1;

    }

    return -1;


};

//374. 猜数字大小 https://leetcode-cn.com/problems/guess-number-higher-or-lower/

/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return                -1 if num is lower than the guess number
 *                         1 if num is higher than the guess number
 *                       otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 */

const guessNumber = function (n) {

    let left = 1;
    let right = n;


    while (left <= right) {

        const mid = Math.floor((left + right) / 2);

        const result = guess(mid);

        if (result === 0) return mid;
        if (result === 1) left = mid + 1;
        if (result === -1) right = mid - 1;
    }

};


//744. 寻找比目标字母大的最小字母  https://leetcode-cn.com/problems/find-smallest-letter-greater-than-target/

/**
 * @param {string []} letters
 * @param {string} target
 * @return {string}
 */
const nextGreatestLetter = function (letters, target) {

    const len = letters.length;
    let left = 0;
    let right = len - 1;


    while (left <= right) {

        const mid = Math.floor((left + right) / 2);

        if (letters[mid] === target) {

            if (mid < len - 1) {
                // 处理重复字母的情况  a b b c
                if (letters[mid + 1].charCodeAt(0) > target.charCodeAt(0)) return letters[mid + 1];
                else left = mid + 1;

            } else return letters[0];

        } else if (letters[mid].charCodeAt(0) < target.charCodeAt(0)) {

            // 最后一个也小  循环 取 数组第一个
            if (mid < len - 1) left = mid + 1
            else return letters[0];

        } else {

            if (mid === 0) return letters[0];

            if (letters[mid - 1].charCodeAt(0) < target.charCodeAt(0)) return letters[mid];

            else right = mid - 1;


        }


    }


};

//35. 搜索插入位置  https://leetcode-cn.com/problems/search-insert-position/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const searchInsert = function (nums, target) {

    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {

        const mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) return mid;

        else if (nums[mid] > target) {

            if (mid === 0) return 0;
            if (nums[mid - 1] < target) return mid;
            right = mid - 1;

        } else {

            if (mid === nums.length - 1) return nums.length;
            if (nums[mid + 1] > target) return mid + 1;
            left = mid + 1;

        }


    }

};

//34. 在排序数组中查找元素的第一个和最后一个位置
// https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const searchRange = function (nums, target) {

    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {

        const mid = Math.floor((left + right) / 2);
        const midVal = nums[mid];
        if (midVal === target) {

            left = right = mid;
            while (left > 0) {

                if (nums[left - 1] === target) left--;
                else break;

            }

            while (right < nums.length - 1) {

                if (nums[right + 1] === target) right++;
                else break;
            }

            return [left, right];


        } else if (midVal > target) right = mid - 1;

        else left = mid + 1;
    }


    return [-1, -1];

};

//面试题 10.05. 稀疏数组搜索
//https://leetcode-cn.com/problems/sparse-array-search-lcci/

/**
 * @param {string[]} words
 * @param {string} s
 * @return {number}
 */
const findString = function (words, s) {

    let left = 0;
    let right = words.length - 1;

    while (left <= right) {

        const mid = Math.floor((left + right) / 2);

        const midVal = words[mid];

        if (midVal) {

            if (midVal === s) return mid;
            if (midVal < s) left = mid + 1;
            else right = mid - 1;


        } else {

            if (words[left] === s) return left;
            else left++;
        }


    }

    return -1;

};


// console.log(findString()

//33. 搜索旋转排序数组
//https://leetcode-cn.com/problems/search-in-rotated-sorted-array/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search2 = function (nums, target) {

    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {

        const mid = Math.floor((left + right) / 2);

        const value = nums[mid];

        if (value === target) return mid;

        // 左侧有序
        if (value >= nums[left]) {

            if (value > target && nums[left] <= target) right = mid - 1;
            // 左侧肯定没有  右侧找
            else left = mid + 1;

            // 右侧有序
        } else {
            if (value < target && nums[right] >= target) left = mid + 1;

            else right = mid - 1;
        }


    }


    return -1;

};

// console.log(search2([4, 5, 6, 7, 0, 1, 2], 0))

//153. 寻找旋转排序数组中的最小值
//https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/

/**
 * @param {number[]} nums
 * @return {number}
 */
const findMin = function (nums) {

    let left = 0;
    let right = nums.length;

    let

    while (left<=right){

        const mid =  Math.floor((left+right)/2);
        const midVal =  nums[mid];



    }


};