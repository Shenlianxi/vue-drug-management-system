import { deepClone } from 'src/utils';
export default class ChartDataConversion {
  /**
     * @author SLX
     * 数据平台可视化图表组件数据转换对外接口
     * 第三方使用时，只需要修改本接口适配器，返回ChartData数据格式，便可接入可视化图表组件
     * @param responseResult:后台获取的数据
     * 数据格式:
     * {
     *    data:{
     *      boardId:"",
     *      data:"{}",
     *      gmtCreate:"",
     *      gmtUpdated:""
     *      id:""
     *      name:""
     *      type:""
     *    }
     *    errorMsg : ""
     *    success : true
     * }
     * @return ChartData:图表组件可接收数据结构
     * {
     *    chartTitle:"",
     *    chartType:"",
     *    data:[],
     *    dims:[],
     *    filters:[],
     *    header:[],
     *    limit:"",
     *    measures:[],
     *    theme:""
     * }
     */
  convertToChartData(responseResult) {
    const originData = deepClone(responseResult);
    const result = {};
    const responseData = responseResult.data;
    if (!responseData) {
      return result;
    }
    const parseData = JSON.parse(responseData.data);
    if (!parseData) {
      return result;
    }
    let chartType = 'tableChart';
    const flg = parseData.chartType;
    const mapper = this.mapper();
    const currentCharts = mapper.filter(item => item.id === flg);
    if (currentCharts && currentCharts.length > 0) {
      chartType = currentCharts[0].type;
    }
    result.chartType = chartType;
    result.chartTitle = responseData.name;
    result.dims = parseData.condition.dims;
    result.limit = parseData.condition.limit;
    // result.filters = parseData.condition.filters;
    result.measures = parseData.condition.measures;
    result.data = parseData.data;
    result.header = parseData.data.head;
    // result.widths = parseData.widths ? parseData.widths : [];
    result.origin = originData;
    return result;
  }
  convertToChinaMapData(responseResult) {
    const originData = deepClone(responseResult);
    const result = {};
    const responseData = responseResult;
    if (!responseData) {
      return result;
    }
    result.chartType = 'chinaShowMap';
    result.chartTitle = responseData[0].title;
    const data = [];
    responseData.forEach(el => {
      const tempData = {};
      tempData.name = el.area;
      if (el.type === 1 || el.type === 2) {
        tempData.value = el.count;
      } else {
        tempData.value = el.money;
      }
      data.push(tempData);
    });
    result.data = data;
    result.legend = responseResult[0].type === 3 ? '金额(单位:元)' : '数量';
    result.origin = originData;
    return result;
  }
  mapper() {
    const mapper = [
      { id: 1001, type: 'testBarChart' },
      { id: 1, type: 'pieChart' },
      { id: 2, type: 'lineChart' }
      // { id: 1003, type: 'timeClock' },
      // { id: 1004, type: 'largeTitle' },
      // { id: 1005, type: 'normalTitle' },
      // { id: 1006, type: 'cellNumberChart' },
      // { id: 1007, type: 'titleNumberChart' },
      // { id: 2000, type: 'weTextComponentChart' },
      // { id: 2001, type: 'weIndicatrixChart' },
      // { id: 2002, type: 'weStackGraphChart' },
      // { id: 1200, type: 'swiperCard' },
      // { id: 1, type: 'lineChart' },
      // { id: 2, type: 'barChart' },
      // { id: 100, type: 'yBarChart' },
      // { id: 3, type: 'pieChart' },
      // { id: 4, type: 'tableChart' },
      // { id: 5, type: 'ringChart' },
      // { id: 20, type: 'chinaMapChart' },
      // { id: 21, type: 'provinceMapChart' },
      // { id: 22, type: 'worldMapChart' },
      // { id: 30, type: 'splashesMapChart' },
      // { id: 31, type: 'splashesLineChart' },
      // { id: 40, type: 'charCloudChart' },
      // { id: 50, type: 'funnelChart' },
      // { id: 60, type: 'sankeyChart' },
      // { id: 70, type: 'pileBarChart' },
      // { id: 80, type: 'areaLineChart' },
      // { id: 90, type: 'workedPieChart' },
      // { id: 200, type: 'radarChart' },
      // { id: 300, type: 'graphChart' },
      // { id: 301, type: 'graphChartTwo' },
      // { id: 400, type: 'lineBarChart' },
      // { id: 500, type: 'barPieChart' },
      // { id: 600, type: 'moreLineChart' },
      // { id: 700, type: 'gaugeChart' },
      // { id: 800, type: 'treemapChart' },
      // { id: 900, type: 'splashesProvinceMapChart' },
      // { id: 1000, type: 'percentPieChart' },
      // { id: 1001, type: 'heatBarChart' },
      // { id: 1002, type: 'scatterChinaMap' },
      // { id: 1008, type: 'cardChart' },
      // { id: 101, type: 'ratioBarChart' }
    ];
    return mapper;
  }
}
