import React, {useState, useEffect, useContext} from 'react';
import {imagePath} from "../../utils";
import HttpContext from "../../store/HttpContext";
import {useMoveToAnchor, useQuery} from "../../utils/hooks";

export default (props) => {
    useMoveToAnchor();
    const http = useContext(HttpContext);
    const query = useQuery();
    const [detail, setDetail] = useState({});
    useEffect(() => {

        query.get('ID') ? http.get(`/car?ID=${query.get('ID')}`).then(({err, data}) => {
            if (err) alert('failed');
            else {
                console.log(data[0]);
                setDetail(data[0]);
            }
        }) : http.get(`/car?size=1`).then(({err, data}) => {
            if (err) alert('failed');
            else {
                console.log(data[0]);
                setDetail(data[0]);
            }
        })

    }, [])

    const {title = '', price = '', description = '', features = [], images = []} = detail;
    return (

        <section className="container">
            <div>
                <div className="wrap-container clearfix">
                    <div className="main-content">
                        <div className="wrap-box"
                             style={{background: '#fff', boxShadow: '2px 2px 5px 0px rgba(0,0,0,0.3)'}}>{/*Start Box*/}
                            <div className="zerogrid">
                                <div className="header">
                                    <h1>{title}</h1>
                                </div>
                                <div className="row">
                                    <div className="col-2-3">
                                        <div className="wrap-col">
                                            <div className="slider">
                                                {/* Slideshow */}
                                                <div className="banner_container">
                                                    <ul className="rslides">
                                                        <li>
                                                            {images.length > 0 ?
                                                                <img src={imagePath(`car/${images[0]}`)}/> : ""}
                                                        </li>

                                                    </ul>
                                                </div>
                                                <div className="clear"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-1-3">
                                        <div className="wrap-col">
                                            <p className="price">￥{price}</p>
                                            <ul className="specs">
                                                {features.filter(({key, value}) => key && value).map(({key, value}) => (
                                                    <li key={key}><strong>{key}</strong> <span>{value}</span></li>))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="wrap-box">
                            <div className="zerogrid">
                                <div className="row">
                                    <div className="col-2-3">
                                        <div className="wrap-col">
                                            <div className="info">
                                                <h2 className="h3">车型配置</h2>
                                                {features.filter(({key, value}) => key && value).map(({key, value}) => (
                                                    <p key={key}>{key}:{value}</p>))}
                                            </div>
                                            <div className="info">
                                                <h2 className="h3">车辆描述</h2>
                                                <p>{description}</p>
                                            </div>
                                            <div className="info">
                                                <h2 className="h3">车辆图片</h2>
                                                {
                                                    images.map(item => <img key={item} src={imagePath(`car/${item}`)}/>)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}


