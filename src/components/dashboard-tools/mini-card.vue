<template>
  <div class="minicard-wrapper">
    <el-card class="card-box">
      <div class="icon">
        <icon-svg  class="left-icon" :icon-class="iconProp.type" :style="'color:' + iconProp.color"></icon-svg>
      </div>
      <div class="card-content">
          <span class="content-title">{{title}}</span>
          <span class="content-number" :style="'color:' + iconProp.color">{{number}}</span>
        </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iconProp: {
        type: 'peijianrukutongji',
        color: '#EB4B8E'
      },
      title: '入库总览',
      number: 2888
      // iconType: 'peijianrukutongji'
    };
  },
  props: {
    // props =iconInfo格式:
    // index识别color,图标颜色 , number数量
    iconInfo: {
      type: Object
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      const colorList = ['#EB4B8E', '#2D77FF', '#D6E94B', '#7C6BFF', '#FFC43E', '#E58D36'];
      const typeList = ['peijianrukutongji', 'peijianchukutongji', 'tongji', 'xiaoshoutongji'];
      const titleList = ['入库总览', '出库总览', '操作总计', '销售统计'];
      const data = this.iconInfo;
      if (data) {
        this.number = data.number;
        this.iconProp.color = colorList[data.index];
        this.iconProp.type = typeList[data.index];
        this.title = titleList[data.index];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.minicard-wrapper {
  margin-top: 5px;
  margin-right: 1%;
  // height: 100%;
  width: 21%;
  min-width: 300px;
  min-height: 110px;
}
.icon {
  height: 80px;
  width: 80px;
  float: left;
  display: table-cell;
  vertical-align: middle;
}
.card-box {
  height: 100%;
  width: 100%;
  display: table;
}
.left-icon {
  font-size: 65px;
}
.card-content {
  margin-top: -10px;
  height: 100px;
  width: 170px;
  float: left;
  text-align: center;
  // border: 1px solid black;
}
.content-title {
  width: 100%;
  height: 40px;
  font-size: 20px;
  text-align: center;
  float: left;
  line-height: 20px;
}
.content-number {
  width: 100%;
  height: 60px;
  font-size: 40px;
  text-align: center;
  font-weight: 800;
}
</style>

