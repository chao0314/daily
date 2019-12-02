import React, {Component} from 'react';
import IndexCatalog from "./index/IndexCatalog";
import IndexBanner from "./index/IndexBanner";

export default class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <IndexCatalog {...this.props}></IndexCatalog>
                <IndexBanner {...this.props}></IndexBanner>
            </div>
        );
    }
}

