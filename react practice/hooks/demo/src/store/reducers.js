export default {

    setNetworkContent(state, payload) {

        return {...state, networkContent: payload};

    },
    setName(state, payload) {
        return {...state, name: payload};

    }

}