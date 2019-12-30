import Axios from 'axios';
import IndexHome from "../components/Index/IndexHome";
import IndexTeam from "../components/Index/IndexTeam";
import IndexGoods from "../components/Index/IndexGoods";

const main = Axios.create({
    baseURL: 'http://localhost:8083'
});

export default {

    async register({dispatch}, payload) {
        let {data} = await main.post('/admin/register', payload);
        return data;
    },

    async login({dispatch}, payload) {

        let {data} = await main.post('/admin/login', payload);
        let {token, token_expires, authority} = data;
        localStorage.setItem('token', token);
        localStorage.setItem('token_expires', token_expires);
        localStorage.setItem('authority', JSON.stringify(authority));
        console.log(authority);
        dispatch({type: "setToken", payload: {token, token_expires, authority}});
        return data;
    },

    async getMenus({state: {authority}, dispatch}, payload) {
        //todo  get from service
        const menus = [
            {title: '首页', icon: 'index', path: '/index', exact: true, component: IndexHome},
            {title: '团队管理', icon: 'team', path: '/index/team', component: IndexTeam, authority: 'team'},
            {title: '商品管理', icon: 'shopping', path: '/index/goods', component: IndexGoods, authority: 'goods'},
        ];
        const keys = Object.keys(authority);
        return menus.map(menu => {
            if (!menu.authority || keys.includes(menu.authority)) return menu;
        }).filter(menu => menu);


    }


}
