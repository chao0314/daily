import React, {useState} from 'react';


export default (props) => {

    const {catalog, STATIC, city} = props;
    const [detail, setDetail] = useState(null);


    return (
        <div className="left-banner" onMouseLeave={() => setDetail(null)}>
            <div className="category-nav-container">
                <div className="category-nav-title-wrapper">
                    <span className="category-nav-title">全部分类</span>
                </div>
                <div className="category-nav-content-wrapper">
                    <ul className="col">
                        {catalog.map(({titles, children}, index) => (
                            <li className="nav-li line-center" key={index} onMouseEnter={() => this.setState(children)}>
                                <p className="nav-text-icon">
                                    <img src={`${STATIC}/images/美食.png`} className="image" alt=""/>
                                </p>
                                <div className="nav-text-wrapper">
                                    {titles.map(({title, href}, index) => (
                                        <span key={index}>
                        <a href={`http://${href.replace('{city}', city)}`} target="_blank"
                           className="link nav-text">{title}</a>
                                            {index < titles.length - 1 ? '/' : ''}
                      </span>
                                    ))}
                                </div>
                                <div className="nav-right-icon">
                                    <img src={`${STATIC}/images/right_jt.png`} className="image" alt=""/>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                {detail ? (
                    <div className="category-nav-detail-wrapper">
                        <div className="category-nav-detail active">
                            {detail.map(({title, href, children}, index) => (
                                <div className="detail-area" key={index}>
                                    <div className="detail-title-wrapper clearfix">
                                        <a href={`http://${href.replace('{city}', city)}`} className="detail-title">
                                            <h2>{title}</h2>
                                        </a>
                                        <a href={`http://${href.replace('{city}', city)}`} className="link detail-more">
                                            更多
                                            <i className="detail-right-arrow"/>
                                        </a>
                                        <div className="clearfix"/>
                                    </div>
                                    <div className="detail-content">
                                        {children.map(({title, href}, index) => (
                                            <a href={`http://${href.replace('{city}', city)}`} className="detail-text"
                                               key={index}>{title}</a>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : ''}
            </div>
        </div>
    );
}


