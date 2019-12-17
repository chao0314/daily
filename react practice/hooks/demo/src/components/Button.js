import React, {useContext} from 'react';
import {ColorContext, UPDATE, RESET} from '../contexts/colors';

export default (props) => {

    const {dispatch} = useContext(ColorContext);
    return (
        <div>
            <button type='button' onClick={() => dispatch({type: UPDATE})}>变色</button>
            <button type='button' onClick={() => dispatch({type: RESET})}>重置</button>
        </div>
    )
}