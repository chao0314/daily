import React, {Component} from 'react';
import ListFilter from "./ListFilter";
import ListLike from "./ListLike";
import ListShop from "./ListShop";

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {kw} = this.props;
        return (
            <div className="container poiList-wrap">
                <div className="breadcrumbs">
            <span>
                <a href="#">北京美团</a>
                >
                <a href="#">北京美食</a>
            </span>
                </div>
                <div className="left">
                    <ListFilter></ListFilter>
                    <div>
                        <ListShop kw={kw}></ListShop>
                    </div>
                </div>
                <div className="right">
                    <ListLike></ListLike>
                </div>

            </div>

        );
    }


}
