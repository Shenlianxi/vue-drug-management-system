<template>
  <div class="dms-chart-wrapper"
    v-loading="loading"
    element-loading-text="加载中"
    >
    <!-- 预留标题位置 -->
    <!-- <div v-if="appearConfigData.titleTop" class="bear-chart-card-title" :style="appearConfigData.title">
      <div class="bear-card-header">
        {{chartData.chartTitle}}
      </div>
    </div> -->
    <div class="dms-chart-card-body">
      <component v-if="chartData!=null && chartData.data" ref="bearChartBody" class="dms-chart-panel" :is="currentView"
      :chart-data="chartData">
      </component>
    </div>
  </div>
</template>

<script>
import defaultChart from 'components/charts/default-chart';
// import ChartDataConversion from 'api/conversion/chart/conversion';
import { getCurrentChart } from 'components/charts';
export default {
  data() {
    return {
      // charts渲染
      currentView: null,
      chartData: {},
      loading: false
    };
  },
  mounted() {
    this.initData();
  },
  props: {
    chartId: Number,
    chartInitData: {
      type: Object
    }
  },
  watch: {
    chartInitData: {
      handler(newValue) {
        this.loading = true;
        console.log(newValue);
        this.activeRefresh(newValue);
      },
      deep: false
    }
  },
  components: {
    defaultChart
  },
  methods: {
    initData() {
      this.loading = true;
      const data = this.chartInitData;
      if (data && data.data) {
        this.currentView = getCurrentChart(data.chartType);
        this.chartData = data;
      }
      this.loading = false;
    },
    activeRefresh(chartData) {
      if (chartData) {
        this.currentView = getCurrentChart(chartData.chartType);
        this.chartData = chartData;
      }
      setTimeout(() => {
        this.loading = false;
      }, 500);
    }
  }
};
</script>

<style lang="scss" scoped>
.dms-chart-wrapper {
  height: 100%;
  width: 100%;
}
.dms-chart-card-body {
  height: 100%;
  width: 100%;
}
.dms-chart-panel {
  width: 100% !important;
  height: 100% !important;
}
</style>
