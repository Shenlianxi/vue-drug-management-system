<template>
  <div class="top-nav">
    <el-menu class="navbar"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <!-- 导航栏需要的功能再次拓展 -->
      <div v-if="leftExsistState" class="nav-pull-push" @click="handleChangeMenuType">
        <icon-svg :icon-class="leftMenuType" ></icon-svg>
      </div>
      <div class="profile-photo">
        <img style="height:100%; width:100%" src="@/assets/image/gears.png">;
      </div>
      <el-menu-item index="1">数据中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">维护驾驶舱</template>
        <el-menu-item index="2-1">维护列表</el-menu-item>
        <!-- 显示维护的医护人员列表 -->
        <el-menu-item index="2-2">药品信息维护</el-menu-item>
        <!-- 提供修改价格等信息, 查询等功能, 类别修改 -->
        <el-menu-item index="2-3">顾客信息维护</el-menu-item>
      </el-submenu>
        <el-submenu index="2-4">
          <template slot="title">库存管理</template>
          <el-menu-item index="2-4-1">药品入库</el-menu-item>
          <el-menu-item index="2-4-2">药品出库</el-menu-item>
        </el-submenu>
        <el-menu-item index="2-5">订单管理</el-menu-item>
        <el-menu-item index="3">分析系统</el-menu-item>
      <el-menu-item index="4">报表系统</el-menu-item>
      <el-menu-item index="5">销售系统</el-menu-item>
    </el-menu>
    <left-nav v-if="leftExsistState" :openLeftState="leftMenuType"></left-nav>
  </div>
</template>

<script>
import leftNav from './left-navbar';
export default {
  data() {
    return {
      // 注释测试老湿
      activeIndex: '1',
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
.profile-photo {
  float: left;
  height: 40px;
  margin: 10px 10px 10px 20px;
  width: 40px;
}
</style>
