const global = {
  state: {
    theme: 'cockpit',
    menuType: 'zhankaicaidan'
  },

  mutations: {
    SET_THEME: (state, theme) => {
      state.theme = theme;
    },
    SET_MENU_TYPE: (state, menuType) => {
      state.menuType = menuType;
    }
  },

  actions: {
  }
};
export default global;
