//最长递增子序列
//扑克牌
// https://zhuanlan.zhihu.com/p/78224512#:~:text=%E4%BA%8C%E5%88%86%E6%9F%A5%E6%89%BE%E8%A7%A3%E6%B3%95
export function lis(arr) {

    //存放的是arr索引
    const result = [0];
    const prevRecord = {};

    for (let i = 0; i < arr.length; i++) {

        const value = arr[i];

        // -1 是需要挂载的节点，不要参与递增序列的查找
        if (value !== -1) {

            const maxValueOfIndex = result[result.length - 1];

            // 比当前最大的值大，那么必然是递增的
            // 扑克牌 另起一堆，当前没有能存放的牌堆,要记录起堆时 前面一堆便于后续查找
            if (value > arr[maxValueOfIndex]) {

                result.push(i);
                prevRecord[i] = maxValueOfIndex;

            } else {
                // 因为前面数组已经有序了，进行二分查找，找到第一个大于等于的值 替换
                //找能符合放牌规则（只能压到比自己大的牌之上）的最左侧牌堆

                let left = 0;
                let right = result.length - 1;

                while (left < right) {

                    let mid = Math.floor((left + right) / 2);

                    if (value > arr[result[mid]]) {

                        left = mid + 1;

                    } else {

                        right = mid;

                    }

                }

                //此时 value  小于等于 中间值 (left= right)
                //小于替换， 等于 不改变

                if (value < arr[result[left]]) {

                    //把 之前保存的替换前的 前驱节点在 arr中的index 也保存下来，用于后续追溯
                    prevRecord[i] = prevRecord[result[left]];

                    result[left] = i;

                }


            }


        }


    }


    // 倒叙 追溯

    let j = result.length - 1;
    const res = [result[j]];

    for (; j > 0; j--) {

        const prev = prevRecord[result[j]];

        res.unshift(prev);

    }


    return res;

}

        // 0   1  2  3  4  5  6     7
// const a = [10, 9, 2, 5, 3, 7, 101, 18];

//2 3 7 18   index:  2 4 5 7

//2 3 7 101  index: 2 4 5 6

// console.log(lis(a));