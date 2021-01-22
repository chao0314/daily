import React, {useEffect} from 'react';


export default (props) => {

    console.log("render", props.name || "default name");
    useEffect(() => {
        console.log(props.name || "default name", 'effect')
    })
    useEffect(() => {
        console.log(props.name || "default name", 'effect no  dependence')
    }, [])


    return (
        <div onClick={props.onClick}>
            <p>this is a child component {Math.random()}</p>
            {props.name || "default name"}
            {
                props.list && props.list.length > 0 ?
                    props.list.map((item, index) => (<p key={index}>{item}</p>)) : ""
            }
        </div>

    );
}


