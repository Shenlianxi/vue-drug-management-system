import Chart from 'components/charts/chart';
import 'echarts/map/js/china';
// import mapData from './geo-coord-map-data.json';

export default class chinaShowMap extends Chart {
  constructor($ts, data) {
    super($ts, data);
  }
  renderChart(chartData) {
    const maxDataArr = [];
    if (chartData.series.length > 0) {
      chartData.series.forEach(function(element) {
        maxDataArr.push(element.value);
      }, this);
    }
    maxDataArr.sort(function(x, y) {
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
    let min = isNaN(parseInt(maxDataArr[0])) ? 0 : parseInt(maxDataArr[0]);
    const max = parseInt(maxDataArr[maxDataArr.length - 1]);
    if (maxDataArr.length === 1) {
      min = 0;
    }
    const series = [];
    const seriesData = chartData.series;
    const serieData = {
      type: 'map',
      mapType: 'china',
      data: seriesData,
      label: {
        normal: {
          show: true,
          fontSize: 10,
          formatter: function(params) {
            var value = (params.value);
            if (value) {
              return params.name;
            } else {
              return '';
            }
          }
        }
      }
    };
    series.push(serieData);
    const option = {
      title: {
        text: chartData.title,
        x: 'center',
        textStyle: {
          color: 'rgb(55, 75, 113)',
          fontSize: 18
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: function(params) {
          const xData = chartData.xData;
          const legendData = chartData.legend;
          return xData + ': ' + params.name + '</br>' + legendData + ': ' + params.value;
        }
      },
      visualMap: {
        show: true,
        min: min,
        max: max,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'],
        calculable: true,
        color: ['red', 'orange', 'lightgreen'],
        textStyle: chartData.theme !== 'macarons' ? {
          color: '#fff'
        } : {}
      },
      series: series
    };
    this.chart.setOption(option);
  }
}
