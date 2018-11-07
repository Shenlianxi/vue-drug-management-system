import Chart from 'components/charts/chart';
export default class lineChart extends Chart {
  constructor($ts, data) {
    super($ts, data);
  }
  renderChart(chartData) {
    const data = chartData;
    const seriesData = data.series;
    const legendData = data.lengend;
    const xData = data.xData;
    const series = [];
    if (seriesData && seriesData.length > 0) {
      seriesData.forEach((v, index) => {
        const serieData = {
          name: v.name,
          data: v.data,
          type: 'line',
          animationDuration: 2600,
          animationEasing: 'cubicInOut',
          smooth: true,
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          itemStyle: {}
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
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      legend: {
        x: 'center',
        y: 'top',
        data: legendData
      },
      xAxis: {
        data: xData,
        axisLabel: {
          rotate: 24,
          margin: 8
        },
        axisTick: {},
        splitLine: {
          show: false
        },
        boundaryGap: false
      },
      yAxis: [{
        type: 'value',
        splitLine: {
          show: false
        }
      }],
      series
    });
  }
}
