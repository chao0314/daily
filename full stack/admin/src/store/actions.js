import Axios from 'axios';

const main = Axios.create({
    baseURL: 'http://localhost:8083'
});

export default {

    async register(dispatch, payload) {
        let {data} = await main.post('/admin/register', payload);
        return data;
    },

    async login(dispatch, payload) {

        let {data} = await main.post('/admin/login', payload);
        let {token, token_expires} = data;
        localStorage.setItem('token', token);
        localStorage.setItem('token_expires', token_expires);
        dispatch({type: "setToken", payload: {token, token_expires}});
        return data;
    },

    async getMenus(dispatch, payload) {

        return [
            {title: '首页', icon: 'home', path: '/', exact: true, component: 'Home'},
            {title: '团队管理', icon: 'team', path: '/team', component: 'Team'},
            {title: '商品管理', icon: 'shopping', path: '/goods', component: 'Goods'},
        ];


    }


}
