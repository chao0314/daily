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
    const sUsed = [];
    const gUsed = [];
    //全对的
    for (let i = 0; i < solution.length; i++) {
        const s = solution[i];
        const g = guess[i];
        if (s === g) {
            sUsed[i] = true;
            gUsed[i] = true;
            answer[0]++;
        }
    }

    //半对的
    for (let m = 0; m < guess.length; m++) {

        if (gUsed[m]) continue;
        const g = guess[m];
        for (let n = 0; n < solution.length; n++) {
            if (sUsed[n]) continue;
            const s = solution[n];
            if (g === s) {
                // guess 已经循环过了，不会在循环，设不设置都可以
                // gUsed[m] = true;
                sUsed[n] = true;
                answer[1]++;
                break;

            }

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
// let solution = "BGBG"
// let guess = "RGBR";
// console.log(masterMind(solution, guess))

//面试题 16.04. 井字游戏 https://leetcode-cn.com/problems/tic-tac-toe-lcci/

/**
 * @param {string[]} board
 * @return {string}
 */
const tictactoe = function (board) {

    const xReg = /^X+$/ig;
    const oReg = /^O+$/ig;
    let leftLine = "";
    let rightLine = "";
    let columns = [];
    let hasSpace = false;
    //判断行 和 pending
    for (let r = 0; r < board.length; r++) {
        const row = board[r];
        if (row.includes(" ")) hasSpace = true;
        const xMatch = xReg.exec(row);
        // 可能有多行都满足 胜利条件的时候
        if (xMatch) return 'X';
        else {
            const oMatch = oReg.exec(row);
            if (oMatch) return 'O';
        }

        //判断列 和 对角线
        if (r === 0) {
            for (let i = 0; i < row.length; i++) {
                columns[i] = row[i];
            }

            leftLine += row[0];
            rightLine += row[row.length - 1];
        } else {
            for (let j = 0; j < columns.length; j++) {
                const c = columns[j];
                if (c !== false && row[j] !== c) columns[j] = false;
                if (leftLine !== false && row[r] !== leftLine) leftLine = false;
                if (rightLine !== false && row[board.length - 1 - r] !== rightLine) rightLine = false;


            }


        }


    }

    for (let i = 0; i < columns.length; i++) {

        const col = columns[i];
        if (!col) continue;
        if (col === "X") return "X";
        else if (col === "O") return "O";


    }

    if (leftLine !== false && leftLine !== " ") return leftLine;
    if (rightLine !== false && rightLine !== " ") return rightLine;

    return hasSpace ? "Pending" : "Draw";

}

// let board = ["O X", " XO", "X O"];
// let board = ["OOX","XXO","OXO"];
// let board = ["OOX","XXO","OX "];
// console.log(tictactoe(board))

//55. 跳跃游戏 https://leetcode-cn.com/problems/jump-game/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
const canJump = function (nums) {
    //只要能获得的 最大下标，超过数组长度即可
    let maxIndex = 0;

    for (let i = 0; i < nums.length; i++) {

        const value = nums[i];
        //当前的 index 已经超过了 上一轮的 最大可到达 index
        // 例如 [1,0,0,2]
        if (maxIndex < i) return false;
        //更新最大可到达下标
        if (maxIndex < i + value) maxIndex = i + value;

        if (maxIndex >= nums.length - 1) return true;
    }

    return false;


};

//48. 旋转图像 https://leetcode-cn.com/problems/rotate-image/

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
const rotate = function (matrix) {

    // 先 上下翻转
    const len = matrix.length
    for (let i = 0; i < Math.floor(len / 2); i++) {
        const r = matrix[i];
        matrix[i] = matrix[len - 1 - i];
        matrix[len - 1 - i] = r;

    }
    // 左斜 对角线翻转
    for (let j = 0; j < len; j++) {
        const r = matrix[j];
        for (let k = 0; k < r.length; k++) {
            //已经换过了 不用换
            if (j >= k) continue;
            const temp = matrix[j][k];
            matrix[j][k] = matrix[k][j];
            matrix[k][j] = temp;

        }

    }

    console.log(matrix);
    // return matrix;

};

// let matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
//
// rotate(matrix)


//非原地 借助矩阵 行变列 /列变行
//第1行变第3列
const rotate2 = function (matrix) {

    const len = matrix.length;
    const m = JSON.parse(JSON.stringify(matrix));
    for (let i = 0; i < len; i++) {
        const row = matrix[i];
        const rLen = row.length;
        for (let j = 0; j < rLen; j++) {
            m[j][rLen - 1 - i] = row[j];

        }

    }

    console.log(m);
    return m;


}

//
// let matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
//
// rotate2(matrix)
// let matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]];
//
// rotate(matrix)

//54. 螺旋矩阵 https://leetcode-cn.com/problems/spiral-matrix/

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
const spiralOrder = function (matrix) {

    const m = matrix.length;
    const n = matrix[0].length;
    const result = [];
    let direction = true;
    for (let i = 0; i < Math.floor(m / 2); i++) {

        const row = matrix[i];

        for (let j = 0; j < n; j++) {

            const val = direction ? row[j] : row[n - 1 - j];

            if (val) {

                result.push(val);
                direction ? row[j] = null : row[n - 1 - j] = null;

            }
        }

    }


    return result;

};





















