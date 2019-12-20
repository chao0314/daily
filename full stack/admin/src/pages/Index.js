import React, {} from 'react';
import {Switch, Route} from "react-router-dom";
import {Layout, Menu, Icon} from "antd";
import IndexHome from "../components/Index/IndexHome";
import IndexGoods from "../components/Index/IndexGoods";
import IndexTeam from "../components/Index/IndexTeam";

const {Sider,Content,Footer} = Layout;

const menus = [
    {title: '首页', icon: 'home', path: '/home', exact: true, component: IndexHome},
    {title: '团队管理', icon: 'team', path: '/team', component: IndexTeam},
    {title: '商品管理', icon: 'shopping', path: '/goods', component: IndexGoods},
];


export default (props) => {
    let {history,location} = props;

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


