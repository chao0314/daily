import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from "react-router-dom";
import withNet from "./components/common/Net";
import Login from "./components/admin/Login";
import Index from "./components/admin/Index";
import Error from "./components/common/Error";

class App extends Component {

    componentDidMount() {

        const {token, token_expires, history} = this.props;
        //need to verify token invalid or not , after todo...
        if (!token || Date.now() > token_expires) history.push('/login');
        // else history.push('/index/banner');

    }


    render() {

        return (
            <Switch>
                <Route path='/index' component={Index}/>
                <Route path='/login' component={Login}/>
                <Route path='/error' component={Error}/>
            </Switch>

        )


    }

}


export default connect((state, props) => {
    let {token, token_expires} = state.admin;
    return {token, token_expires, ...props};
})(withNet(App));
