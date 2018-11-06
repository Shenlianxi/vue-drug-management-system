<template>
  <div class="dms-chart-wrapper">
    <!-- 预留标题位置 -->
    <!-- <div v-if="appearConfigData.titleTop" class="bear-chart-card-title" :style="appearConfigData.title">
      <div class="bear-card-header">
        {{chartData.chartTitle}}
      </div>
    </div> -->
    <div class="dms-chart-card-body">
      <component  ref="bearChartBody" class="dms-chart-panel" :is="currentView"
      :chart-data="chartData">
      </component>
    </div>
  </div>
</template>

<script>
import defaultChart from 'components/charts/default-chart';
import ChartDataConversion from 'api/conversion/chart/conversion';
import { getCurrentChart } from 'components/charts';
export default {
  data() {
    return {
      // charts渲染
      currentView: null,
      chartData: {}
    };
  },
  mounted() {
    this.initData();
  },
  props: {
    chartId: Number
  },
  components: {
    defaultChart
  },
  methods: {
    initData() {
      // 加载数据库数据
      if (this.chartId) {
        const data = {};
        data.chartId = this.chartId;
        this.loadApiData(data);
      } else {
        // 写一些模拟数据提供加载
        const testData = {};
        testData.theme = 'testYheme';
        const innerData = {};
        innerData.id = 888;
        innerData.name = '测试图表';
        const tempdata = {};
        tempdata.condition = {
          dims: [{
            id: 1,
            name: '城市'
          }],
          measures: [{
            id: 2,
            name: '客户数'
          }]
        };
        tempdata.chartType = 1001;
        tempdata.data = [
          ['南京市', 27087],
          ['常州市', 9699],
          ['宿迁市', 4570],
          ['徐州市', 4518],
          ['南通市', 4329],
          ['盐城市', 2954],
          ['泰州市', 2249],
          ['无锡市', 2119],
          ['镇江市', 692],
          ['淮安市', 121],
          ['扬州市', 6]
        ];
        innerData.data = JSON.stringify(tempdata);
        testData.data = innerData;
        const conversion = new ChartDataConversion();
        const chartDataTmp = conversion.convertToChartData(testData);
        this.wrapperChartData(chartDataTmp);
      }
    },
    loadApiData(value) {
      // 加载数据库数据写api等信息
    },
    wrapperChartData(data) {
      const chartData = data;
      this.chartData = data;
      if (chartData) {
        this.currentView = getCurrentChart(chartData.chartType);
        if (chartData.data) {
          this.chartData.data = chartData.data;
          this.chartData.header = chartData.header;
          this.chartData.dims = chartData.dims;
          this.chartData.measures = chartData.measures;
          this.chartData.filters = chartData.filters;
          this.chartData.configs = chartData.configs;
        } else {
          this.chartData.data = [];
        }
      }
      console.log(chartData);
    }
  }
};
</script>

<style lang="scss" scoped>
.dms-chart-wrapper {
  // height: 100%;
  // width: 100%;
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
