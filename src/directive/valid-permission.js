import store from '../store';
export default{
  install(Vue) {
    Vue.directive('has', {
      bind: function(el, binding) {
        if (!has(binding.value.code)) {
          if (el.parentNode) {
            el.parentNode.removeChild(el);
          }
        }
      }
    });
  }
};

const has = function(permission) {
  const permissions = [];
  console.log(store.getters);
  if (store.getters.code.length !== 0) {
    store.getters.code.forEach(function(element) {
      permissions.push(element.code);
    });
    if (permissions.indexOf(permission) < 0) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};
