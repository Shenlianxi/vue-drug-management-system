import { getToken } from 'utils/auth';
const user = {
  state: {
    status: 'online',
    token: getToken()
  },

  mutations: {
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    }
  },

  actions: {
    setStatus: ({ commit }, statu) => {
      commit('SET_STATUS', statu);
    }
  }
};
export default user;
