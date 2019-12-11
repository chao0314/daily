import React, {Component} from 'react';
import IndexCatalog from "./IndexCatalog";
import IndexBanner from "./IndexBanner";

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


