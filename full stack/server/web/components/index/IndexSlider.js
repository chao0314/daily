import React, {Component} from 'react';


export default class IndexSlider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cur: 0
        }
    }


    next() {
        console.log('next');
    }

    prev() {
        console.log('prev');

    }

    render() {
        const {sliders, options = {}} = this.props;
        const width = options.width || 550;
        const contentWidth = width * sliders.length;
        return (
            <div className="item banner-slider shadow">
                <div className="slider">
                    <div className="slider-content"
                         style={{width: `${contentWidth}px`, transform: `translateX(${this.cur * width}px)`}}>

                        {sliders.map((v, i) => (
                            <div className="slider-item" style={{left: `${width * i}px`}} key={i}>
                                <div className="slider-img-div" style={{backgroundImage: `url(${v.img})`}}/>
                            </div>))
                        }

                    </div>
                    <div className="slider-pagination">
                        <div className="pagination cur"/>
                        <div className="pagination"/>

                        {sliders.map((v, i) => (
                            <div className={"pagination" + i === this.cur ? " cur" : ""} key={i}/>
                        ))}
                    </div>
                    <div className="btn btn-next" onClick={() => next()}><i className="iconfont icon-arrow-right-"/>
                    </div>
                    <div className="btn btn-pre" onClick={() => prev()}><i className="iconfont icon-arrow-left-"/></div>
                </div>
            </div>
        );
    }


}


