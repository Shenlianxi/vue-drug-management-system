const user = {
  state: {
    status: 'online'
  },

  mutations: {
    SET_STATUS: (state, status) => {
      state.status = status;
    }
  },

  actions: {
    setStatus: ({ commit }, statu) => {
      commit('SET_STATUS', statu);
    }
  }
};
export default user;
