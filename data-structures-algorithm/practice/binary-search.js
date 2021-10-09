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


