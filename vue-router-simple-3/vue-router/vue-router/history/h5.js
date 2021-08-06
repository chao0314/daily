export default function createWebHistory(base = '') {

    const historyNavigation = useHistoryNavigation(base);
    const historyListener = useHistoryListener(base, historyNavigation.state, historyNavigation.location);

    const history = Object.assign({}, historyNavigation, historyListener);

    Object.defineProperty(history, 'location', {
        get: () => historyNavigation.location.value
    })
    Object.defineProperty(history, 'state', {
        get: () => historyNavigation.state.value
    })


}

function createState(back, current, forward, isReplace = false, isScroll = false) {

    return {
        back, current, forward, isReplace,
        scroll: isScroll ? {left: pageXOffset, top: pageYOffset} : null,
        //浏览器 默认从2 开始
        position: window.history.length - 1
    }

}


function createLocation(base = '') {

    // #/
    if (base.includes('#')) return base.slice(1) || "/";
    const {pathname, search, hash} = window.location;
    console.log("--location---", pathname, search, hash);
    return pathname + search + hash;

}


function useHistoryNavigation(base) {

    const currentLocation = {
        value: createLocation(base)
    }
    const currentState = {
        value: window.history.state
    }

    const isHash = base.includes('#');

    function changeLocation(to, state, isReplace = false) {

        if (isHash) to = base + to;
        const method = isReplace ? "replaceState" : "pushState";
        window.history[method](state, "", to);
        currentState.value = state;

    }


    function push(to, data = {}) {

        //更新现有 当前 state的信息，比如 forward 、scroll等，这些信息在跳转前记录才有效

        const updateState = Object.assign({}, currentState.value, {

            forward: to,
            scroll: {
                left: window.pageXOffset,
                top: window.pageYOffset
            }
        })

        changeLocation(currentLocation.value, updateState, true);

        const state = Object.assign({}, createState(currentLocation.value, to, null),
            {position: currentState.position + 1},
            data
        )

        changeLocation(to, state, false);

        currentLocation.value = to;

    }

    function replace(to, data = {}) {

        const updateState = Object.assign({}, createState(currentState.back, to, currentState.forward, true),
            data);

        changeLocation(to, updateState, true);

        currentLocation.value = to;


    }


    //初始的时候没有state 那么手动设置一个 ，url  replace 感官上无影响

    if (!currentState.value) {

        const state = createState(null, currentLocation.value, null, true);
        changeLocation(currentLocation.value, state, true);


    }


    return {

        location: currentLocation,
        state: currentState,
        push,
        replace
    }

}

//监听浏览器的 前进或后退按钮
function useHistoryListener(base, currentState, currentLocation) {

    const listeners = [];

    function popStateHandler({state = {}}) {

        const to = createLocation(base);
        const from = currentLocation.value;
        const fromState = currentState.value;
        const isBack = state.position < fromState.position;

        listeners.forEach(listener => listener(to, from, {isBack}));

        currentState.value = state;
        currentLocation.value = to;


    }

    function listen(listener) {

        listeners.push(listener);

    }

    window.addEventListener('popstate', popStateHandler);

    return {listen};


}