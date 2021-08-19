//面试题 01.08. 零矩阵  https://leetcode-cn.com/problems/zero-matrix-lcci/

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
const setZeroes = function (matrix) {

    const zeroColumn = [];
    for (let i = 0; i < matrix.length; i++) {
        const row = matrix[i];
        const tempRow = [];
        for (let j = 0; j < row.length; j++) {
            tempRow[j] = 0;
            if (row[j] === 0) {
                //行置 0
                matrix[i] = tempRow;
                //记录置 0列
                zeroColumn.push(j);
            }

        }
    }

    //列置零

    for (let k = 0; k < zeroColumn.length; k++) {
        const col = zeroColumn[k];
        for (let r = 0; r < matrix.length; r++) {
            matrix[r][col] = 0;

        }

    }

    // return matrix;


};

//剑指 Offer 61. 扑克牌中的顺子 https://leetcode-cn.com/problems/bu-ke-pai-zhong-de-shun-zi-lcof/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
const isStraight = function (nums) {

    // let zeroCount = 0;
    let max;
    let min;
    const record = [];
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        // if (num === 0) zeroCount++;
        // else {
        //     if (!min) min = num;
        //     else if (num < min) min = num;
        //     if (!max) max = num;
        //     else if (num > max) max = num;
        // }

        if (num !== 0) {
            if (record[num]) return false;
            record[num] = true;
            if (!min) min = num;
            else if (num < min) min = num;
            if (!max) max = num;
            else if (num > max) max = num;
        }
    }
    const diff = max - min;

    // if (zeroCount === 0) return diff === 4;
    // else if (zeroCount === 1) return diff === 4 || diff === 3;
    // else if (zeroCount === 2) return diff === 4 || diff === 3 || diff === 2;
    // //扑克牌不能有三个王的 bug
    // else if (zeroCount === 3) return diff === 4 || diff === 3 || diff === 2 || diff === 1;
    // return false;

    return diff <= 4;

};

// const a = [0, 0, 2, 3, 5];
//
// console.log(isStraight(a));


//面试题 16.11. 跳水板 https://leetcode-cn.com/problems/diving-board-lcci/
/**
 * @param {number} shorter
 * @param {number} longer
 * @param {number} k
 * @return {number[]}
 */
const divingBoard = function (shorter, longer, k) {

    const result = [];
    if (k <= 0) return result;
    if (shorter === longer) result.push(shorter * k)
    else {
        for (let i = 0; i <= k; i++) {
            result.push(shorter * (k - i) + longer * i);

        }
    }

    return result;

};

//面试题 01.05. 一次编辑 https://leetcode-cn.com/problems/one-away-lcci/

/**
 * @param {string} first
 * @param {string} second
 * @return {boolean}
 */
const oneEditAway = function (first, second) {

    if (first === second) return true;
    const firstLen = first.length;
    const secondLen = second.length;
    if (Math.abs(firstLen - secondLen) > 1) return false;
    const shortStr = firstLen <= secondLen ? first : second;
    const longStr = firstLen <= secondLen ? second : first;
    if (shortStr.length === 0 && longStr.length === 1) return true;
    let left = 0;
    let right = shortStr.length - 1;
    let lLeft = 0;
    let lRight = longStr.length - 1;
    let leftStop = false;
    let rightStop = false;
    let count = 0
    while (left <= right && count < 2) {

        const sl = shortStr[left];
        const ll = longStr[lLeft];
        const sr = shortStr[right];
        const lr = longStr[lRight];

        if (!leftStop) {
            if (sl !== ll) {
                leftStop = true;
                // 相等的话， 此处字符即使不同 right 已经计算处理过了
                if (left !== right) count++;
                //相等了 可以退出了
                else break;

            }

        }

        if (!rightStop) {
            if (sr !== lr) {
                rightStop = true;
                // 相等的话， 此处字符即使不同 left 已经计算处理过了
                if (left !== right) count++;
                else break;
            }
        }

        //最后处理 ++ -- 是为了避免上面 left right的判断，每次循环内的 lef  right 保持不变

        if (!leftStop) {

            left++;
            lLeft++
        }

        if (!rightStop) {

            right--;
            lRight--;
        }

    }


    const diff = lRight - lLeft;
    console.log(count, diff)
// s 完成后 已经不同的为count 如果 long 剩的的多也不可以
    return (count === 0 && diff <= 1) || (count === 1 && diff === 0);

};

// first = "islander"
// second = "slander"
// // first = "teacher"
// // second = "bleacher"
// // first = "t"
// // second = "b"
// // first = "teacher"
// // second = "teamer"
// console.log(oneEditAway(first, second))


const oneEditAway2 = function (first, second) {

    if (first === second) return true;
    const f = first.length;
    const s = second.length;
    if (Math.abs(f - s) > 1) return false;
    let i = 0
    let j = 0;

    while (i < f && j < s && first[i] === second[j]) {
        i++;
        j++
    }

    // 遇到不同的了
    if (f === s) {
        //f 修改一次
        i++;
        j++;
    }
    // 短的添加一次 即 长的删除一次
    if (f < s) j++;
    // 短的添加一次 即 长的删除一次
    if (f > s) i++;

    //已经 修改 添加 删除 过一次  接下来必须都成功

    while (i < f && j < s) {

        if (first[i] !== second[j]) return false;
        i++;
        j++;
    }

    //都便利完成了

    return true;


}


// let first = "islander"
// let second = "slander"
// let first = "teacher"
// let second = "bleacher"
// let first = "t"
// let second = "b"
// let first = "teacher"
// let second = "teamer"
// console.log("---",oneEditAway2(first, second))

//面试题 16.15. 珠玑妙算  https://leetcode-cn.com/problems/master-mind-lcci/

/**
 * @param {string} solution
 * @param {string} guess
 * @return {number[]}
 */
const masterMind = function (solution, guess) {

    const answer = [0, 0];
    const cache = [];
    let flag = 0;
    let index = -1;

    for (let i = 0; i < solution.length; i++) {

        const s = solution[i];

        for (let j = 0; j < guess.length; j++) {

            const g = guess[j];

            if (s === g) {
                if (i === j) {
                    answer[0]++;
                    flag = 0;
                    cache[j] = true;
                    break;
                }
                //伪猜中 已经算过了
                if (cache[j]) continue;
                if (i > j) {
                    flag = 1;
                    index = j;
                } else {
                    //前面已经标记过了
                    if (flag === 1) break;
                    //没有标记 直接计算
                    answer[1]++;
                    flag = 0;
                    cache[j] = true;
                    break;
                }

            }


        }

        if (flag === 1) {
            flag = 0;
            answer[1]++;
            cache[index] = true;
        }


    }

    return answer;


};

// let solution = "RGBY";
// let guess = "GGRR";
// let solution = "BRBB";
// let guess = "RBGY";
// let solution = "BRGB"
// let guess = "RBBY";
let solution = "BGBG"

let guess = "RGBR";
console.log(masterMind(solution, guess))