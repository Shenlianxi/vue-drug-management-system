import echarts from 'echarts';
import DataConversion from 'components/charts/conversion';

export default class Chart {
  constructor($ts, data) {
    this.$ts = $ts;
    this.chartData = data;
  }
  initChart() {
    const $ts = this.$ts;
    let data = this.chartData;
    this.chart = echarts.init($ts.$el, 'macarons');
    data = this.conversionData(data);
    this.renderChart(data);
    this.chart.on('click', params => {
      const param = params.name;
      this.click(param);
    });
  }
  conversionData(data) {
    const conversion = new DataConversion();
    return conversion.parseData(data);
  }
  getGrid() {
    return {
      left: 10,
      right: 10,
      bottom: 20,
      containLabel: true
    };
  }
  click(param) {
    const $ts = this.$ts;
    $ts.$emit('click', param);
  }
  resize() {
    this.chart.resize();
  }
  dispose() {
    this.chart.dispose();
  }
  redraw() {
    this.chart.dispose();
    this.initChart();
  }
  getImageUrl() {
    return this.chart.getDataURL();
  }
}
