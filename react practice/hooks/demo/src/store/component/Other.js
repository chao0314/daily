import React, {useContext,useEffect} from 'react';
import {Context} from "../index";
import Other2 from "./Other2";


export default (props) => {
    const {state} = useContext(Context);
    useEffect(()=>{
        console.log('other effect')
    });

    return (

        <div>
            <Other2></Other2>
            name:{state.name}
        </div>
    );
}


