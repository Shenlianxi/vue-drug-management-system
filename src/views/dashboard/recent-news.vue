<template>
  <div class="recent-news-wrapper">
    <mini-card></mini-card>
    <dms-chart class="testchart"></dms-chart>
  </div>
</template>

<script>
import miniCard from 'components/dashboard-tools/mini-card';
import dmsChart from 'components/charts/dms-chart';
export default {
  components: {
    miniCard,
    dmsChart
  }
};
</script>

<style lang="scss" scoped>
.recent-news-wrapper {
  float: left;
  height: auto;
  width: auto;
}
.testchart {
  height: 300px;
  width: 300px;
  border: 1px solid blue;
}
</style>
