import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import HttpContext from "../../store/HttpContext";
import {imagePath} from '../../utils';


export default (props) => {

    const http = useContext(HttpContext);
    const [cars, serCars] = useState([]);
    const history = useHistory();
    useEffect(() => {
        http.get('/car/recommend').then(({err, data}) => {
            if (err) alert('failed');
            else serCars(data);
        });

    }, [])

    function goDetail(ID) {
        history.push(`/detail?ID=${ID}`);
    }


    return (
        <div className="wrap-box">{/*Start Box*/}
            <div className="zerogrid">
                <div className="header">
                    <h2>精选好车</h2>
                </div>
                <div className="row">

                    {cars.reduce((result, car, index) => {

                        if (index % 2 === 0) {
                            result.push((
                                <div className="col-1-3" key={index}>
                                    {[car, cars[index + 1]].map(item => (<div className="wrap-col" key={item.ID}>
                                        <div className="item t-center"
                                             onClick={goDetail.bind(null, item.ID)}>
                                            <div className="item-container">
                                                <a>
                                                    <div className="item-caption">
                                                        <div className="item-caption-inner">
                                                            <div className="item-caption-inner1">
                                                                <span>{item.features.filter(({
                                                                                                 key,
                                                                                                 value
                                                                                             }) => key && value).map(({value}) => value).slice(0, 3).join('/')}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <img src={imagePath(`car/${item.images[0]}`)}/>
                                                </a>
                                            </div>
                                            <div className="item-info">
                                                <a><h3>{car.title}</h3></a>
                                                <p> ￥{item.price / 10000}万</p>
                                            </div>
                                        </div>
                                    </div>))}
                                </div>)
                            )
                        }

                        return result;


                    }, [])}


                </div>
            </div>
        </div>
    );
}


