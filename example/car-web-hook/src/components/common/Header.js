import React, {} from 'react';
import {Link} from "react-router-dom";


export default (props) => {

    return (
        <header className="bg-theme">
            <div className="wrap-header zerogrid">
                <div className="row">
                    <div className="cssmenu">
                        <ul>
                            <li className="active"><Link to='/'>首页</Link></li>
                            <li><Link to='detail'>详情</Link></li>
                            <li><Link to='contract'>联系方式</Link></li>
                        </ul>
                    </div>
                    <Link className="logo" to="/"><img src="images/logo.png"/></Link>
                </div>
            </div>
        </header>


    );
}


