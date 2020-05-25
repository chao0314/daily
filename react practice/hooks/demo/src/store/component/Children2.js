import React, {useEffect} from 'react';


export default (props) => {
    useEffect(() => {
        console.log("children 2 no context")
    });

    return (
        <div> children 2</div>
    );
}


