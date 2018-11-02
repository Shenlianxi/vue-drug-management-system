import TestBarChart from 'components/charts/chart/single/test-bar-chart';
export function getProps() {
  return {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '200px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object
    }
    // chartId: {
    //   type: Number,
    //   default: 0
    // },
    // moduleName: {
    //   type: String,
    //   default: ''
    // }
  };
}
export function mounted($ts, debounce) {
  $ts.chart.initChart();
  if ($ts.autoResize) {
    $ts.__resizeHanlder = debounce(() => {
      if ($ts.chart) {
        $ts.chart.resize();
      }
    }, 100);
    window.addEventListener('resize', $ts.__resizeHanlder);
  }
}
export function beforeDestroy($ts) {
  if (!$ts.chart) {
    return;
  }
  if ($ts.autoResize) {
    window.removeEventListener('resize', $ts.__resizeHanlder);
  }
  $ts.chart.dispose();
  $ts.chart = null;
}
export function resolveChartData(response) {
  let result = [];
  const parseData = response.data;
  if (!parseData) {
    return result;
  }
  result = parseData.data;
  return result;
}
export function createChart($ts, chartData) {
  const charts = [
    { id: 'testBarChart', instance: new TestBarChart($ts, chartData) }
  ];
  let chart = null;
  if (chartData) {
    const currentCharts = charts.filter(item => item.id === chartData.chartType);
    if (currentCharts && currentCharts.length > 0) {
      chart = currentCharts[0].instance;
    }
  }
  $ts.chart = chart;
  return chart;
}
export function getCurrentChart(chartType) {
  let chart = chartType;
  const definedChatrTypes = ['tableChart', 'blankChart', 'timeClock', 'largeTitle', 'cellNumberChart', 'titleNumberChart', 'swiperCard', 'weTextComponentChart', 'weIndicatrixChart', 'cardChart'];
  if (chartType && definedChatrTypes.indexOf(chartType) !== -1) {
    chart = chartType;
  }
  if (chartType && definedChatrTypes.indexOf(chartType) === -1) {
    chart = 'defaultChart';
  }
  return chart;
}
export function axisFormatter(params, measures) {
  let result = '';
  if (params) {
    if ((params instanceof Array) && params.length > 1) {
      result += params[0].name + '(' + measures[0].name + ')<br/>';
      params.forEach(v => {
        if (v.data !== '-') {
          result += v.seriesName + ':' + v.value + '<br/>';
        }
      });
    } else if ((params instanceof Array) && params.length === 1) {
      result += params[0].name + '<br/>';
      params.forEach(v => {
        if (v.data !== '-') {
          result += v.seriesName + ':' + v.value + '<br/>';
        }
      });
    }
  }
  return result;
}
