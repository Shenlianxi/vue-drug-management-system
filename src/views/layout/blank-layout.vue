<template>
<div class="app-wrapper">
  <div class="main-container">
    <app-main></app-main>
  </div>
</div>
</template>

<script>
import { AppMain } from 'views/layout';
export default {
  name: 'layout',
  components: {
    AppMain
  }
};
</script>

<style lang="scss">
.app-wrapper {
// @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  .main-container {
    height: 100%;
    min-height: 100%;
    transition: margin-left 0.28s ease-out;
  }
}
</style>
