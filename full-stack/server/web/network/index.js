import Axios from 'axios';

export const main = Axios.create({
    // baseURL: 'http://localhost:8083',
    baseURL: 'https://www.soamazing.cn/api'
});

