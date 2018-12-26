export default {
  install(Vue) {
    Vue.directive('drag', {
      bind: function(el, binding, vnode) {
        let positionX = 0;
        let positionY = 0;
        let mousedownX = 0;
        let mousedownY = 0;
        let mouseX = 0;
        let mouseY = 0;
        let moveX = 0;
        let moveY = 0;
        const target = el;
        let isMove = false;
        let handle = [];
            // 查看是否有指定绑定参数
        if (binding.expression !== undefined) {
                // 因为vue有渲染延迟的原因，所以只能通过在vue生成的dom元素上进行获取
          handle = el.querySelectorAll(binding.value);
        } else {
          handle.push(el);
        }

        handle.forEach(function(dom) {
          dom.onmousedown = function(e) {
            isMove = true;

            positionX = target.offsetLeft;
            positionY = target.offsetTop;
            mousedownX = e.pageX;
            mousedownY = e.pageY;

            return false;
          };

          dom.addEventListener('mouseup', function(e) {
            isMove = false;
          });
        });

            // 如果不指定前缀，则默认使用document为实例对象
        addEventListener('mousemove', function(e) {
          if (isMove) {
            mouseX = e.clientX;
            mouseY = e.clientY;

            moveX = positionX + mouseX - mousedownX;
            moveY = positionY + mouseY - mousedownY;

            target.style.left = moveX + 'px';
            target.style.top = moveY + 'px';
          } else {
            return false;
          }
        });

        addEventListener('mouseup', function() {
          isMove = false;
        });
      }
    });
  }
};
