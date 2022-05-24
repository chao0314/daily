import {io} from "socket.io-client";
import {ref} from 'vue';

// const socket = io('ws://localhost:4554');
// socket.on('summary.info', data => console.log(data));

const summary = {

    totalOrder: 1999999,
    totalSales: 6666666666,
    last10MinOrderCount: 11111,
    targetSales: 10000000000
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


const createTrendList = (n) => {

    const list = [];
    for (let i = 0; i < n; i++) {

        list.push({
            orders: Math.round(1000 * Math.random()),
            sales: Math.round(10000 * Math.random()),
            time: Date.now() - 60 * 1000 * (n - i)
        })

    }
    return list;


}


const cityData = [
    {province: '浙江省', count: 99},
    {province: '江苏省', count: 88},
    {province: '上海市', count: 66},
    {province: '北京市', count: 77},

];


const deviceData = [{
    device: '电脑',
    count: 666,
},
    {
        device: '手机',
        count: 999,
    }, {
        device: '平板',
        count: 111,

    }]

const keywordData = [
    {
        keyword: '华为',
        count: 888
    },
    {
        keyword: '苹果',
        count: 666
    }, {
        keyword: '小米',
        count: 777
    }
]

// summary.info
export const summaryInfo = ref(summary);

// keyword.list
export const keywordList = ref(keywordData);

// order.superOrder
export const superOrder = ref(new Array(10).fill(orderItem));

// order.trend

export const trendList = ref(createTrendList(120));

// order.citys
export const cityList = ref(cityData);

// order.devices
export const deviceList = ref(deviceData);

