import axios from 'axios';

export default {

    async getNetworkContent(dispatch, payload) {
        let data = await test();
        dispatch({type: "setNetworkContent", payload: data});
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
