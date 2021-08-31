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

    if (!x) return;
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