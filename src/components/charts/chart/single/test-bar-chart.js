import Chart from 'components/charts/chart';

export default class testBarChart extends Chart {
  constructor($ts, data) {
    super($ts, data);
  }
  renderChart(chartData) {
    const data = chartData;
    const seriesData = data.series;
    const lengendData = data.lengend;
    const xData = data.xData;
    const series = [];
    if (seriesData && seriesData.length > 0) {
      seriesData.forEach((v, idx) => {
        const serieData = {
          name: v.name,
          type: 'bar',
          data: v.data,
          // data的数据格式: [{name: 'aa', value: 123}, {name: 'bbb', value: 221}, ...] 或者 [123, 221, ...]
          animationDuration: 3000,
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          itemStyle: {
            // normal: {
            //   color: '#0066CC'
            // }
          }
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
      tooltip: {},
      legend: {
        data: lengendData
      },
      xAxis: {
        data: xData
      },
      yAxis: {},
      series: series
    });
  }
}
