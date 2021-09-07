//84. 柱状图中最大的矩形 https://leetcode-cn.com/problems/largest-rectangle-in-histogram/

//在一维数组中对每一个数找到第一个比自己小的元素。这类“在一维数组中找第一个满足某种条件的数”的场景就是典型的单调栈应用场景。
/**
 * @param {number[]} heights
 * @return {number}
 */

//主旨思想 是以 高固定，往左右 分别找到 小于这个高的边界，从而固定这个矩形

const largestRectangleArea = function (heights) {

    const LEFT_GUARD = -1;
    const RIGHT_GUARD = heights.length;
    const leftIndexes = [];
    const rightIndexes = [];

    for (let i = 0; i < heights.length; i++) {

        if (leftIndexes.length === 0) leftIndexes.push(i);
        else {
            const leftMaxVal = heights[leftIndexes[leftIndexes.length - 1]];


        }


        const cueH = heights[i];


    }


};