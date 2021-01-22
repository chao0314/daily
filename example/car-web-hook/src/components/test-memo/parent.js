import React, {useState, useMemo, useCallback, useEffect, Suspense} from 'react';
import Child from "./child";

const ChildMemo = React.memo(Child);
const Lazy = React.lazy(() => import('./lazy'));


export default (props) => {
    const [one, setOne] = useState("one");
    const [two, setTwo] = useState("two");
    const [list, setList] = useState([]);
    const twoMe = useMemo(() => {
        console.log('memo action');
        return 'two memo'
    }, ["memo"])

    function clickMemo() {
        console.log("click,memo", +click.tag);
    }

    clickMemo.tag = Math.random();

    function click() {
        console.log("click", +click.tag);
    }

    click.tag = Math.random();

    const clickMemoHandle = useCallback(click, [0]);

    console.log('render  parent');

    useEffect(() => {
        console.log('parent effect no dependence')
        setList(new Array(3).fill(Math.random()));
    }, [])
    useEffect(() => {
        console.log('parent effect')
    })
    return (

        <div>
            <Child name={one}/>
            {/*<Child onClick={clickHandle}/>*/}
            <Child onClick={clickMemoHandle} name="two"/>
            {/*<Child onClick={() => console.log('click')}/>*/}
            <ChildMemo onClick={click} name="three"/>
            <ChildMemo onClick={clickMemoHandle} name="four" list={list}/>
            <button onClick={() => setOne(Math.random() + " one changed")}>click</button>
            <button onClick={() => setList(new Array(3).fill(Math.random()))}>change</button>
            <Suspense fallback={<div>loading...</div>}>
                <Lazy/>
            </Suspense>


        </div>
    );
}


