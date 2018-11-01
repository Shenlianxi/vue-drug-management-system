<template>
  <div class="recent-news-wrapper">
    <mini-card></mini-card>
  </div>
</template>

<script>
import miniCard from 'components/dashboard-tools/mini-card';
export default {
  components: {
    miniCard
  }
};
</script>

<style lang="scss" scoped>
.recent-news-wrapper {
  float: left;
  height: auto;
  width: auto;
}
</style>
