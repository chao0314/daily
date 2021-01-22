import {SET_TOKEN} from "./actions";

const initState = {
    token: localStorage.getItem('token'),
    token_expires: Number(localStorage.getItem('token_expires'))
}
//admin reducer

export default function adminReducer(state = initState, action) {
    let {type, payload} = action;
    switch (type) {

        case SET_TOKEN:
            return {...state, ...payload};

        default :
            return state;
    }

}