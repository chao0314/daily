import React, {useState} from 'react';


export default (props) => {

    return (
        <div className="list">
            <div>
                <div className="tags">
      <span>
        <a href='#' className="on">
          默认
        </a>
      </span>
                    <span>
        <a href='#'>
          销量
        </a>
      </span>
                    <span>
        <a href='#'>
          价格
        </a>
      </span>
                    <span>
        <a href='#'>
          好评最多
        </a>
      </span>
                </div>
                <div className="line"/>
            </div>
            <ul className="list-ul">
                <li className="btm clear-float">
                    <div className="img">
                        <a href="//www.meituan.com/meishi/42465387/">
                            <div className="fl-count">1</div>
                            <div className="imgbox" style={{height: 125, width: 220}}>
                                <img
                                    src="https://img.meituan.net/600.600/msmerchant/ebcee74bdaa44dcbb85cbc56fc510b98119613.png@220w_125h_1e_1c"/>
                            </div>
                        </a>
                    </div>
                    <div className="info clear-float">
                        <a href='#'>
                            <h4>佯坊前后涮羊肉（交大店）</h4>
                            <div className="source">
                                <div className="star-cont">
                                    <ul className="stars-ul">
                                        <li>
                                            <i className="iconfont icon-xingxing"/>
                                        </li>
                                        <li>
                                            <i className="iconfont icon-xingxing"/>
                                        </li>
                                        <li>
                                            <i className="iconfont icon-xingxing"/>
                                        </li>
                                        <li>
                                            <i className="iconfont icon-xingxing"/>
                                        </li>
                                        <li>
                                            <i className="iconfont icon-xingxing"/>
                                        </li>
                                    </ul>
                                    <ul className="stars-ul stars-light">
                                        <li>
                                            <i className="iconfont icon-xingxing"/>
                                        </li>
                                        <li>
                                            <i className="iconfont icon-xingxing"/>
                                        </li>
                                        <li>
                                            <i className="iconfont icon-xingxing"/>
                                        </li>
                                    </ul>
                                </div>
                                <p>
                                    5分
                                    <span>3333条评论</span>
                                </p>
                            </div>
                            <p className="desc">
                                海淀区交大东路94号（四川仁火锅隔壁）
                                <span>人均￥67</span>
                            </p>
                        </a>
                    </div>
                </li>
            </ul>
            <div className="mt-pagination">
                <div className="pagination">
                    <li>
                        <span className="iconfont icon-arrow-left- disabled"/>
                    </li>
                    <li>
                        <span className="active">1</span>
                    </li>
                    <li>
                        <span>2</span>
                    </li>
                    <li>
                        <span>3</span>
                    </li>
                    <li>
                        <span>4</span>
                    </li>
                    <li>
                        <span className="ellipsis iconfont icon-more"/>
                    </li>
                    <li>
                        <span>67</span>
                    </li>
                    <li>
                        <span className="iconfont icon-arrow-right-"/>
                    </li>
                </div>
            </div>
        </div>

    );
}


