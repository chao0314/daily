import React, {Component} from 'react';
import withNet from "../common/Net";
import {connect} from 'react-redux';
import {setToken} from "../../store/admin/actions";

class Login extends Component {


    constructor(props) {
        super(props);
        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    login() {

        let username = this.usernameRef.current.value;
        let password = this.passwordRef.current.value;
        this.props.post('/login', {username, password}).then(({err, token}) => {
            if (err) alert('账户或密码错误！');
            else {
                this.props.history.push('/index/banner');
                this.props.setToken({token});
            }
        })


    }

    render() {

        return (
            <div>
                <div className="dialog-shadow"/>
                <div className="panel panel-default dialog-panel">
                    <div className="panel-heading">
                        <h2 className="panel-title">
                            登录
                            {/*<a href="#" className="glyphicon glyphicon-remove pull-right"/>*/}
                        </h2>
                    </div>
                    <div className="panel-body">
                        {/*内容*/}
                        <form>
                            <div className="form-group">
                                <label htmlFor="username">用户名</label>
                                <input type="text" className="form-control" id="username" name="username"
                                       placeholder="请输入用户名" ref={this.usernameRef}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">密码</label>
                                <input type="password" className="form-control" id="password" name="username"
                                       placeholder="请输入用户名" ref={this.passwordRef}/>
                            </div>
                            <div className="form-group">
                                <button type="button" className="btn btn-primary" onClick={this.login.bind(this)}>登录
                                </button>
                                {/*<button type="button" className="btn btn-default">取消</button>*/}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        )
    }

}

export default connect((state, props) => props, {
    setToken
})(withNet(Login));

