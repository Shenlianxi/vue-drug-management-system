export default{
  install(Vue) {
    Vue.directive('select', (el, option) => {
      const defClass = 'el-input';
      const defTag = 'input';
      let value = option.value || true;
      if (typeof value === 'boolean') { value = { cls: defClass, tag: defTag, foc: value }; } else { value = { cls: value.cls || defClass, tag: value.tag || defTag, foc: value.foc || false }; }
      if (el.classList.contains(value.cls) && value.foc) { el.getElementsByTagName(value.tag)[0].select(); }
    });
  }
};
