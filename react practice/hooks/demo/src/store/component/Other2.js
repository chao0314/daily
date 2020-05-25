import React, {useEffect} from 'react';


export default (props) => {
 useEffect(()=>{
     console.log('other2 effect no context')
 });
    return (
    <div>
        other2
    </div>
    );
}


