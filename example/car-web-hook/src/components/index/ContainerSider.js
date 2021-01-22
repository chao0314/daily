import React, {useContext, useEffect, useState} from 'react';
import HttpContext from "../../store/HttpContext";
import {imagePath} from "../../utils";
import {useHistory} from 'react-router-dom';


export default (props) => {
    const history = useHistory();
    const http = useContext(HttpContext);
    const [list, setList] = useState([])
    useEffect(() => {

        http.get(`/car?size=3`).then(({err, data}) => {
            if (err) alert('failed');
            else setList(data);
        })

    }, [])

    const goDetail = ID => history.push(`/detail?ID=${ID}`);

    return (
        <div className="col-1-3">
            <div className="wrap-col">
                {/*-- Start Widget --*/}
                <div className="widget">
                    <div className="wid-header">
                        <h5>关于我们</h5>
                    </div>
                    <div className="wid-content">
                        <p>人人车深耕二手车交易服务，透明无差价交易让普通用户也可以用公平的市场价格，买到精选优质二手车。人人车以资深评估师和手持设备为质量把关，检测项目包含114项国家标准检测（含车辆外观、发动机、转向机构、制动系统、漏水、漏油等），以及人人车独家服务的135项，总计249项专业检测，排除重大事故车，火烧车，水泡车以及工况差的车。
                        </p></div>
                </div>
                {/*-- Start Widget --*/}
                <div className="widget wid-post">
                    <div className="wid-header">
                        <h5>最新上架</h5>
                    </div>
                    {
                        list.length > 0 ? list.map(item => (<div className="wid-content" key={item.ID}>
                            <div className="post">
                                <a><img src={imagePath(`car/${item.images[0]}`)}/></a>
                                <div className="wrapper">
                                    <h5><a onClick={() => goDetail(item.ID)}>{item.title}</a></h5>
                                    <span>{item.price / 10000}万</span>
                                </div>
                            </div>

                        </div>)) : ""
                    }
                </div>
                {/*-- Start Widget --*/}
                <div className="widget">
                    <div className="wid-header">
                        <h5>联系方式</h5>
                    </div>
                    <div className="wid-content">
                        <p>人人车提供完善的售后服务，承诺车源14天可退，并提供1年/2万公里质保，出现任何问题都可以免费拨打4008-610-500，联系您的专属用车管家。</p>
                    </div>
                </div>
            </div>
        </div>
    );
}


