<template>
  <div class="left-navbar-wrapper">
    <el-menu class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      default-active="1-1">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">系统信息</span>
        </template>
        <el-menu-item-group>
          <span slot="title">使用指南</span>
          <el-menu-item index="1-1">最近消息</el-menu-item>
          <el-menu-item index="1-2">如何创建数据</el-menu-item>
          <el-menu-item index="1-3">如何管理数据</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="账号">
          <el-menu-item index="1-3">账户信息维护</el-menu-item>
          <el-menu-item index="1-4">上传头像</el-menu-item>
        </el-menu-item-group>
        <!-- <el-submenu index="1-4">
          <span slot="title">协作部门</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu> -->
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">推广中心</span>
        <!-- 广告推广出租等信息 -->
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">生活指南</span>
      </el-menu-item>
      <!-- <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="6" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="7">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  props: {
    openLeftState: {
      type: String
    }
  },
  watch: {
    openLeftState(newVal, oldVal) {
      this.isCollapse = !this.isCollapse;
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    max-height: 80vh;
  }
  .left-navbar-wrapper {
    float: left;
    margin-top: 10px;
    margin-left: 10px;
  }
</style>
