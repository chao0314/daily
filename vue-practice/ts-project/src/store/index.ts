import Vue from 'vue';
import Vuex from 'vuex';
import {taobao} from "@/http";

Vue.use(Vuex);
import {SuggestData, CatalogData, CatalogDetail, BannerItem, AdItem, HotItem} from "@/type";
import {c2cData, shopData, filter, goodsAdsItem} from '@/type/search';
import {detailItem} from "@/type/detail";

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        userInfo: {
            name: "",
            token: "",
            token_expires: 0
        }
    },
    mutations: {
        saveUserInfo(state, payload) {
            state.userInfo = payload;
            localStorage.setItem('userInfo', JSON.stringify(payload));
        }
    },
    actions: {
        async getSuggest({commit}, payload): Promise<SuggestData> {
            let {data: {data}} = await taobao.get("/search/sug", {params: payload});
            return data;
        },
        async getCatalog(): Promise<CatalogData[]> {
            let {data: {data}} = await taobao.get('/catalog/list');
            return data;
        },
        async getCatalogDetail({commit}, index): Promise<CatalogDetail> {
            let cache = sessionStorage.getItem(index);
            if (cache) return JSON.parse(cache);
            let {data: {data}} = await taobao.get(`/catalog/detail/${index}`);
            sessionStorage.setItem(index, JSON.stringify(data));
            return data;
        },
        async getBanners({commit}): Promise<BannerItem[]> {
            return (await taobao.get("/banner")).data.data;
        },
        async getAds({commit}): Promise<{ [index: string]: AdItem }> {

            return (await taobao.get("/ad", {params: {type: 'banner'}})).data.data;
        },
        async getHotKeyword(): Promise<BannerItem[]> {
            return (await taobao.get("/index/hot/keywords")).data.data;
        },
        async getHotList(): Promise<HotItem[]> {
            return (await taobao.get("/index/hot/list")).data.data;
        },
        async login({commit}, payload): Promise<{ token: string, token_expires: string }> {

            let {data: {data}} = await taobao.post("/user/login", payload, {
                headers: {
                    'content-type': 'application/json'
                }
            });
            data.name = payload.name;
            commit("saveUserInfo", data);
            return data;
        },
        async register({commit}, payload): Promise<{ userID: number }> {
            let {data: {data}} = await taobao.post('/user/reg', payload, {headers: {'content-type': 'application/json'}});
            return data;

        },
        async getUserInfo({state}) {
            let {token, token_expires} = state.userInfo;
            if (token && token_expires > Date.now()) {
                let {data: {data}} = await taobao.get('/user/getinfo', {params: {token: state.userInfo.token}});
                return data;
            }


        },
        async initUserInfo({commit}) {
            let userInfo = JSON.parse(localStorage.getItem('userInfo') || "{}");
            let date = Number(userInfo.token_expires);
            if (date > Date.now()) userInfo.token_expires = date;
            commit('saveUserInfo', userInfo);
            return true;
        },
        async search({commit}, payload: filter): Promise<c2cData | shopData[]> {
            return (await taobao.get('/search', {params: payload})).data.data;
        },
        async getGoodsAds(): Promise<goodsAdsItem> {
            return (await taobao.get('/ad', {params: {type: 'search'}})).data.data;
        },
        async getItem(store,payload):Promise<detailItem>{
            //todo
            console.log(payload)
             return (await taobao.get('/item')).data.data;
        }
    },
    modules: {}
});
