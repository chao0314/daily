import {ref,} from "../../reactivity/index.js";
import {onUnmounted} from "../index.js";

//functional component
//options:
/*
* loader
* delay
* loadingComponent
* timeout
* errorComponent
* onError
* */
export function defineAsyncComponent(options = {}) {

    if (typeof options === 'function') {
        options = {
            loader: options,
            delay: 200,
            timeout: 3000
        }


    }

    const {loader, delay, loadingComponent, timeout, errorComponent} = options;
    let {onError} = options;

    if (typeof loader !== 'function') throw new Error('need async component loader');


    let count = 0;

    const load = async () => {

        try {

            return await loader();

        } catch (e) {

            if (onError) {

                return new Promise((resolve, reject) => {

                    const retry = () => resolve(load());
                    const fail = () => reject(e);

                    onError(retry, fail, ++count);

                })


            } else throw e;


        }

    }

    return {

        name: 'AsyncComponentWrapper',

        setup(props) {

            const componentRef = ref(null);
            const errorRef = ref(null);
            const showLoadingRef = ref(false);
            let timeoutTimer = null;
            let loadingTimer = null;

            load().then(componet => {

                componentRef.value = componet;
                showLoadingRef.value = false;

            }, error => {

                errorRef.value = error;

            }).finally(() => {

                showLoadingRef.value = false;

                if (loadingTimer) clearTimeout(loadingTimer);

            })

            if (delay) {

                loadingTimer = setTimeout(() => {

                    if (!componentRef.value) showLoadingRef.value = true;
                    loadingTimer = null;

                }, delay)

            }

            if (timeout) {
                timeoutTimer = setTimeout(() => {
                    errorRef.value = new Error('Timeout Error');
                    timeoutTimer = null;
                }, timeout)
            }

            onUnmounted(() => {
                if (timeoutTimer) clearTimeout(timeoutTimer);
                if (loadingTimer) clearTimeout(loadingTimer);
            })

            return () => {

                const component = componentRef.value;
                const error = errorRef.value;
                const showLoading = showLoadingRef.value;

                if (component) {

                    return {type: component};

                } else if (error && errorComponent) {

                    return {type: errorComponent, props: {error}};

                } else if (showLoading && loadingComponent) {

                    return {type: loadingComponent};
                } else {

                    return {type: PlaceHolder}
                }


            }

        }

    }

}

const PlaceHolder = {

    name: 'PlaceHolder',
    props: {
        content: String
    },
    render() {
        return {
            type: 'div',
            children: this.content || 'this is a placeholder component'

        }

    }

}