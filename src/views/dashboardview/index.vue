<template>
  <div v-loading="loading">
    <iframe src="http://localhost:8888/#/dashboard/boardView" id="mobsf" scrolling="no" frameborder="0" style="position:absolute;width:100%;height:800px;"></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }
};
</script>

<style lang="scss" scoped>

</style>
