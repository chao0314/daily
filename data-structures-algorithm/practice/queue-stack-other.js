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
    const orderStack = [];
    let maxArea = 0;


    for (let i = 0; i < heights.length; i++) {

        const curH = heights[i];
        while (orderStack.length > 0) {
            const leftIndex = orderStack[orderStack.length - 1];
            const leftMaxH = heights[leftIndex];
            if (leftMaxH >= curH) {
                //弹出，栈顶值比当前值大或等于，无影响，后续再找矮墙时，也会被当前值隔开，当前值是更靠近
                orderStack.pop();
            } else {
                //找到最近的  小于柱子的矮墙，记录
                leftIndexes[i] = leftIndex;
                break;
            }

        }
        // 左侧所有的柱子 都不小于当前值,或者当前为初始值
        if (orderStack.length === 0) leftIndexes[i] = LEFT_GUARD;
        orderStack.push(i);

    }
    //清空 单调栈
    orderStack.length = 0;
    for (let i = RIGHT_GUARD - 1; i >= 0; i--) {

        const curH = heights[i];
        while (orderStack.length > 0) {
            const rightIndex = orderStack[orderStack.length - 1];
            const rightMaxH = heights[rightIndex];
            if (rightMaxH >= curH) {
                //弹出，栈顶值比当前值大，无影响，后续再找矮墙时，也会被当前值隔开，当前值是更靠近
                orderStack.pop();
            } else {
                //找到第一个矮墙，记录
                rightIndexes[i] = rightIndex;
                break;
            }

        }
        // 左侧所有的柱子 都不小于当前值，或者当前为初始值
        if (orderStack.length === 0) rightIndexes[i] = RIGHT_GUARD;
        orderStack.push(i);

    }
    // console.log(leftIndexes, rightIndexes)

    for (let j = 0; j < leftIndexes.length; j++) {

        let leftIndex = leftIndexes[j];
        let rightIndex = rightIndexes[j];
        const width = rightIndex - leftIndex - 1;
        const height = heights[j]

        maxArea = Math.max(maxArea, width * height);

    }

    return maxArea;


};


let heights = [1,1];

console.log(largestRectangleArea(heights));