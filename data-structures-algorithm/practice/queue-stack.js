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
    this.indexs = [0, stackSize, stackSize * 2];

};

/**
 * @param {number} stackNum
 * @param {number} value
 * @return {void}
 */
TripleInOne.prototype.push = function (stackNum, value) {

    const index = this.indexs[stackNum]
    if (index < this.size * (stackNum + 1)) {

        this.stack[index] = value;
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

};

/**
 * @param {number} stackNum
 * @return {boolean}
 */
TripleInOne.prototype.isEmpty = function (stackNum) {

};