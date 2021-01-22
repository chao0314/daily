import React, {useContext, useEffect, useState} from 'react';
import HttpContext from "../../store/HttpContext";
import {imagePath} from '../../utils'


export default (props) => {
    const http = useContext(HttpContext);
    const [banners, setBanners] = useState([]);
    const [current, setCurrent] = useState(0);
    useEffect(() => {
        http.get('/banner').then(({err, data}) => {
            if (!err) setBanners(data);
            else alert('failed');
        })
    }, []);

    const pre = () => {
        if (current > 0) setCurrent(current - 1);
        else setCurrent(banners.length - 1);
    }

    const next = () => {
        if (current < banners.length - 1) setCurrent(current + 1);
        else setCurrent(0);
    }


    return (
        <div className="slider">
            {/* Slideshow */}
            <div className="banner_container">
                <ul className="rslides banner">
                    {
                        banners.map(({ID, image, sub_title, title}, index) => (
                            <li key={ID} style={index === current ? {opacity: 1, display: 'block'} : {}}>
                                <img src={imagePath(`banner/${image}`)}/>
                                <div className="caption">
                                    <h1>{title}</h1>
                                    <span>{sub_title}</span>
                                </div>
                            </li>)
                        )
                    }
                </ul>
                <a href="#" className="banner_nav prev" onClick={pre}>上一张</a>
                <a href="#" className="banner_nav next" onClick={next}>下一张</a>
            </div>
            <div className="clear"/>
        </div>


    );
}


