export const Transition = {

    name: 'Transition',
    setup(props) {

        return (ctx) => {

            const childVNode = ctx.$slots.default();

            // 需要在 渲染器 mountElement 底层支持
            childVNode.transition = {

                beforeEnter(el) {

                    el.classList.add('enter-from');
                    el.classList.add('enter-active');
                },

                enter(el) {

                    nextFrame(() => {
                        el.classList.remove('enter-from');
                        el.classList.add('enter-to');

                        const handler = () => {
                            el.classList.remove('enter-to');
                            el.classList.remove('enter-active');
                            el.removeEventListener('transitionend', handler);
                        }

                        el.addEventListener('transitionend', handler)


                    })

                },
                leave(el, removeFn) {

                    el.classList.add('leave-from');
                    el.classList.add('leave-active');

                    //hack 强制 reflow,使初始状态生效
                    document.body.offsetHeight;

                    nextFrame(() => {
                        el.classList.remove('leave-from');
                        el.classList.add('leave-to');

                        const handler = () => {

                            el.classList.remove('leave-to');
                            el.classList.remove('leave-active');
                            el.removeEventListener('transitionend', handler);

                            removeFn();

                        }

                        el.addEventListener('transitionend', handler);


                    })


                }


            }


            return childVNode;

        }


    }


}


const nextFrame = (fn) => {

    requestAnimationFrame(() => {

        requestAnimationFrame(fn);
    })

}