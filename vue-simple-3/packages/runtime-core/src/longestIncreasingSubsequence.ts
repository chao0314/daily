// longest increasing subsequence
//最长递增子序列 是vue 3 为了减少 dom 节点复用时的移动次数而采用的

/*
*  a b c d
*  e f b c g
*
* b c 不需要进行 dom 移动
*
* lis 算法 借助 贪心思想和二分查找 实现 O(nlogn)的时间复杂度
* 贪心找到当前阶段的最优解，最后倒序回溯每个阶段的最优解，从而得到整体结果
* */


export function getLIS(arr, ignoreValue = -1) {

    const length = arr.length;
    //子序列中 对于原来数组下标的记录
    const indexResult = [0];
    //原数组中每个位置的元素，对于其在子序列中的前一个元素位置下标的记录
    const indexToPreIndexMap = new Array(length).fill(0);
    let start, middle, end;

    for (let i = 0; i < length; i++) {

        const curArrValue = arr[i];
        if (curArrValue === ignoreValue) continue;
        const lastIndexOfIndexResult = indexResult[indexResult.length - 1];
        const lastValueOfIndexResult = arr[lastIndexOfIndexResult];
        if (curArrValue > lastValueOfIndexResult) {
            indexResult.push(i);
            //记录当前下标的 前一个下标值，用于最后回溯 各阶段最优解
            indexToPreIndexMap[i] = lastIndexOfIndexResult;
            continue;

        }

        // curArrValue <= lastValueOfIndexResult
        //此时需要二分查找 替换
        start = 0;
        end = indexResult.length - 1;

        while (start < end) {

            middle = Math.floor((end - start) / 2);
            const middleValueOfIndexResult = arr[indexResult[middle]];
            if (curArrValue > middleValueOfIndexResult) {

                start = middle + 1;

            } else {
                //<=

                end = middle;

            }


        }


        // start === end
        // curArrValue 相等不用动，小于要替换
        if (curArrValue < arr[indexResult[end]]) {

            //替换 原来的下标
            indexResult[end] = i;
            // start === 0  不用标记  -1下标无意义
            //记录当前下标的 前一个下标值，用于最后回溯 各阶段最优解
            if (start > 0) indexToPreIndexMap[i] = start - 1;


        }


    }


    //倒序回溯 各个阶段的最优解

    // console.log(arr);
    // console.log(indexResult)
    // console.log(indexToPreIndexMap);

    let len = indexResult.length;
    let curIndex = indexResult[len - 1];

    while (len > 0) {
        indexResult[len - 1] = curIndex;
        // 往前追溯 当时最优解的前一个下标值
        curIndex = indexToPreIndexMap[curIndex];
        len--;

    }


    // 返回 包含最长递增子序列的传入数组的下标
    return indexResult;


}


// const t = [6,4,5,-1]
//
// console.log(getLIS(t, -1));
//[1,2]



