import {io} from "socket.io-client";
import {ref} from 'vue';

// const socket = io('ws://localhost:4554');
// socket.on('summary.info', data => console.log(data));

const summary = {

    totalOrder: 1999999,
    totalSales: 66666666,
    last10MinOrderCount: 111
}


const keywordItem = {
    keyword: '华为',
    count: 888
}

const orderItem = {
    city: '杭州',
    count: 555,
    device: '手机',
    item: 'xxx商品',
    price: 888,
    province: '浙江',
    time: 1645673430250
}


const trendItem = {
    orders: 666,
    sales: 777,
    time: 1645673430250
}

const cityItem = {
    province: '浙江',
    count: 222
}

const deviceItem = {
    device: '电脑',
    count: 999,
}


// summary.info
export const summaryInfo = ref(summary);

// keyword.list
export const keywordList = ref(new Array(10).fill(keywordItem));

// order.superOrder
export const superOrder = ref(new Array(10).fill(orderItem));

// order.trend
export const trendList = ref(new Array(120).fill(trendItem));

// order.citys
export const cityList = ref(new Array(10).fill(cityItem));

// order.devices
export const deviceList = ref(new Array(10).fill(deviceItem));
