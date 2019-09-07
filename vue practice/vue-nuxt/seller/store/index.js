export const state = () => ({
  user: {
    name: '',
    token: '',
    token_expires: ''
  }
});

export const mutations = {
  setUserinfo(state, payload) {
    let {name, token, token_expires} = payload;
    state.user = payload;
    localStorage.setItem('name', name);
    localStorage.setItem('token', token);
    localStorage.setItem('token_expires', token_expires);

  }
};

export const actions = {

  async login({commit}, payload) {
    let data = (await this.$axios.post('/user/login', payload)).data.data;
    console.log(data)
    commit('setUserinfo', {name: payload.name, ...data})

  }
};
export const getters = {};
