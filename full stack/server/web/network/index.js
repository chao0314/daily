import Axios from 'axios';

export const main = Axios.create({
    baseURL: 'http://localhost:8083'
});

