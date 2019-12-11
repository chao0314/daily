import React, {} from 'react';


export default (props) => {

    return (
        <div className="filter">
            <div className="hasSelect clear-float">
                <span className="nor">已选条件</span>
                <span className="sel">代金券</span>
                <span className="clearAll">· 清除全部</span>
            </div>
            <div className="condition">
                <div className="cont">
                    <div className="classification">分类</div>
                    <div className="all on">全部</div>
                    <ul className="more">
                        <li>
                            <a href='#' className="on">
                                代金券
                            </a>
                        </li>
                        <li>
                            <a href='#'>代金券</a>
                        </li>
                        <li>
                            <a href='#'>代金券</a>
                        </li>
                        <li>
                            <a href='#'>代金券</a>
                        </li>
                        <li>
                            <a href='#'>代金券</a>
                        </li>
                        <li>
                            <a href='#'>代金券</a>
                        </li>
                        <li>
                            <a href='#'>代金券</a>
                        </li>
                        <li>
                            <a href='#'>代金券</a>
                        </li>
                        <li>
                            <a href='#'>代金券</a>
                        </li>
                        <li>
                            <a href='#'>代金券</a>
                        </li>
                        <li>
                            <a href='#'>代金券</a>
                        </li>
                    </ul>
                </div>
                <div className="cont">
                    <div className="classification">区域</div>
                    <div className="all on">全部</div>
                    <ul className="more">
                        <li>
          <span className="hasSub">
            <b>朝阳区</b>
          </span>
                        </li>
                        <li>
          <span className="hasSub">
            <b>海淀区</b>
          </span>
                        </li>
                        <li>
          <span className="hasSub">
            <b>丰台区</b>
          </span>
                        </li>
                        <li>
          <span className="hasSub">
            <b>西城区</b>
          </span>
                        </li>
                        <li>
          <span className="hasSub">
            <b>东城区</b>
          </span>
                        </li>
                        <li>
          <span className="hasSub">
            <b>昌平区</b>
          </span>
                        </li>
                        <li>
          <span className="hasSub">
            <b>石景山区</b>
          </span>
                        </li>
                        <li>
          <span className="hasSub">
            <b>通州区</b>
          </span>
                        </li>
                        <li>
          <span className="hasSub">
            <b>大兴区</b>
          </span>
                        </li>
                        <li>
          <span className="hasSub">
            <b>顺义区</b>
          </span>
                        </li>
                        <li>
          <span className="hasSub">
            <b>房山区</b>
          </span>
                        </li>
                        <li>
          <span className="hasSub">
            <b>密云区</b>
          </span>
                        </li>
                        <li>
          <span className="hasSub">
            <b>怀柔区</b>
          </span>
                        </li>
                        <li>
          <span className="hasSub">
            <b>延庆区</b>
          </span>
                        </li>
                        <li>
          <span className="hasSub">
            <b>门头沟区</b>
          </span>
                        </li>
                        <li>
          <span className="hasSub">
            <b>平谷区</b>
          </span>
                        </li>
                    </ul>
                </div>
                <div className="cont">
                    <div className="classification">用餐人数</div>
                    <div className="all on">全部</div>
                    <ul className="more" style={{borderBottom: 0}}>
                        <li>
                            <a href='#'>单人餐</a>
                        </li>
                        <li>
                            <a href='#'>双人餐</a>
                        </li>
                        <li>
                            <a href='#'>3-4人</a>
                        </li>
                        <li>
                            <a href='#'>5-6人</a>
                        </li>
                        <li>
                            <a href='#'>7-8人</a>
                        </li>
                        <li>
                            <a href='#'>9-10人</a>
                        </li>
                        <li>
                            <a href='#'>10人以上</a>
                        </li>
                        <li>
                            <a href='#'>其他</a>
                        </li>
                    </ul>
                </div>
                <div className="popover" style={{top: 170, left: 158,display:'none'}}>
                    <div className="arrow"/>
                    <div className="p-content">
                        <div className="popover-content clear-float">
                            <span>怀柔区</span>
                            <ul>
                                <li>
                                    <a href='#'>全部</a>
                                </li>
                                <li>
                                    <a href='#'>慕田峪长城</a>
                                </li>
                                <li>
                                    <a href='#'>青龙峡</a>
                                </li>
                                <li>
                                    <a href='#'>怀柔城区</a>
                                </li>
                                <li>
                                    <a href='#'>雁西湖</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}


