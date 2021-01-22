import React, {Component} from 'react';
import {Route, Link, Switch} from "react-router-dom";
import InfoBanner from "./InfoBanner";
import InfoCar from "./InfoCar";
import InfoMessage from "./InfoMessage";

export default class Tabs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current: 0
        }
    }


    switch(index) {
        this.setState({
            ...this.state,
            current: index
        })
    }

    render() {

        let tabs = this.props.tabs || [{label: "选项1", path: "/"}, {label: "选项2", path: "/"}];
        let {current} = this.props || this.state;
        return (
            <>
                <ul className="nav nav-tabs">
                    {
                        tabs.map((tab, index) => (
                            <li role="presentation" key={index} className={current === index ? "active" : ""}
                                onClick={this.switch.bind(this, index)}>
                                <Link to={tab.path}>{tab.label}</Link>
                            </li>))
                    }


                </ul>
                <Switch>
                    <Route path='/index/banner' component={InfoBanner}/>
                    <Route path='/index/car' component={InfoCar}/>
                    <Route path='/index/message' component={InfoMessage}/>
                </Switch>

            </>


        )
    }

}

