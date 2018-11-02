<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import { debounce } from 'utils';
import * as chartUtil from 'components/charts';
export default {
  name: 'defaultChart',
  data() {
    return {
      chart: null
    };
  },
  props: chartUtil.getProps(),
  beforeDestroy() {
    chartUtil.beforeDestroy(this);
  },
  watch: {
    chartData: {
      handler() {
        this.resizeChart();
      },
      deep: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.chart = chartUtil.createChart(this, this.chartData);
      chartUtil.mounted(this, debounce);
    }, 200);
  },
  methods: {
    resizeChart() {
      if (this.chart) {
        this.chart.dispose();
        this.chart = chartUtil.createChart(this, this.chartData);
        this.chart.initChart();
      }
    }
  }
};
</script>
