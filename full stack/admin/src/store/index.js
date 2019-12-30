import React, {useReducer, useContext} from 'react'
import initState from "./state";
import actions from "./actions";
import reducers from "./reducers";

export const ctx = React.createContext({});

function reducerWraper(state, action) {
    let {type, payload} = action;
    return reducers[type](state, payload);
}

export default (props) => {

    const [state, dispatch] = useReducer(reducerWraper, initState);

    function useMapAction(name) {
        const action = actions[name];
        return (payload) => action({state, dispatch}, payload);

    }

    function useMapReducer(name) {
        return (payload) => dispatch({type: name, payload});
    }

    // function useMapSate(name) {
    // const value = useContext(Context);
    //     return value[name];
    //
    // }

    return (
        <ctx.Provider value={{state, useMapAction, useMapReducer}}>
            {props.children}
        </ctx.Provider>
    )

}





