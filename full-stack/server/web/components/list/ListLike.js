import React, {} from 'react';


export default (props) => {

    return (
        <div className="guess-you-like">
            <h4>猜你喜欢</h4>
            <ul>
                <li>
                    <a href='#'>
                        <div className="pic">
                            <div className="imgbox" style={{height: "100%", width: "100%"}}>
                                <img
                                    src="https://img.meituan.net//msmerchant/8e9d07bac32473da09c402203cc5288c138748.jpg@188w_106h_1e_1c"/>
                            </div>
                        </div>
                        <p className="name">旺顺阁鱼头泡饼（长阳半岛店）</p>
                        <p className="desc">长阳镇</p>
                        <p className="price">
                            <b>￥</b>95.0
                        </p>
                    </a>
                </li>
                <li>
                    <a href='#'>
                        <div className="pic">
                            <div className="imgbox" style={{height: "100%", width: "100%"}}>
                                <img
                                    src="https://img.meituan.net//msmerchant/8e9d07bac32473da09c402203cc5288c138748.jpg@188w_106h_1e_1c"/>
                            </div>
                        </div>
                        <p className="name">旺顺阁鱼头泡饼（长阳半岛店）</p>
                        <p className="desc">长阳镇</p>
                        <p className="price">
                            <b>￥</b>95.0
                        </p>
                    </a>
                </li>
            </ul>
        </div>

    );
}


