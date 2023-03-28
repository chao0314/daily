import {getCurrentInstance} from "../index.js";

const cache = new Map();

export const KeepAlive = {
    name: 'KeepAlive',
    _isKeepAlive: true,
    setup(props, {slots}) {

        const keepAliveInstance = getCurrentInstance();
        const {move, createElement} = keepAliveInstance.keepAliveContext;

        const domCacheContainer = createElement('div');

        //激活就是将原来缓存的 dom 树 添加回去
        keepAliveInstance.active = (vnode, container, anchor) => {

            move(vnode, container, anchor);

        }
        //去活就是将dom
        keepAliveInstance.deActive = (vnode) => {

            move(vnode, domCacheContainer);

        }


        return () => {

            const childrenVNode = slots.default();
            const {type} = childrenVNode;
            //普通 html元素，直接返回 ，不缓存
            if (typeof type === 'string') return childrenVNode;

            const cacheVNode = cache.get(type);

            //组件实例 已经缓存了
            if (cacheVNode) {
                //已经缓存了，mountComponent 时不用从新挂载，应该从缓存容器内 激活
                childrenVNode.keptAlive = true;

                childrenVNode.component = cacheVNode.component;

            } else {

                // 这是需要缓存的 组件的 虚拟节点，在卸载时，不要直接删除，而是应该移动到缓存容器内
                childrenVNode.shouldKeepAlive = true;

                cache.set(type, childrenVNode);
            }

            childrenVNode.keepAliveInstance = keepAliveInstance;

            return childrenVNode;

        }


    }


}