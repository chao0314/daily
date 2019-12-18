import React, {useEffect, useContext, useState} from 'react';
import {Switch, Route} from "react-router-dom";
import {Context} from './store';
import Login from './pages/Login';
import Index from "./pages/Index";

export default (props) => {
  let {history} = props;
    let {state: {token, tokenExpires}} = useContext(Context);
    useEffect(() => {
        console.log(token)
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


