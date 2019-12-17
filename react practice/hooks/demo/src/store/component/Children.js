import React, {} from 'react';
import {useMapActions, useMapReducer, useMapSate} from "../index";


export default (props) => {

    const getNetworkContent = useMapActions('getNetworkContent');
    const setName = useMapReducer('setName');
    const content = useMapSate('networkContent');

    return (
        <div>
            <div>contnt:{content}</div>
            <button type='button' onClick={() => getNetworkContent('https://www.bing.com')}>net</button>
            <button type='button' onClick={() => setName("hello world")}>name</button>
        </div>
    );
}


