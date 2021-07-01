import {ComponentPublicInstance, nextTick, ObjectDirective} from 'vue';
import {getOffsetTop, getScrollContainer, throttle} from "../../utils";

type InfiniteScrollCallback = () => void;
type InfiniteScrollEl = HTMLElement & {
    infinite: {
        container: HTMLElement,
        instance: ComponentPublicInstance,
        observer?: MutationObserver,
        scrollCallback: (instance: ComponentPublicInstance) => void,
        onScrollHandler: () => void,
        distance: number,
        disabled: boolean

    }
};

const props = {
    delay: {
        type: Number,
        default: 200
    },
    distance: {
        type: Number,
        default: 5
    },
    disabled: {
        type: Boolean,
        default: false
    },
    immediate: {
        type: Boolean,
        default: true
    }

}

type  Props = typeof props;

type  ScrollProps = { [K in keyof Props]: Props[K]['default'] };

function getScrollProps(el: InfiniteScrollEl, instance: ComponentPublicInstance): ScrollProps {

    // 1 组件实例上找 2 绑定的dom元素 attributes上找 3 默认值

    return Object.entries(props).reduce((memo, [key, value]) => {

        const {type, default: defaultVal} = value;

        memo[key] = type(instance[key] ?? el.getAttribute(`infinite-scroll-${key}`) ?? defaultVal);

        return memo;


    }, {} as ScrollProps)


}


function checkContainerFull(el: InfiniteScrollEl) {

    const {container, scrollCallback, observer, instance} = el.infinite;

    if (el.scrollHeight >= container.clientHeight) {
        //已经填满 container 不需要再观察了

        observer && observer.disconnect();
        delete el.infinite.observer;

        //未填满 调用回调，请求数据等
    } else scrollCallback(instance);


}

function onScroll(el: InfiniteScrollEl) {
    console.log('on  scroll')

    const {container, scrollCallback, distance, observer, disabled, instance} = el.infinite;

    //还在初始填充阶段或者禁用 那么无需处理滚动 返回
    if (observer || disabled) return;

    //滚动容器就是绑定指令的元素  常见
    if (container === el) {

        const {scrollHeight, clientHeight, scrollTop} = el;
        if (scrollTop + clientHeight >= scrollHeight - distance) scrollCallback(instance);

    } else {

        const offsetTopDiff = getOffsetTop(el) - getOffsetTop(container);
        const {clientHeight, scrollTop} = container;

        // const {offsetHeight:contentOffsetHeight} =  el;
        // get the scrollHeight since el might be visible overflow hidden
        //如果布局设置了 内容溢出隐藏，那么不需要再加载数据，调用回调了，有隐藏的情况 就要用 scrollHeight,offsetHeight拿不大到完整高度
        //如果不考虑隐藏的话  clientTop(border的宽度) + scrollHeight（完整内容） =  offsetHeight（完整内容+边框+滚动条有的话）
        //无滚动条 无隐藏的 平常境况 clientHeight = scrollHeight
        const {scrollHeight: contentScrollHeight, clientTop: contentClientTop} = el;
        if (clientHeight + scrollTop >= offsetTopDiff + contentScrollHeight + contentClientTop - distance) scrollCallback(instance);

    }


}


const WInfiniteScroll: ObjectDirective<InfiniteScrollEl, InfiniteScrollCallback> = {

    async mounted(el, binding) {

        const {instance, value: scrollCallback} = binding;
        if (!(scrollCallback instanceof Function)) throw  new Error('binding value must be function');


        // ensure parent vnode/component mounted,dom element can be used
        await nextTick();

        const container: HTMLElement = getScrollContainer(el);
        const {immediate, disabled, delay, distance} = getScrollProps(el, instance);
        const onScrollHandler = throttle(() => onScroll(el), delay);

        el.infinite = {scrollCallback, instance, container, distance, disabled, onScrollHandler}
        if (!disabled && immediate) {
            // 如果初始时的内容没有填满 container 的 clientHeight 那么自动填满
            const observer = new MutationObserver(throttle(() => checkContainerFull(el), 100));

            observer.observe(el, {childList: true, subtree: true});

            el.infinite.observer = observer;

            //检查是否充满
            checkContainerFull(el);

        }

        container.addEventListener('scroll', onScrollHandler);


    },
    unmounted(el) {

        const {container, observer, onScrollHandler} = el.infinite;

        container.removeEventListener('scroll', onScrollHandler);
        if (observer) {
            observer.disconnect();
            delete el.infinite.observer;

        }


    }


}

export default WInfiniteScroll;

