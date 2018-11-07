import Chart from 'components/charts/chart';

export default class pieChart extends Chart {
  constructor($ts, data) {
    super($ts, data);
  }
  renderChart(chartData) {
    const data = chartData;
    const seriesData = data.series;
    const series = [];
    if (seriesData && seriesData.length > 0) {
      seriesData.forEach((v, idx) => {
        const serieData = {
          name: v.name,
          type: 'pie',
          data: v.data,
          // data的数据格式: [{name: 'aa', value: 123}, {name: 'bbb', value: 221}, ...] 或者 [123, 221, ...]
          animationEasing: 'cubicInOut',
          label: {
            normal: {
              formatter: '{b} \n\n{c} ({d}%)'
            }
          },
          radius: [0, '45%'],
          animationDuration: 1000
        };
        series.push(serieData);
      });
    }
    this.chart.setOption({
      title: {
        text: chartData.title,
        textStyle: {
          fontSize: 16,
          align: 'center'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: function(params) {
          return params.name + '</br>' + params.marker + params.seriesName + ':' + params.value;
        }
      },
      legend: {
        show: false
      },
      calculable: true,
      series: series
    });
  }
}
