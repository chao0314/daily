import React, {useContext} from 'react';
import {Card, Form, Input, Button} from 'antd';
import {ctx} from '../../src/store'
import rules from '../rules'


const Login = (props) => {
    let {history} = props;
    let {getFieldDecorator, validateFields} = props.form;
    let {username, password} = rules;
    let {useMapAction} = useContext(ctx);
    let register = useMapAction('register');
    let login = useMapAction('login');

    function reg() {
        validateFields((error, values) => {
            console.log('error', error);
            console.log('values', values);
            register(values).then(({err, res}) => {
                console.log("register", res);
                if (err) alert(res);
                else alert(res + '请登录');

            })
        })
    }

    function log() {
        validateFields((error, values) => {
            login(values).then(({err, res}) => {
                if (!err) history.push('/index');
                else alert(res);
            });
        })

    }

    return (
        <Card title="登录" className="dialog">
            <Form>
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: username
                    })(
                        <Input type="text" placeholder="请输入用户名"/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: password
                    })(
                        <Input type="password" placeholder="请输入密码"/>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={() => log()}>登录</Button>
                    <Button type="default" onClick={() => reg()}>注册</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Form.create()(Login)


