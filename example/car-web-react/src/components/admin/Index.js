import React, {Component} from 'react';
import Tabs from "./Tabs";

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabs: [
                {label: "轮播图", path: "/index/banner"},
                {label: "汽车", path: "/index/car"},
                {label: "留言", path: "/index/message"}
            ],
            current: 0
        }
    }

    componentDidMount() {
        let {tabs, current} = this.state;
        this.setState({
            ...this.state,
            current: tabs.findIndex(tab => tab.path === this.props.location.pathname)

        })
    }

    render() {

        let {tabs, current} = this.state;
        return (
            <Tabs tabs={tabs} current={current}/>
        )


    }

}

