// import Axios from "axios";
//
// const v2 = Axios.create({
//   baseURL: 'http://api.zhinengshe.com/10004-taobao',
//   headers: {
//     apikey: '299f648e53754c579bb5d142cbcbb115',
//     'content-type': 'application/json'
//   }
// });
// v2.interceptors.request.use(function (config) {
//   console.log('token', localStorage.getItem('token'))
//   config.headers.token = localStorage.getItem('token');
//   return config;
// });
export const state = () => ({
  userInfo: {
    name: '',
    token: '',
    token_expires: ''
  }
});

export const mutations = {
  setUserInfo(state, payload) {
    let {name, token, token_expires} = payload;
    state.userInfo = payload;
    setTimeout(function () {
      localStorage.setItem('name', name);
      localStorage.setItem('token', token);
      localStorage.setItem('token_expires', token_expires);
    }, 1000);

  }
};

export const actions = {

  // async loadUserInfo({commit, dispatch}) {
  //
  //   // let name =  localStorage.getItem('token');
  //   // let token = localStorage.getItem('token');
  //   // let token_expires = localStorage.getItem('token_expires');
  //
  //   let name =  '';
  //   let token = '';
  //   let token_expires = '';
  //
  //   if (!token_expires || Number(token_expires) < Date.now()) {
  //     this.$router.push("login");
  //   }
  //   let userInfo = {
  //     name,
  //     token,
  //     token_expires
  //   };
  //   commit('setUserInfo', userInfo);
  //   return userInfo;
  // },

  async login({commit}, payload) {
    let data = (await this.$axios.post('/user/login', payload)).data.data;
    commit('setUserInfo', {name: payload.name, ...data});
    // let {data}=await this.$axios('/user/reg', {
    //   method: 'POST',                        //1.post方式
    //   headers: {
    //     'content-type': 'application/json'   //2.json格式提交
    //   },
    //   data: {
    //     mobile: '18258414234',
    //     email:"125301689@qq.com",//3.注册手机、邮箱、密码等
    //     password: 'wangzhichao'
    //   }
    // });
    // console.log(data)


  },

  async createShop(store, payload) {
    let {data: {data}} = await this.$axios.post('/shop/create', payload);
    console.log("create shop", data);
  },
  async editShop(store, payload) {
    let {data: {data}} = await this.$axios.post(`/shop/${payload.shopID}`, payload);
    console.log("edit shop", data);

  },
  async removeShop(s, payload) {
    let {data: {data}} = await this.$axios.delete('/shop/' + payload);
    console.log("remove shop", data);
  },

  async getShops(store, payload) {

    let {data: {data}} = await this.$axios.get('/shop/list', {
      params: {
        token: localStorage.getItem('token')
      }
    });
    return data;
  }

};
export const getters = {};
