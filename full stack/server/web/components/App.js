import React, {Component} from 'react';

export default class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{height: '200px', background: 'pink', fontSize: "30px"}}>
                hello server side render
            </div>
        );
    }
}


