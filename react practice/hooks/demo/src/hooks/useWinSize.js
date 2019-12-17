import  {useEffect, useState} from 'react';


export default (props) => {

    const [size, setState] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    });

    const sizeHandler = () => {
        console.log("resize");
        setState({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        })
    };
    useEffect(() => {
        window.addEventListener('resize', sizeHandler, false);
        setTimeout(() => {
            window.removeEventListener('resize', sizeHandler, false);
            console.log("remove,handler,setTimeOut");
        }, 60000);
        return () => {
            window.removeEventListener('resize', sizeHandler, false);
            console.log("remove,handler");
        }
    }, []);


    return size;
}


