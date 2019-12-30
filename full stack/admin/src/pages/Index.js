import React, {useContext, useEffect, useState} from 'react';
import {Switch, Route} from "react-router-dom";
import {Layout, Menu, Icon} from "antd";
import IndexHome from "../components/Index/IndexHome";
import IndexGoods from "../components/Index/IndexGoods";
import IndexTeam from "../components/Index/IndexTeam";
import {ctx} from '../../src/store';

const {Sider, Content, Footer} = Layout;


export default (props) => {
    let {history, location} = props;
    const {state: {authority}, useMapAction} = useContext(ctx);
    const getMenus = useMapAction('getMenus');
    const [menus, setMenus] = useState([]);
    useEffect(() => {
        getMenus().then(menus => setMenus(menus));
    }, []);


    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[location.pathname]}
                    onClick={ev => history.push(ev.key)}
                >
                    {menus.map(menu => (
                        <Menu.Item key={menu.path}>
                            <Icon type={menu.icon}/>
                            <span>{menu.title}</span>
                        </Menu.Item>
                    ))}
                </Menu>
            </Sider>
            <Layout>
                <Content>
                    <Switch>
                        {menus.map(menu => (
                            <Route
                                key={menu.path}
                                path={menu.path}
                                exact={menu.exact}
                                component={menu.component}
                            />
                        ))}
                    </Switch>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    xxx公司版权所有
                </Footer>
            </Layout>
        </Layout>
    );
}


