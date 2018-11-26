const global = {
  state: {
    theme: 'cockpit',
    menuType: 'zhankaicaidan',
    bodyWidth: '1000px'
  },

  mutations: {
    SET_THEME: (state, theme) => {
      state.theme = theme;
    },
    SET_MENU_TYPE: (state, menuType) => {
      state.menuType = menuType;
    },
    SET_BODY_WIDTH: (state, bodyWidth) => {
      state.bodyWidth = bodyWidth;
    }
  },

  actions: {
  }
};
export default global;
