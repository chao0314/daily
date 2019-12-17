import React, {} from 'react';
import {useMapSate} from "../index";


export default (props) => {
    const name = useMapSate('name');

    return (

        <div>
            name:{name}
        </div>
    );
}


