import React, {} from 'react';
import Store from '../index';
import Children from "./Children";
import Other from "./Other";
import Children2 from "./Children2";


export default (props) => {


    return (
        <Store>
            <Children></Children>
            <Other></Other>
            <Children2></Children2>
        </Store>
    );
}


