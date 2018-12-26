const clickoutsideContext = '@@clickoutsideContext';
export default {
  install(Vue) {
    Vue.directive('clickoutside', {
      bind: function(el, binding, vnode) {
        const documentHandler = function(e) {
          if (!vnode.context || el.contains(e.target)) {
            return false;
          }
          if (binding.expression) {
            vnode.context[el[clickoutsideContext].methodName](e);
          } else {
            el[clickoutsideContext].bindingFn(e);
          }
        };
        el[clickoutsideContext] = {
          documentHandler,
          methodName: binding.expression,
          bindingFn: binding.value
        };
        setTimeout(() => {
          document.addEventListener('click', documentHandler);
        }, 0);
      }
    });
  }
};
