import Axios from 'axios' ;

const admin = Axios.create({
    baseURL: 'http://localhost:8088/admin'
})
admin.interceptors.request.use(config => {

    config.headers['token'] = localStorage.getItem('token');
    return config
})
admin.interceptors.response.use(response => response.data, error => Promise.reject(error));
export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
        async login(ctx, payload) {
            let token = await admin.post('/login', payload);
            if (token) localStorage.setItem('token', token);
            return token;

        },

        async getBanner() {

            return admin.get('/banner');


        },

        async deleteBanner(ctx, ID) {
            if (!ID) throw new Error('need ID');

            return admin.delete(`/banner`, {params: {ID}});

        },

        async createBanner(ctx, data = {}) {

            return admin.post('/banner', data);

        },

        async updateBanner(ctx, {ID, data = {}}) {
            if (!ID) throw new Error('need ID');

            return admin.patch('/banner', data, {params: {ID}});


        },

        async getCar(ctx, page = 1) {

            return admin.get('/car', {params: {page}});

        },
        async deleteCar(ctx, ID) {

            if (!ID) throw  new Error('need ID');

            return admin.delete('/car', {params: {ID}});
        },
        async createCar(ctx, data = {}) {

            return admin.post('/car', data);
        },

        async updateCar(ctx, {ID, data = {}}) {

            if (!ID) throw  new Error('need ID');
            return admin.patch('/car', data, {params: {ID}});
        },
        async getCarCount() {

            return admin.get('/car/count');
        },
        async getMessage(ctx, {page = 1, size = 10} = {}) {

            let {data} = await admin.get('/message',{params:{page,size}});

            return data.map(item => {

                let date = new Date(item.date);
                let month = date.getMonth() + 1;
                let hour = date.getHours();
                let minutes = date.getMinutes();
                month = month > 9 ? month : `0${month}`;
                hour = hour > 10 ? hour : `0${hour}`;
                minutes = minutes > 10 ? minutes : `0${minutes}`;

                item.date = `${date.getFullYear()}-${month}-${date.getDate()} ${hour}:${minutes}`;
                return item;
            })
        },
        async deleteMessage(ctx, IDs) {

            let ID = IDs.join(',');
            return await admin.delete('/message', {params: {ID}});

        },

        async  getMessageCount(){

            return await  admin.get('/message/count');
        }

    },
    getters: {}

}