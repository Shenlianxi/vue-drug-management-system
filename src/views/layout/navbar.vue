<template>
  <div class="top-nav">
    <el-menu class="navbar"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <!-- 导航栏需要的功能再次拓展 -->
      <div :class="{'nav-pull-push': leftExsistState, 'nav-pull-push-no': !leftExsistState}" @click="handleChangeMenuType">
        <icon-svg :icon-class="leftMenuType" ></icon-svg>
      </div>
      <div class="profile-photo" @click="goTo">
        <img style="height:100%; width:100%" src="@/assets/image/gears.png">
      </div>
      <el-menu-item index="1">数据中心</el-menu-item>
      <el-menu-item index="2">维护驾驶舱</el-menu-item>
      <!-- <el-submenu index="2">
        <template slot="title"></template> -->
        <!-- <el-menu-item index="2-1">维护列表</el-menu-item> -->
        <!-- 显示维护的医护人员列表 -->
        <!-- <el-menu-item index="2-2">药品信息维护</el-menu-item> -->
        <!-- 提供修改价格等信息, 查询等功能, 类别修改 -->
        <!-- <el-menu-item index="2-3">顾客信息维护</el-menu-item> -->
      <!-- </el-submenu> -->
        <el-submenu index="3">
          <template slot="title">药品管理</template>
          <el-menu-item index="3-1">药品信息维护</el-menu-item>
          <el-menu-item index="3-2">库存管理</el-menu-item>
        </el-submenu>
        <el-menu-item index="4">订单管理</el-menu-item>
        <el-menu-item v-has="{code: 'analysis'}" index="5">分析系统</el-menu-item>
      <el-menu-item index="6">报表系统</el-menu-item>
      <el-menu-item index="7">销售系统</el-menu-item>
      <div class="navbar-right">
        <el-dropdown  trigger="click">
          <span class="el-dropdown-link">
            {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="roleName">{{roleName}}</el-dropdown-item>
            <el-dropdown-item v-if="roleName" @click.native="personalCenter">个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="logOut">登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span class="lingdang"><i class="el-icon-bell"></i></span>
      </div>
    </el-menu>
    <left-nav v-if="leftExsistState" :openLeftState="leftMenuType"></left-nav>
  </div>
</template>

<script>
import leftNav from './left-navbar';
import { removeToken } from '@/utils/auth';
export default {
  data() {
    return {
      activeIndex: '1',
      leftMenuType: 'zhankaicaidan',
      leftExsistState: false,
      userName: '',
      roleName: ''
    };
  },
  watch: {
  },
  computed: {
    // leftExsist() {
    //   if ((location.href).indexOf('mainpageview') !== -1) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }
  },
  mounted() {
    if ((location.href).indexOf('mainpageview') !== -1) {
      this.leftExsistState = true;
    } else {
      this.leftExsistState = false;
    }
    const userData = JSON.parse(localStorage.getItem('userData'));
    this.userName = userData.userName;
    this.roleName = userData.userRole;
  },
  methods: {
    handleSelect(key, keypath) {
      const mapper = this.mapper();
      const currentRouter = (mapper.filter(item => item.key === key))[0];
      this.$router.push({ path: currentRouter.loc });
      this.leftExsistState = false;
      console.log(key);
    },
    handleChangeMenuType() {
      this.leftMenuType = this.leftMenuType === 'zhankaicaidan' ? 'shouqicaidan' : 'zhankaicaidan';
      this.$store.commit('SET_MENU_TYPE', this.leftMenuType);
    },
    logOut() {
      // this.$store.dispatch('setStatus', 'offline');
      removeToken();
      // this.$router.push({ path: '/' });
      location.reload();
    },
    goTo() {
      this.$router.push({ path: '/mainpageview' });
      this.leftExsistState = true;
    },
    personalCenter() {
      this.$router.push({ path: '/personalcenter' });
      this.leftExsistState = false;
    },
    mapper() {
      const mapper = [
        { key: '1', loc: '/datacenter' },
        { key: '2', loc: '/maintenance' },
        { key: '3-1', loc: '/managedrug' },
        { key: '3-2', loc: '/stock' },
        { key: '4', loc: '/ordermaster' },
        { key: '5', loc: '/analysis' },
        { key: '6', loc: '/dashboardview' },
        { key: '7', loc: '/sales' }
      ];
      return mapper;
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
  transition: all 0.2s ease-in;
  -webkit-transition: all 0.3s ease-in;
}
.nav-pull-push-no {
  float: left;
  margin-left: 10px;
  font-size: 30px;
  color: #409EFF;
  transition: all 0.2s ease-in;
  -webkit-transition: all 0.3s ease-in;
}
.profile-photo {
  float: left;
  height: 40px;
  margin: 10px 10px 10px 20px;
  width: 40px;
  cursor: pointer;
}
.navbar-right {
  float: right;
  height: 50px;
  width: 160px;
  // border: 1px solid red;
  line-height: 50px;
  color: #ffffff;
}
.el-dropdown-link {
  color: #ffffff;
  cursor: pointer;
}
.lingdang {
  font-size: 28px;
  color: #ffffff;
  margin-left: 10px;
  cursor: pointer;
}
</style>
