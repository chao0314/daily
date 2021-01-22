import React, {useContext, useEffect, useState, useRef} from 'react';
import HttpContext from "../../store/HttpContext";
import {imagePath} from "../../utils";
import {useHistory} from 'react-router-dom';


export default (props) => {

    const dataRef = useRef({page: 1});
    const history = useHistory();
    const http = useContext(HttpContext);
    const [list, setList] = useState([]);
    useEffect(() => {
        http.get(`/car?page=${dataRef.current.page}`).then(({err, data}) => {
            if (err) alert('失败');
            else setList(data);
        })

    }, [])
    const goDetail = ID => history.push(`/detail?ID=${ID}`);

    const getMore = () => {

        http.get(`/car?page=${++dataRef.current.page}`).then(({err, data}) => {
            if (err) alert('失败');
            else setList(list.concat(data));
        })
    }


    return (
        <div className="col-2-3">
            <div className="wrap-col">
                {
                    list.length > 0 ? list.map(item => (<div key={item.ID} className="row">
                        <div className="item">
                            <div className="col-1-3">
                                <div className="item-container" onClick={() => goDetail(item.ID)}>
                                    <a>
                                        <div className="item-caption">
                                            <div className="item-caption-inner">
                                                <div className="item-caption-inner1">
                                                    <span>{item.features.filter(({
                                                                                     key,
                                                                                     value
                                                                                 }) => key && value).map(({value}) => value).join('/')}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <img src={imagePath(`car/${item.images[0]}`)}/>
                                    </a>
                                </div>
                            </div>
                            <div className="col-2-3">
                                <div className="wrap-col">
                                    <div className="item-info">
                                        <a onClick={() => goDetail(item.ID)}><h3>{item.title}</h3></a>
                                        <p>￥{item.price / 10000}万</p>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="clear"/>
                        </div>
                    </div>)) : ""

                }
                <div className="row">
                    <a className="button bt1" onClick={() => getMore()}>加载更多</a>
                </div>
            </div>
        </div>
    );
}


