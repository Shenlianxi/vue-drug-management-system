import { deepClone } from 'utils';
export default class DataConversion {
  wrapResultData(fn) {
    const result = {};
    const legend = [];
    const title = '';
    const series = [];
    const measures = [];
    const xData = [];
    const theme = 'macarons';
    const value = [];
    result.title = title;
    result.legend = legend;
    result.xData = xData;
    result.series = series;
    result.measures = measures;
    result.theme = theme;
    result.value = value;
    fn(result);
    return result;
  }

  parseData(chartData) {
    return this.wrapResultData(result => {
      const tempChartData = deepClone(chartData);
      if (chartData) {
        const dims = tempChartData.dims;
        const measures = tempChartData.measures;
        if (measures && measures.length > 0) {
          if (dims && dims.length === 1) {
            this.unidimensional(chartData, result, dims);
          }
          if (dims && dims.length > 1) {
            this.manyDimensional(chartData, result, dims);
          }
        }
        if (measures && measures.length > 1 && dims.length === 1) {
          this.manyMeasures(chartData, result, dims);
        }
        if (chartData.chartType === 'chinaShowMap') {
          this.chinaShowMap(chartData, result);
        }
      }
    });
  }
  chinaShowMap(chartData, result) {
    result.originData = chartData.origin;
    result.widths = chartData.widths ? chartData.widths : [];
    result.title = chartData.chartTitle;
    result.measures = [];
    result.dims = [];
    result.series = chartData.data;
    result.xData = '地区';
    result.legend = chartData.legend;
  }
  unidimensional(chartData, result, dims) {
    result.originData = chartData.originData;
    result.widths = chartData.widths ? chartData.widths : [];
    result.title = chartData.chartTitle;
    const measures = chartData.measures;
    result.measures = measures;
    result.configs = chartData.configs;
    if (chartData.clientWidth) {
      result.clientWidth = chartData.clientWidth;
    }
    result.dims = dims;
    result.theme = chartData.theme;
    if (measures && measures.length > 0) {
      const measureName = measures[0].name;
      result.legend.push(measureName);
      const orgData = chartData.data;
      if (orgData && orgData.length > 0) {
        const serie = {};
        serie.name = measureName;
        const serieData = [];
        orgData.forEach(v => {
          var dimValue = null;
          let dim = chartData.chartType.indexOf('MapChart') !== -1 ? v[0] ? v[0].toString().trim() : v[0] : v[0];
          dimValue = v[1];
          if (!dim) {
            dim = '-';
          }
          if (!dimValue) {
            dimValue = '-';
          }
          result.xData.push(dim);
          result.value.push(dimValue);
          serieData.push({ name: dim, value: dimValue });
        });
        serie.data = serieData;
        result.series.push(serie);
      }
    }
  }
  manyMeasures(chartData, result, dims) {
    result.originData = chartData.originData;
    result.title = chartData.chartTitle;
    const measures = chartData.measures;
    result.measures = chartData.measures;
    const legend = [];
    if (measures && measures.length > 0) {
      measures.forEach(element => {
        legend.push(element.name);
      });
    }
    result.legend = legend;
    result.dims = dims;
    result.theme = chartData.theme;
    const orgData = chartData.data;
    const convertData = [];
    if (orgData && orgData.length > 0) {
      for (let i = 0; i < orgData[0].length; i++) {
        convertData[i] = [];
      }
      for (let i = 0; i < orgData.length; i++) {
        for (let j = 0; j < orgData[i].length; j++) {
          convertData[j][i] = orgData[i][j];
        }
      }
    }
    let xData = [];
    if (convertData && convertData.length > 0) {
      xData = convertData[0];
    }
    result.xData = xData;
    result.series = convertData;
  }
  manyDimensional(chartData, result, dims) {
    result.originData = chartData.originData;
    result.title = chartData.chartTitle;
    const measures = chartData.measures;
    result.measures = measures;
    result.dims = dims;
    result.theme = chartData.theme;
    const orgData = chartData.data;
    const xName = [];
    if (orgData) {
      let serie = null;
      orgData.forEach(v => {
        if (!result.xData.includes(v[0])) {
          result.xData.push(v[0]);
        }
        if (!xName.includes(v[1])) {
          xName.push(v[1]);
        }
        const key = v[1] !== '' ? v[1] : '空值';
        result.legend.push(key);
      });
      const arrAllName = [];
      for (let i = 0; i < xName.length; i++) {
        const arr = [];
        for (let j = 0; j < orgData.length; j++) {
          if (xName[i] === orgData[j][1]) {
            arr.push(orgData[j]);
          }
        }
        arrAllName.push(arr);
      }
      // 把相同name的value放入数组
      for (let x = 0; x < arrAllName.length; x++) {
        const arrData = arrAllName[x];
        const data = [];
        serie = {};
        serie.data = [];
        // 获取相同name
        serie.name = arrAllName[x][0][1];
        // value存入数组
        for (let y = 0; y < arrData.length; y++) {
          data.push(arrData[y][0]);
          serie.data.push(arrData[y][arrData[y].length - 1]);
        }
        // 对与缺少的数据进行补缺（null）
        for (let d = 0; d < result.xData.length; d++) {
          if (!data.includes(result.xData[d])) {
            data.push(result.xData[d]);
            serie.data.splice(d, 0, '-');
          }
        }
        result.series.push(serie);
      }
    }
  }
}
