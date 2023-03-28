import {getCurrentInstance} from "../index.js";

export const KeepAlive = {
    name: 'KeepAlive',
    _isKeepAlive: true,
    setup(props, {slots}) {

        const cache = new Map();
        const keepAliveInstance = getCurrentInstance();
        const {move, createElement} = keepAliveInstance.keepAliveContext;

        const domCache = createElement('div');

        //激活就是将原来缓存的 dom 树 添加回去
        keepAliveInstance.active = () => {


        }
        //去活就是将dom
        keepAliveInstance.deActive = ()=>{



        }


        return () => {

            const childrenVNode = slots.defaults();
            const {type} = childrenVNode;
            //普通 html元素，直接返回 ，不缓存
            if (typeof type === 'string') return childrenVNode;

            const cacheComponentInstance = cache.get(childrenVNode.type);

            //组件实例 已经缓存了
            if (cacheComponentInstance) {
                //已经缓存了，mountComponent 时不用从新挂载，应该从缓存容器内 激活
                cacheComponentInstance.keptAlive = true;

            } else {

                // 这是需要缓存的 组件的 虚拟节点，在卸载时，不要直接删除，而是应该移动到缓存容器内
                childrenVNode.shouldKeepAlive = true;


            }


        }


    }


}