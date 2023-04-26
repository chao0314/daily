export function createHistoryNavigation(base = '') {

    const push = (to, optionsState = {}) => {

        const replaceState = {...historyState.value, ...{forward: to}, ...optionsState};

        console.log('replaceState', replaceState)
        // 为了 刷新当下浏览器中 location 应的 state，便于前进 后退使用
        navigateTo(historyState.value.current, replaceState, true);

        const {current,} = historyState.value;

        const state = createState(current, to, null);
        console.log('push', state);
        navigateTo(to, state, false);


    }

    const replace = (to, optionsState = {}) => {

        const state = {...historyState.value, current: to, ...optionsState};

        console.log('replace', state)

        navigateTo(to, state, true);

    }

    const navigateTo = (to, state, shouldReplace = false) => {

        if (base.startsWith('#')) to = `#${to}`;
        if (shouldReplace) {

            window.history.replaceState(state, '', to);

        } else {

            window.history.pushState(state, '', to);

        }

        historyState.value = state;

        historyLocation.value = createCurrentLocation(base);

    }

    const createCurrentLocation = (base = '') => {

        const {pathname, search, hash} = window.location;

        //localhost/#home
        if (base.startsWith('#')) return hash.slice(1);

        return `${pathname}/${search}/${hash}`;
    };

    const createState = (from, current, forward) => {

        return {
            from,
            current,
            forward
        }


    };

    const popStateHandlerSet = new Set();

    const listen = (cb) => {

        popStateHandlerSet.add(cb);

    }


    const historyState = {value: {}};

    const historyLocation = {value: createCurrentLocation(base)};


    window.addEventListener('popstate', ev => {

        const {state} = ev;
        console.log('popstate', state);

        popStateHandlerSet.forEach(handler => handler(state));

    })


    return {push, replace, listen, historyState, historyLocation};


}