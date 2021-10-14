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


