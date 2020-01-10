import React, {useEffect, useContext} from 'react';
import {Switch, Route} from "react-router-dom";
import {ctx} from './store';
import Login from './pages/Login';
import Index from "./pages/Index";

export default (props) => {
    console.log('app')
    let {history} = props;
    let {state: {token}} = useContext(ctx);
    /* eslint-disable */
    useEffect(() => {
        if (!token) history.push('/login');
    }, []);
    /* eslint-enable */
    return (

        <Switch>
            <Route key={'index'} path={'/index'} component={Index}/>
            <Route key={'login'} path={'/login'} component={Login}/>
        </Switch>


    );
}


