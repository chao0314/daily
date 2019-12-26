import React, {useEffect, useContext, useState} from 'react';
import {Switch, Route} from "react-router-dom";
import {ctx} from './store';
import Login from './pages/Login';
import Index from "./pages/Index";

export default (props) => {
  let {history} = props;
    let {state: {token, tokenExpires}} = useContext(ctx);
    useEffect(() => {
        if (!token) history.push('/login');
    }, []);

    return (
        <Switch>
            <Route key={'index'} path={'/'} exact={true} component={Index}>
            </Route>
            <Route key={'login'} path={'/login'} component={Login}>
            </Route>
        </Switch>


    );
}


