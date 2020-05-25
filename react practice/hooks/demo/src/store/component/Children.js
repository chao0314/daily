import React, {useContext, useEffect} from 'react';
import {Context} from "../index";


export default (props) => {
    const {state, useMapAction, useMapReducer} = useContext(Context);
    const getNetworkContent = useMapAction('getNetworkContent');
    const setName = useMapReducer('setName');
    const content = state.networkContent;
    useEffect(() => {
        console.log('children effect');
    });

    return (
        <div>
            <div>contnt:{content}</div>
            <button type='button' onClick={() => getNetworkContent()}>net</button>
            <button type='button' onClick={() => setName("hello world")}>name</button>
        </div>
    );
}


