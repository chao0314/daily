import React, {useReducer} from 'react';

export const UPDATE = 'update';
export const RESET = 'reset';

export const ColorContext = React.createContext('black');
const init = args => args ? args : 'black';

const reducer = (state, action) => {


    switch (action.type) {
        case UPDATE:
            return ['red', 'green', 'blue', 'yellow', 'orange', 'pink'][Math.floor(Math.random() * 6)];
        case  RESET:
            return init(action.payload);
        default:
            return state;

    }
};


const ColorProvider = (props) => {

    const [color, dispatch] = useReducer(reducer, props.color || 'black', init);

    return (
        <ColorContext.Provider value={{color, dispatch}}>
            {props.children}

        </ColorContext.Provider>

    )
};

export default ColorProvider;



