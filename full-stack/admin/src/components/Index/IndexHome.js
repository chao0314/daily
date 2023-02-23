import React, {useState, useContext} from 'react';
import {Button, Modal, Form, Input, message} from "antd";
import {ctx} from "../../store";

const IndexHome = (props) => {
    const {form: {resetFields, getFieldDecorator, validateFields}} = props;
    const [visible, setVisible] = useState(false);
    const {useMapAction} = useContext(ctx);
    const createShop = useMapAction('createShop');

    function cShop() {
        console.log("create shop");
        validateFields((error, values) => {
            if (error) console.log(error);
            else {
                console.log(values);
                createShop(values).then(res => {
                    message.success('创建成功');
                    setVisible(false);
                }).catch(err => {
                    console.log(err);
                    message.error('创建失败');
                })

            }
        })

    }


    return (
        <div>
            <Button onClick={() => setVisible(true)}>创建店铺</Button>
            <Modal title="添加" visible={visible} onOk={cShop} onCancel={() => {
                setVisible(false);
                resetFields();
            }}>
                <Form>
                    <Form.Item>
                        {getFieldDecorator('shopName', {
                            rules: [
                                {required: true, message: '店铺名称必须填写'}
                            ]
                        })(
                            <Input type="text" placeholder="请输入店铺的名称"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('address', {})(
                            <Input type="text" placeholder="请输入店铺的地址"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('tel', {})(
                            <Input type="text" placeholder="请输入店铺的电话"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('opentime', {})(
                            <Input type="text" placeholder="请输入店铺的营业时间"/>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
};
export default Form.create()(IndexHome);