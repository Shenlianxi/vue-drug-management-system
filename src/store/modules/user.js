import { getToken } from 'utils/auth';
import { getPrivInfo } from 'api/user';
const user = {
  state: {
    status: 'online',
    token: getToken(),
    roles: [],
    code: []
  },

  mutations: {
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_CODE: (state, code) => {
      state.code = code;
    }
  },

  actions: {
    setStatus: ({ commit }, statu) => {
      commit('SET_STATUS', statu);
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getPrivInfo().then(response => {
          const data = response.data.data;
          const arr = [];
          arr.push(data.role);
          commit('SET_ROLES', arr);
          commit('SET_CODE', data.code);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    }
  }
};
export default user;
