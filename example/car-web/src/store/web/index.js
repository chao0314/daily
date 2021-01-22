import Axios from 'axios' ;

const web = Axios.create({
    baseURL: 'http://localhost:8088/api'
})
web.interceptors.request.use(config => {

    config.headers['token'] = localStorage.getItem('token');
    return config
})
web.interceptors.response.use(response => response.data, error => Promise.reject(error));
export default {
    namespaced: true,
    state: {
        banners: []
    },
    mutations: {
        setBanners(state, payload) {
            state.banners = payload;
        }
    },
    actions: {

        async getBanner({state, commit}) {


            if (state.banners.length > 0) return state.banners;
            let {data: banners} = await web.get('/banner');
            commit('setBanners', banners);
            return banners;
        },
        async getCar(ctx, {page = 1, size = 5, sort = 'ID', order = -1, ID} = {}) {
            let {data} = await web.get('/car', {params: {page, size, sort, order, ID}});
            return data;

        },

        async getRecommend(ctx, {page = 1, size = 6, sort = 'price', order = -1} = {}) {

            let {data} = await web.get('/car/recommend', {params: {page, size, sort, order}});
            return data;

        },
        async createMessage(ctx,data){

            return await web.post('/message',data);

        }
    },
    getters: {}

}

