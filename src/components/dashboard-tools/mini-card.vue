<template>
  <div class="minicard-wrapper">
    <el-card class="card-box">
      <div class="icon">
        <!-- <icon-svg  class="left-icon"></icon-svg> -->
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // iconType: 'peijianrukutongji'
    };
  },
  props: {
    iconInfo: {
      type: Object
      // default: {
      //   iconType: 'peijianrukutongji',
      //   iconColor: ''
      // }
    },
    miniCardContent: {
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped>
.minicard-wrapper {
  height: 100%;
  width: 100%;
  min-width: 330px;
  min-height: 110px;
}
.icon {
  height: 80px;
  width: 80px;
  float: left;
  border: 1px solid red;
  display: table-cell;
  vertical-align: middle;
}
.card-box {
  height: 100%;
  width: 100%;
  display: table;
}
.left-icon {
  font-size: 60px;
}
</style>

