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
    localStorage.setItem('name', name);
    localStorage.setItem('token', token);
    localStorage.setItem('token_expires', token_expires);

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
    commit('setUserInfo', {name: payload.name, ...data})

  }
};
export const getters = {};
