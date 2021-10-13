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

    const len = nums.length;
    let left = 0;
    let right = len - 1;

    if (len === 1) return nums[0];
    while (left <= right) {

        const mid = Math.floor((left + right) / 2);
        const midVal = nums[mid];
        // 1 2 3递增有序  3 2 1 递减有序
        if ((mid === 0 && midVal < nums[mid + 1]) || (mid === len - 1 && midVal < nums[mid - 1])) return midVal;
        // 命中
        if (nums[mid - 1] > midVal && midVal < nums[mid + 1]) return midVal;
        //  右侧 找  1 2 3 4 ×     3 4 1 2 √    4 3 2 1 √
        if (midVal > nums[right]) left = mid + 1;

        else right = mid - 1;


    }

    return -1;

};

//852. 山脉数组的峰顶索引  https://leetcode-cn.com/problems/peak-index-in-a-mountain-array/

/**
 * @param {number[]} arr
 * @return {number}
 */
const peakIndexInMountainArray = function (arr) {

    const len = arr.length;
    let left = 0;
    let right = len - 1;

    while (left <= right) {

        const mid = Math.floor((left + right) / 2);
        // 0  右侧找
        if (mid === 0) left = mid + 1;
        // len-1  左侧找
        else if (mid === len - 1) right = mid - 1;
        // 命中
        else if (arr[mid] > arr[mid - 1] && arr[mid] > arr[mid + 1]) return mid;
        // 上坡 右侧找
        else if (arr[mid] > arr[mid - 1]) left = mid + 1;
        else right = mid - 1;

    }

    return -1


};

// console.log(peakIndexInMountainArray([3, 5, 3, 2, 0]))

//162. 寻找峰值 https://leetcode-cn.com/problems/find-peak-element/

/**
 * @param {number[]} nums
 * @return {number}
 */
const findPeakElement = function (nums) {

    const len = nums.length;
    let left = 0;
    let right = len - 1;

    if (len === 1) return 0;

    while (left <= right) {

        const mid = Math.floor((left + right) / 2);
        const midVal = nums[mid];

        if (mid === 0) {

            // 倒序 上坡 最前
            if (midVal > nums[mid + 1]) return mid;
            else left = mid + 1;

        } else if (mid === len - 1) {

            // 正序 上坡 最后
            if (midVal > nums[mid - 1]) return mid;
            else right = mid - 1;
        } else if (midVal > nums[mid - 1] && midVal > nums[mid + 1]) return mid;
        // 上坡
        else if (midVal < nums[mid + 1]) left = mid + 1;
        else right = mid - 1;

    }

    return -1;


};

//367. 有效的完全平方数  https://leetcode-cn.com/problems/valid-perfect-square/

/**
 * @param {number} num
 * @return {boolean}
 */
const isPerfectSquare = function (num) {

    if (num <= 1) return true;

    let left = 1;
    let right = Math.floor(num / 2);

    while (left <= right) {

        const mid = Math.floor((left + right) / 2);
        const value = mid * mid;
        if (value === num) return true;
        if (value > num) right = mid - 1;
        else left = mid + 1;

    }

    return false;

};

//69. Sqrt(x)  https://leetcode-cn.com/problems/sqrtx/

/**
 * @param {number} x
 * @return {number}
 */
const mySqrt = function (x) {

    if (x <= 1) return x;

    let left = 1;
    let right = Math.floor(x / 2);

    while (left <= right) {

        const mid = Math.floor((left + right) / 2);

        const value = mid * mid;
        if (value === x) return mid;
        if (value < x) {

            if ((mid + 1) * (mid + 1) > x) return mid;
            else left = mid + 1;

        } else if (value > x) {

            if ((mid - 1) * (mid - 1) < x) return mid - 1;
            else right = mid - 1;

        }

    }

};


// console.log(mySqrt(4));

//74. 搜索二维矩阵
//https://leetcode-cn.com/problems/search-a-2d-matrix/

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
// 核心是 二维数组 看成是 一维数组 进行查找
const searchMatrix = function (matrix, target) {

    const row = matrix.length;
    const col = matrix[0].length;

    let left = 0;

    let right = row * col - 1;

    while (left <= right) {
        // mid 是下标
        const mid = Math.floor((left + right) / 2);
        const curR = Math.ceil((mid + 1) / col);
        const curC = (mid + 1) - (curR - 1) * col;
        const value = matrix[curR - 1][curC - 1];

        if (value === target) return true;
        if (value < target) left = mid + 1;
        else right = mid - 1;

    }

    return false;

};


// console.log(searchMatrix([[1]], 1));