import React, {} from 'react';
import State from './store'
import App from "./App";

export default (props) => {
console.log(props)
    return (
        <State><App/></State>
    );
}


