import React, {useReducer, useContext} from 'react'
import initState from "./state";
import actions from "./actions";
import reducers from "./reducers";

let State;
const Context = React.createContext({});

function reducerWraper(state, action) {
    let {type, payload} = action;
    console.log("reducerwraper", type, payload)
    let res = reducers[type](state, payload);
    console.log(res)
    return res;
}


export function useMapActions(name) {
    const action = actions[name];
    const [state, dispatch] = useReducer(reducerWraper, initState);
    return (payload) => action(dispatch, payload);

}

export function useMapReducer(name) {
    const [state, dispatch] = useReducer(reducerWraper, initState);
    return (payload) => dispatch({type: name, payload});
}

export function useMapSate(name) {

    const state = useContext(Context);
    return state[name];

}

export default (props) => (

    <Context.Provider value={initState}>
        {props.children}
    </Context.Provider>
)


