import React, {} from 'react';
import {Card, Form, Input, Button} from 'antd';
import rules from '../rules'


const Login = (props) => {
    let {getFieldDecorator} = props.form;
    let {username, password} = rules;

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
                    <Button type="primary" onClick={()=>console.log('登录')}>登录</Button>
                    <Button type="default" onClick={()=>console.log('注册')}>注册</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Form.create()(Login)


