module.exports = file => require('@/views/' + file + '.vue').default;
// require的default 由于webpack版本问题,需要加入对象指引default
