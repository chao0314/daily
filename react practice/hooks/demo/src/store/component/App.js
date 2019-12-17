import React, {} from 'react';
import Store from '../index';
import Children from "./Children";
import Other from "./Other";


export default (props) => {


    return (
        <Store>
            <Children></Children>
            <Other></Other>
        </Store>
    );
}


