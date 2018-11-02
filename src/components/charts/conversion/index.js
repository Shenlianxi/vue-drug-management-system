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
        if (measures && measures.length === 1) {
          if (dims && dims.length === 1) {
            this.unidimensional(chartData, result, dims);
          }
        }
        if (measures && measures.length > 1 && dims.length === 1) {
          this.manyMeasures(chartData, result, dims);
        }
      }
    });
  }
  unidimensional(chartData, result, dims) {
    result.originData = chartData.originData;
    result.widths = chartData.widths ? chartData.widths : [];
    result.title = chartData.chartTitle;
    const measures = chartData.measures;
    result.measures = measures;
    result.configs = chartData.configs;
    result.hideFlag = chartData.hideFlag;
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
          if (measures[0].ratioType === 7 || measures[0].ratioType === 8) {
            dimValue = v[2];
          } else {
            dimValue = v[1];
          }
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
    // result.widths = chartData.widths ? chartData.widths : [];
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
    // result.configs = chartData.configs;
    // result.hideFlag = chartData.hideFlag;
    // if (chartData.clientWidth) {
    //   result.clientWidth = chartData.clientWidth;
    // }
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
}
