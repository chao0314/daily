import React, {Component} from 'react';


export default class IndexSlider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cur: -1
        };
        this.ref = React.createRef()
    }

    componentDidMount() {
        this.next();
    }


    next() {
        let {cur} = this.state;
        let {sliders} = this.props;
        this.setState({cur: (cur + 1) % sliders.length});

    }

    prev() {
        let {cur} = this.state;
        let {sliders} = this.props;
        this.setState({cur: (cur + sliders.length - 1) % sliders.length});
    }

    render() {
        const {sliders, options = {}} = this.props;
        const width = options.width || 550;
        const contentWidth = width * sliders.length;
        return (
            <div className="item banner-slider shadow">
                <div className="slider">
                    <div ref={this.ref} className="slider-content"
                         style={{width: `${contentWidth}px`, transform: `translateX(-${this.state.cur * width}px)`}}>

                        {sliders.map((v, i) => (
                            <div className={"slider-item" + (i === this.state.cur ? " active" : "")}
                                 style={{left: `${width * i}px`}} key={i}>
                                <div className="slider-img-div" style={{backgroundImage: `url(${v.img})`}}/>
                            </div>))
                        }

                    </div>
                    <div className="slider-pagination">

                        {sliders.map((v, i) => (
                            <div className={"pagination" + (i === this.state.cur ? " cur" : "")} key={i}/>
                        ))}
                    </div>
                    <div className="btn btn-next" onClick={() => this.next()}><i
                        className="iconfont icon-arrow-right-"/>
                    </div>
                    <div className="btn btn-pre" onClick={() => this.prev()}><i className="iconfont icon-arrow-left-"/>
                    </div>
                </div>
            </div>
        );
    }


}


