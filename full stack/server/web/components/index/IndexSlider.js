import React, {useState} from 'react';


export default ({sliders, options = {}}) => {
    const width = options.width || 550;
    const contentWidth = width * sliders.length;
    const [cur, setCur] = useState(0);

    function next() {
        console.log('next');
    }

    function prev() {
        console.log('prev');

    }


    return (
        <div className="item banner-slider shadow">
            <div className="slider">
                <div className="slider-content"
                     style={{width: `${contentWidth}px`, transform: `translateX(${cur * width}px)`}}>

                    sliders.map((v, i) => {return <div className="slider-item" style={{left: `${width * i}px`}}>
                    <div className="slider-img-div" style={{backgroundImage: `url(${v.img})`}}/>
                    </div>}

                    );

                </div>
                <div className="slider-pagination">
                    <div className="pagination cur"/>
                    <div className="pagination"/>

                    sliders.map((v,i)=>(
                    <div className={"pagination" + i === cur ? " cur" : ""}/>
                    ))
                </div>
                <div className="btn btn-next" onClick={() => next()}><i className="iconfont icon-arrow-right-"/></div>
                <div className="btn btn-pre" onClick={() => prev()}><i className="iconfont icon-arrow-left-"/></div>
            </div>
        </div>
    );
}


