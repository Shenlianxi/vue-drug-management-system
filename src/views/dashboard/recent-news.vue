<template>
  <div class="recent-news-wrapper" :style="'width:' + computedWidth">
    <mini-card></mini-card>
    <!-- <dms-chart class="testchart"></dms-chart> -->
  </div>
</template>

<script>
import miniCard from 'components/dashboard-tools/mini-card';
import dmsChart from 'components/charts/dms-chart';
export default {
  data() {
    return {
      computedWidth: '1000px',
      miniCardData: []
    };
  },
  components: {
    miniCard,
    dmsChart
  },
  computed: {
    listenMenuType() {
      return this.$store.state.global.menuType;
    }
  },
  methods: {
    initData() {
    }
  },
  watch: {
    listenMenuType(val) {
      // vuex成功监听
      const totalWidth = document.body.clientWidth;
      if (val === 'zhankaicaidan') {
        this.computedWidth = (totalWidth - 220) + 'px';
      } else {
        this.computedWidth = (totalWidth - 220) + 'px';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.recent-news-wrapper {
  float: left;
  height: auto;
  margin-left: 10px;
  border: 1px solid red;
}
.testchart {
  height: 300px;
  width: 300px;
  border: 1px solid blue;
}
</style>
