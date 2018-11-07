<template>
  <div class="recent-news-wrapper" :style="'width:' + computedWidth">
    <mini-card
      class="mini-card"
      v-for="item in miniCardData"
      :key="item.index"
      :iconInfo="item"
      ></mini-card>
    <dms-chart v-if="chartData1 !== null && chartData1.data" class="testchart" :chartInitData="chartData1"></dms-chart>
  </div>
</template>

<script>
import miniCard from 'components/dashboard-tools/mini-card';
import dmsChart from 'components/charts/dms-chart';
import ChartDataConversion from 'api/conversion/chart/conversion';
export default {
  data() {
    return {
      computedWidth: document.body.clientWidth - 220 + 'px',
      miniCardData: [],
      chartData1: {},
      chartData2: {}
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
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.loadMockData();
    },
    loadMockData() {
      // 卡片图数据
      const tempData = [];
      for (let i = 0; i < 4; i++) {
        const data = {};
        data.index = i;
        data.number = Math.ceil(Math.random() * 10000);
        tempData.push(data);
      }
      this.miniCardData = tempData;
      // 柱状图数据
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
    },
    wrapperChartData(data) {
      const chartData1 = data;
      this.chartData1 = data;
      if (chartData1) {
        // this.currentView = getCurrentChart(chartData1.chartType);
        if (chartData1.data) {
          this.chartData1.data = chartData1.data;
          this.chartData1.header = chartData1.header;
          this.chartData1.dims = chartData1.dims;
          this.chartData1.measures = chartData1.measures;
          this.chartData1.filters = chartData1.filters;
          this.chartData1.configs = chartData1.configs;
        } else {
          this.chartData1.data = [];
        }
      }
      console.log(chartData1);
    }
  },
  watch: {
    listenMenuType(val) {
      // vuex成功监听
      const totalWidth = document.body.clientWidth;
      this.$nextTick(() => {
        if (val === 'zhankaicaidan') {
          this.computedWidth = (totalWidth - 220) + 'px';
        } else {
          this.computedWidth = (totalWidth - 220) + 'px';
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.recent-news-wrapper {
  float: left;
  height: auto;
  margin-left: 10px;
  // border: 1px solid red;
}
.mini-card {
  float: left;
}
.testchart {
  height: 300px;
  width: 300px;
  float: left;
  border: 1px solid blue;
}
</style>
