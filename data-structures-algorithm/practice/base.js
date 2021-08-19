//1. 两数之和 https://leetcode-cn.com/problems/two-sum/

const twoSum = function (nums, target) {

    for (let i = 0; i < nums.length; i++) {

        for (let j = i + 1; j < nums.length; j++) {

            if (nums[i] + nums[j] === target) return [i, j];
        }

    }

};

// console.log(twoSum([1, 2, 3, 4], 3));
// console.log(twoSum([3, 2, 4], 6));

//1108. IP 地址无效化 https://leetcode-cn.com/problems/defanging-an-ip-address/

const defangIPaddr = function (address) {
    let ip = "";
    for (let i = 0; i < address.length; i++) {
        const char = address[i];
        if (char === '.') ip += '[.]';
        else ip += char;

    }

    return ip;

}

//344. 反转字符串  https://leetcode-cn.com/problems/reverse-string/

// s char[] 不能申请变量数组
const reverseString = function (s) {

    let left = 0;
    let right = s.length - 1;

    while (left < right) {

        const temp = s[left];
        s[left] = s[right];
        s[right] = temp;
        left++;
        right--;

    }

    return s;

};

//剑指 Offer 58 - I. 翻转单词顺序 https://leetcode-cn.com/problems/fan-zhuan-dan-ci-shun-xu-lcof/
/**
 * @param {string} s
 * @return {string}
 */
const reverseWords = function (s) {
    const space = " ";
    const str = s.trim().replace(/\s+/g, space);
    const words = str.split(space);

    let left = 0;
    let right = words.length - 1;

    while (left < right) {

        let tempL = words[left];
        let tempR = words[right];


        words[left] = handleSymbol(tempR);
        words[right] = handleSymbol(tempL);
        left++;
        right--;

    }

    return words.join(space);


    function handleSymbol(str) {
        const symbolReg = /(\w+)?([\.\?\!\,\...])(\w+)?/gi;
        const result = symbolReg.exec(str);
        if (result) {
            const left = result[0];
            const middle = result[1];
            const right = result[2];

            if (left && middle && right) return str;
            if (left && middle) return `${middle}${left}`;
            if (middle && right) return `${right}${middle}`;

        }

        return str;


    }

};


// console.log(reverseWords("the sky is blue?"))

//125. 验证回文串 https://leetcode-cn.com/problems/valid-palindrome/

/**
 * @param {string} s
 * @return {boolean}
 */
const isPalindrome = function (s) {

    // "" "a"  天然就是
    if (s.length > 1) {

        const str = s.replace(/[^a-z\d]/ig, "").toLowerCase();

        let left = 0;
        let right = str.length - 1;

        while (left < right) {

            if (str[left] !== str[right]) return false;
            left++;
            right--;

        }

    }


    return true;

};

//9. 回文数 https://leetcode-cn.com/problems/palindrome-number/

/**
 * @param {number} x
 * @return {boolean}
 */
const isPalindromeNum = function (x) {

    if (x < 0) return false;

    const sX = x.toString();

    return sX === sX.split("").reverse().join("");


};

//58. 最后一个单词的长度  https://leetcode-cn.com/problems/length-of-last-word/

/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLastWord = function (s) {

    const separator = /\s+/g;
    const words = s.trim().split(separator);
    return words[words.length - 1].length;


};


//剑指 Offer 05. 替换空格  https://leetcode-cn.com/problems/ti-huan-kong-ge-lcof/

/**
 * @param {string} s
 * @return {string}
 */
const replaceSpace = function (s) {
    let str = ""
    for (let i = 0; i < s.length; i++) {

        const temp = s[i];
        if (temp === " ") str += "%20";
        else str += temp;

    }

    return str;

};


// const replaceSpace = function (s) {
//
//     return s.replace(/\s/g, "%20");
// };

//剑指 Offer 58 - II. 左旋转字符串 https://leetcode-cn.com/problems/zuo-xuan-zhuan-zi-fu-chuan-lcof/

/**
 * @param {string} s
 * @param {number} n
 * @return {string}
 */
const reverseLeftWords = function (s, n) {

    return s.slice(n) + s.slice(0, n);
};


//26. 删除有序数组中的重复项 https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/

/**
 * @param {number[]} nums
 * @return {number}
 */

const removeDuplicates = function (nums) {

    let leftIndex = 0;
    let rightIndex = 1;

    while (rightIndex < nums.length) {

        const left = nums[leftIndex];
        const right = nums[rightIndex];
        if (left !== right) {

            //前面有重复
            if (rightIndex - leftIndex > 1) {

                nums[leftIndex + 1] = right;

            }

            leftIndex++;
            rightIndex++;

        } else {
            //有重复 left 不用动， right 向后探查
            rightIndex++;
        }


    }
    //nums.length =  leftIndex+1;
    return leftIndex + 1;

};

//剑指 Offer 67. 把字符串转换成整数 https://leetcode-cn.com/problems/ba-zi-fu-chuan-zhuan-huan-cheng-zheng-shu-lcof/

/**
 * @param {string} str
 * @return {number}
 */

const strToInt = function (str) {
    const INT_MAX = Math.pow(2, 31) - 1;
    const INT_MIN = -Math.pow(2, 31);
    // const reg = /\d/;
    const sReg = /^\d+/g;
    let s = str.trim();
    let flag = 1;
    let int = 0;
    const first = s[0];
    if (first === "-" || first === "+") {
        s = s.slice(1);
        flag = 1 * (first + 1);
    }

    let res = s.match(sReg);
    if (res) {
        s = res[0];
        const len = s.length;
        for (let i = 0; i < s.length; i++) {
            const char = s[i];
            // if (reg.test(char)) {

            const diff = Math.pow(10, len - 1 - i) * char;

            if (flag > 0) {
                int += diff;
                if (int > INT_MAX) return INT_MAX;

            } else {
                int -= diff;
                if (int < INT_MIN) return INT_MIN;

            }

            // } else {
            //
            //     if (i > 0) int = int / Math.pow(10, len - i);
            //     break;
            // }

        }
    }

    return int;

};


// let s = "words and 987"
// console.log(strToInt(s))
