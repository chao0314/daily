//剑指 Offer 09. 用两个栈实现队列 https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/
const CQueue = function () {

    this.stack = [];
    this.stackTwo = []

};

/**
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function (value) {

    if (value) this.stack.push(value);


};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function () {

    if (this.stack.length === 0 && this.stackTwo.length === 0) return -1;


    if (this.stackTwo.length === 0) {
        while (this.stack.length > 0) {

            this.stackTwo.push(this.stack.pop())

        }
    }


    return this.stackTwo.pop();


};

//225. 用队列实现栈 https://leetcode-cn.com/problems/implement-stack-using-queues/

/**
 * Initialize your data structure here.
 */
var MyStack = function () {

    this.queueOne = [];
    this.queueTwo = [];

};

/**
 * Push element x onto stack.
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function (x) {

    this.queueOne.push(x);

};

/**
 * Removes the element on top of the stack and returns that element.
 * @return {number}
 */
MyStack.prototype.pop = function () {

    while (this.queueOne.length > 1) {

        this.queueTwo.push(this.queueOne.shift());
    }

    const result = this.queueOne.shift();
    const temp = this.queueTwo;
    this.queueTwo = this.queueOne;
    this.queueOne = temp;
    return result;

};

/**
 * Get the top element.
 * @return {number}
 */
MyStack.prototype.top = function () {


    while (this.queueOne.length > 1) {

        this.queueTwo.push(this.queueOne.shift());
    }

    const result = this.queueOne.shift();
    this.queueTwo.push(result);
    const temp = this.queueTwo;
    this.queueTwo = this.queueOne;
    this.queueOne = temp;
    return result;

};

/**
 * Returns whether the stack is empty.
 * @return {boolean}
 */
MyStack.prototype.empty = function () {

    return this.queueOne.length === 0;

};

//面试题 03.05. 栈排序 https://leetcode-cn.com/problems/sort-of-stacks-lcci/

var SortedStack = function () {

    this.stack = [];


};

/**
 * @param {number} val
 * @return {void}
 */
SortedStack.prototype.push = function (val) {

    const temp = [];


    while (this.stack.length > 0) {

        const top = this.peek();

        if (top < val) {

            temp.push(this.stack.pop());
        } else {

            this.stack.push(val);
            break;
        }


    }
    if (this.stack.length === 0) this.stack.push(val);

    while (temp.length > 0) {

        this.stack.push(temp.pop());
    }


};


SortedStack.prototype.pop = function () {

    return this.stack.pop();

};

/**
 * @return {number}
 */
SortedStack.prototype.peek = function () {

    // return this.stack.at(-1);
    return this.stack[this.stack.length - 1] || -1;

};

/**
 * @return {boolean}
 */
SortedStack.prototype.isEmpty = function () {
    return this.stack.length === 0;

};

//155. 最小栈 https://leetcode-cn.com/problems/min-stack/

/**
 * initialize your data structure here.
 */
var MinStack = function () {
    this.stack = [];
    this.cur_min = null;

};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {

    if (this.stack.length === 0) this.cur_min = val;
    else {
        if (this.cur_min > val) this.cur_min = val;
    }


    this.stack.push({val, cur_min: this.cur_min});


};


MinStack.prototype.pop = function () {

    const {val} = this.stack.pop();
    if (this.stack.length > 0) this.cur_min = this.stack[this.stack.length - 1].cur_min;
    else this.cur_min = null;
    return val;


};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {

    return this.stack.length > 0 ? this.stack[this.stack.length - 1].val : null;

};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {

    return this.cur_min;
};


//面试题 03.01. 三合一  https://leetcode-cn.com/problems/three-in-one-lcci/

/**
 * @param {number} stackSize
 */
var TripleInOne = function (stackSize) {

    this.stack = [];
    this.size = stackSize;
    this.indexs = [-1, stackSize - 1, stackSize * 2 - 1];

};

/**
 * @param {number} stackNum
 * @param {number} value
 * @return {void}
 */
TripleInOne.prototype.push = function (stackNum, value) {

    const index = this.indexs[stackNum]
    if (index < this.size * (stackNum + 1) - 1) {

        this.stack[index + 1] = value;
        this.indexs[stackNum]++;

    }

};

/**
 * @param {number} stackNum
 * @return {number}
 */
TripleInOne.prototype.pop = function (stackNum) {

    const index = this.indexs[stackNum];

    if (index < this.size * stackNum) return -1;
    const result = this.stack[index];
    this.stack[index] = null;
    this.indexs[stackNum]--;
    return result;
};

/**
 * @param {number} stackNum
 * @return {number}
 */
TripleInOne.prototype.peek = function (stackNum) {

    const index = this.indexs[stackNum];

    if (index < this.size * stackNum) return -1;

    return this.stack[index];

};

/**
 * @param {number} stackNum
 * @return {boolean}
 */
TripleInOne.prototype.isEmpty = function (stackNum) {

    return this.indexs[stackNum] < this.size * stackNum;

};

//20. 有效的括号 https://leetcode-cn.com/problems/valid-parentheses/

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {

    const stack = [];
    const reg = /\(|\[|\{/;


    for (let i = 0; i < s.length; i++) {

        const char = s[i];
        if (reg.test(char)) stack.push(char);
        else {

            const cache = stack.pop();
            if (char === ")" && cache !== "(") return false;
            else if (char === "]" && cache !== "[") return false;
            else if (char === "}" && cache !== "{") return false;

        }


    }

    return stack.length === 0;


};

// const s =  "{[]}";

// console.log(isValid(s))

//面试题 16.26. 计算器  https://leetcode-cn.com/problems/calculator-lcci/

/**
 * @param {string} s
 * @return {number}
 */
var calculate = function (s) {
    let str = s.trim();
    const numbers = [];
    const operators = [];
    const numReg = /^\d+/;
    const opeReg = /^\+|\-|\*|\/|\(|\)/;
    let result = 0;


    while (str.length > 0) {
        let char;
        const res = numReg.exec(str);
        //数字
        if (res) {
            char = res[0];
            str = str.slice(char.length).trim();
            char = Number(char);

            const operator = operators[operators.length - 1];

            if (operator === "*") {

                numbers.push(numbers.pop() * char);
                operators.pop();
            } else if (operator === "/") {

                numbers.push(Math.floor(numbers.pop() / char));
                operators.pop();

            } else numbers.push(char);


        } else {
            //符号
            const opeRes = opeReg.exec(str);
            if (opeRes) {
                char = opeRes[0];
                str = str.slice(1).trim();
                if (char === ")") {
                    while (numbers.length > 0) {

                        const operator = operators.pop();
                        //括号内容已经计算了 （3/4） 括号内的 乘除 已经计算了 只剩 加减
                        if (operator === "(") break;
                        if (operator === "+") numbers.push(numbers.pop() + numbers.pop());
                        else if (operator === "-") numbers.push(-numbers.pop() + numbers.pop());

                    }

                    console.log("---)----",numbers,operators)
                    // debugger;

                    //括号处理完 继续与前面匹配 1*（2+3） 不可能有连续的 乘除 因为必然在这之前已经处理了
                    const operator = operators[operators.length - 1];
                    if (operator === "*") {
                        numbers.push(numbers.pop() * numbers.pop());
                        operators.pop();
                    }

                    if (operator === "/") {
                        numbers.push(Math.floor(1 / numbers.pop() * numbers.pop()));
                        operators.pop();
                    }


                } else operators.push(char);

            }


        }


    }

    console.log(numbers,operators)
    result = numbers[0];
    for (let j = 1; j < numbers.length; j++) {

        const operator = operators.shift();
        if (operator === "+") result += numbers[j];
        else if (operator === "-") result -= numbers[j];
    }

    return result;


};


// let s = "(2+6*3+5-(3*14/7+2)*5)+3"
// let s = "0"
// let  s = "2*(5+5*2)/3+(6/2+8)"
// let s = "6-4/2"
// let s = "1+1"
// let s = "3/2"
let s = "2-4-(8+2-6+(8+4-(1)+8-10))"

console.log(calculate(s))