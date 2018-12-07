<template>
  <div  class="recent-news-wrapper"
        :style="'width:' + computedWidth"
        v-loading="loading"
        element-loading-text="加载中"
        >
    <mini-card
      class="mini-card"
      v-for="item in miniCardData"
      :key="item.index"
      :iconInfo="item"
      ></mini-card>
      <div class="recent-map">
        <div class="map-desc">
          <span class="item">请选择数据源:</span>
          <el-select v-model="dataType" @change="handleMap">
            <el-option
              v-for="item in typeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              ></el-option>
          </el-select>
        </div>
        <div class="map-content">
          <dms-chart :chartInitData="mapChartData"></dms-chart>
        </div>
      </div>
  </div>
</template>

<script>
import miniCard from 'components/dashboard-tools/mini-card';
import dmsChart from 'components/charts/dms-chart';
import ChartDataConversion from 'api/conversion/chart/conversion';
import * as messageBox from 'utils/message-box';
import { getTotal, getMaps } from 'api/dashboard';

export default {
  data() {
    return {
      computedWidth: document.body.clientWidth - 220 + 'px',
      miniCardData: [],
      allMapData: [],
      dataType: 1,
      typeOption: [],
      mapChartData: {},
      loading: false
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
      this.loading = true;
      // this.loadMockData();
      const $ts = this;
      getTotal().then(response => {
        if (response.data.success) {
          const apiData = response.data.data[0];
          console.log(apiData);
          const tempArr = [apiData.totalIncome, apiData.totalOutstock, apiData.totalOperation, apiData.totalSales];
          const tempData = [];
          for (let i = 0; i < 4; i++) {
            const data = {};
            data.index = i;
            data.number = tempArr[i];
            tempData.push(data);
          }
          this.miniCardData = tempData;
        } else {
          messageBox.error(response.data.errorMsg);
        }
      });
      getMaps().then(resp => {
        if (resp.data.success) {
          $ts.allMapData = resp.data.data;
          $ts.handleMap(1);
          this.loading = false;
        } else {
          messageBox.error(resp.data.errorMsg);
        }
      });
      this.typeOption = [{ value: 1, label: '入库分布' }, { value: 2, label: '出库分布' }, { value: 3, label: '销售分布' }];
    },
    handleMap(type) {
      const mapper = [
        { title: '入库药品地区分布', key: 1 },
        { title: '出库药品地区分布', key: 2 },
        { title: '销售地区分布', key: 3 }
      ];
      const currentTitle = mapper.filter(item => item.key === type);
      const allData = this.allMapData;
      const resultData = [];
      allData.forEach(element => {
        if (element.type === type) {
          const temp = element;
          temp.title = currentTitle[0].title;
          resultData.push(temp);
        }
      });
      console.log(resultData);
      const conversion = new ChartDataConversion();
      const chartDataTmp = conversion.convertToChinaMapData(resultData);
      console.log(chartDataTmp);
      this.mapChartData = chartDataTmp;
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
      // 柱状图数据,维度1,度量1
      const testData = {};
      testData.theme = '';
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
      tempdata.chartType = 2;
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
      // 多度量数据
      // const testData2 = {};
      // testData2.theme = '';
      // const innerData2 = {};
      // innerData2.id = 999;
      // innerData2.name = '测试图表';
      // const tempdata2 = {};
      // tempdata2.condition = {
      //   dims: [{
      //     id: 11,
      //     name: '城市'
      //   }],
      //   measures: [{
      //     id: 21,
      //     name: '客户数'
      //   }, {
      //     id: 22,
      //     name: '产值'
      //   }]
      // };
      // tempdata2.chartType = 1;
      // tempdata2.data = [
      //   ['南京市', 27087, 1234],
      //   ['常州市', 9699, 3214],
      //   ['宿迁市', 4570, 3254],
      //   ['徐州市', 4518, 1247],
      //   ['南通市', 4329, 6521],
      //   ['盐城市', 2954, 152],
      //   ['泰州市', 2249, 998],
      //   ['无锡市', 2119, 4571],
      //   ['镇江市', 692, 4521],
      //   ['淮安市', 121, 1234],
      //   ['扬州市', 600, 6547]
      // ];
      // innerData2.data = JSON.stringify(tempdata2);
      // testData2.data = innerData2;
      // const conversion2 = new ChartDataConversion();
      // const chartDataTmp2 = conversion2.convertToChartData(testData2);
      // this.wrapperChartData2(chartDataTmp2);
    },
    wrapperChartData(data) {
      const chartData1 = data;
      this.chartData1 = data;
      if (chartData1) {
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
    },
    wrapperChartData2(data) {
      const chartData2 = data;
      this.chartData2 = data;
      if (chartData2) {
        if (chartData2.data) {
          this.chartData2.data = chartData2.data;
          this.chartData2.header = chartData2.header;
          this.chartData2.dims = chartData2.dims;
          this.chartData2.measures = chartData2.measures;
          this.chartData2.filters = chartData2.filters;
          this.chartData2.configs = chartData2.configs;
        } else {
          this.chartData2.data = [];
        }
      }
      console.log(chartData2);
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
  height: 400px;
  width: 400px;
  margin-left: 100px;
  float: left;
  border: 1px solid blue;
}
.recent-map {
  width: 1150px;
  height: 550px;
  float: left;
  // border: 1px solid red;
  // margin: 10px 206px;
  position: relative;
}
.map-desc {
  width: 160px;
  height: 100%;
  float: left;
  margin: 10px 30px 10px 0px;
  // border: 1px solid blue;
}
.map-content {
  width: 800px;
  height: 100%;
  float: left;
  // border: 1px solid green;
  margin: 10px;
}
.item {
  width: 100%;
  height: 30px;
  margin-bottom: 5px;
  display: block;
}
</style>
