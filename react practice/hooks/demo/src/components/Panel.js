import React, {useContext, useMemo} from 'react';
import {ColorContext} from '../contexts/colors';
import useWinSize from "../hooks/useWinSize";


export default (props) => {
    const size = useWinSize();
    const memoSize = useMemo(() => {
        return `宽:${size.width},高:${size.height}`;
    }, [size]);
    const {color} = useContext(ColorContext);

    function change(e) {
        console.log("input change", e);

    }

    return (
        <div>
            <p style={{color}}>
                看我会变色，哈哈。。。
            </p>
            <input type="text" value={memoSize} onChange={change}/>
        </div>

    );
}


