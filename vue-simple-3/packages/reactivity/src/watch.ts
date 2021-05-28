import {getCurrentInstance} from "../../runtime-core/src/component";
import {effect} from './effects';
import {isFn} from "@vue/shared";

export const preCallbackQueue = [];
export const postCallbackQueue = [];

export function watch(source, cb, options) {

    return doWatch(source, cb, options);


}

// watch effect 是没有 cb 的 watch ,当依赖改变后，重新执行 source fn
export function watchEffect(source, options) {
    return doWatch(source, null, options);


}

function doWatch(source, cb, options = {flush: 'pre', immediate: false}) {
    // source 暂且只考虑 单个函数型数据源
    //todo...
    let value, scheduler;
    const instance = getCurrentInstance();
    const getter = () => source.call(instance);
    const {flush = 'pre', immediate = false} = options;
    const handler = () => {

        if (isFn(cb)) {
            const newValue = getter();
            if (value === newValue) return;
            cb(newValue, value);
            value = newValue;
        } else {
            // watchEffect
            // watch effect 是没有 cb 的 watch ,当依赖改变后，重新执行 source fn
            getter();

        }

    }


    // 每次依赖更改都同步执行 性能差
    if (flush === 'sync') {
        scheduler = handler;

    } else if (flush === 'post') {
        scheduler = () => {
            queuePostFlush(handler);

        }


    } else if (flush === 'pre') {

        scheduler = () => {
            queuePreFlush(handler);
        }

    }


    // 借助 effect 收集依赖
    const watchEff = effect(getter, {
        // 下面延后处理
        lazy: true,
        scheduler
    })

    // 初次获取返回值 并收集依赖
    value = watchEff();
    if (cb) {

        if (immediate) {

            handler();
        }
    }

}


function queuePreFlush(job) {

    queueJob(preCallbackQueue, job);

}


function queuePostFlush(job) {

    queueJob(postCallbackQueue, job);
}


let pending = false;

function queueJob(queue, job) {

    queue.push(job);
    queueFlush();


}


function queueFlush() {

    if (!pending) {
        pending = true;
        Promise.resolve().then(execJob);

    }


}

function execJob() {

    flushPreCallback();
    flushPostCallback();
    pending = false;


}

export function flushPreCallback() {

    if (preCallbackQueue.length === 0) return;
    const dequeue = [...new Set(preCallbackQueue)];
    for (let i = 0; i < dequeue.length; i++) {
        dequeue[i]();
    }
    preCallbackQueue.length = 0;

    //flushPostCallback(); 递归耗尽


}

export function flushPostCallback() {

    if (postCallbackQueue.length === 0) return;
    const dequeue = [...new Set(postCallbackQueue)];
    for (let i = 0; i < dequeue.length; i++) {
        dequeue[i]();
    }
    postCallbackQueue.length = 0;


}







