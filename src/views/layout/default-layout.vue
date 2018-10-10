<template>
    <div class="app-wrapper">
      <div class="main-container">
        <div class="hide-blank" @click="showNav">
         <icon-svg icon-class="xialajiantou"  :class="{ 'is-visible': isVisible }" class="icon el-icon-caret-bottom svg-image"></icon-svg>
        </div>
        <transition name="el-zoom-in-top">
          <navbar v-show="navbarVisible"></navbar>
        </transition>
        <app-main></app-main>
      </div>
    </div>
</template>

<script>
import { Navbar, AppMain } from 'views/layout';
export default {
  data() {
    return {
      navbarVisible: true,
      isVisible: false
    };
  },
  methods: {
    showNav() {
      this.navbarVisible = !this.navbarVisible;
    }
  },
  components: {
    AppMain,
    Navbar
  }
};
</script>

<style lang="scss" scoped>
@import 'src/styles/mixin.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.hide-blank {
  background-color: rgba(128, 128, 128, 0);
  color: rgba(128, 128, 128, 0);
  height: 10px;
  width: 100%;
  /* top: 10px; */
  position: fixed;
  z-index: 1000;
  // transform: translate(0,0);
  // transition:all 2s ease-in 6s;
  text-align: center;
}
.hide-blank:hover{
    cursor: pointer;
    color: #3AE66B;
  }
.is-visible {
    display: none;
}
</style>
