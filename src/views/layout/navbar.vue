<template>
  <div class="top-nav">
    <el-menu class="navbar"
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <!-- 导航栏需要的功能再次拓展 -->
      <div class="nav-pull-push" @click="handleChangeMenuType">
        <icon-svg :icon-class="leftMenuType" ></icon-svg>
      </div>
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
        <!-- <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu> -->
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
    </el-menu>
    <left-nav v-if="leftExsistState" :openLeftState="leftMenuType"></left-nav>
  </div>
</template>

<script>
import leftNav from './left-navbar';
export default {
  data() {
    return {
      activeIndex: 1,
      leftMenuType: 'zhankaicaidan'
    };
  },
  computed: {
    leftExsistState() {
      if ((window.location.href).indexOf('mainpageview') !== -1) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    handleSelect(key, keypath) {
      console.log(key, keypath);
    },
    handleChangeMenuType() {
      this.leftMenuType = this.leftMenuType === 'zhankaicaidan' ? 'shouqicaidan' : 'zhankaicaidan';
    }
  },
  components: {
    leftNav
  }
};
</script>

<style lang="scss" scoped>
.top-nav {
  // position: fixed;
  width: 100%;
  z-index: 100;
}
.navbar {
  height: 60px;
  line-height: 60px;
}
.nav-pull-push {
  float: left;
  margin-left: 10px;
  font-size: 30px;
  color: #409EFF;
}
</style>
