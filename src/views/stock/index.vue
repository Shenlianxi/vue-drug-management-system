<template>
  <div class="drug-info-wrapper">
    <div class="drug-title">
      <span><i class="el-icon-setting"></i>  药品库存管理</span>
    </div>
    <div class="drug-info-main">
      <div class="durg-table">
        <el-table
          :data="tableData"
          border
          height="500"
          :default-sort = "{prop: 'drugId', order: 'descending'}"
          style="width: 100%">
            <el-table-column
              prop="drugId"
              sortable
              label="药品编号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="drugName"
              label="药品名"
              width="160">
            </el-table-column>
            <el-table-column
              prop="drugAmount"
              label="当前数量"
              sortable
              width="120">
            </el-table-column>
            <el-table-column
              prop="drugPrice"
              label="单价"
              sortable
              width="100">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="160">
              <template slot-scope="scope">
                <el-popover
                  placement="top"
                  width="300"
                  trigger="click">
                   <el-button type="text" class="name-btn">{{'入库 ' + scope.row.drugName}}</el-button>
                   <el-input-number size="small" v-model="stockNum" :min="1"></el-input-number>
                   <el-button class="stock-confirm"
                              type="primary"
                              @click="handleStock(scope.row, 1)"
                              plain>确 定</el-button>
                  <el-button slot="reference" type="text" ><icon-svg icon-class="peijianrukutongji"></icon-svg>入库</el-button>
                </el-popover>
                <el-popover
                  placement="bottom"
                  width="300"
                  trigger="click">
                  <el-button type="text" class="name-btn">{{'出库 ' + scope.row.drugName}}</el-button>
                   <el-input-number size="small" v-model="stockNum" :min="1"></el-input-number>
                   <el-button class="stock-confirm"
                              type="primary"
                              @click="handleStock(scope.row, 2)"
                              plain>确 定</el-button>
                  <el-button slot="reference" type="text" ><icon-svg icon-class="peijianchukutongji"></icon-svg>出库</el-button>
                </el-popover>
              </template>
            </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllDrug, stockManage } from 'api/drug';
import * as messageBox from 'utils/message-box';
export default {
  data() {
    return {
      tableData: [],
      stockNum: 1
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      getAllDrug().then(response => {
        if (response.data.success) {
          this.tableData = response.data.data;
        }
      });
    },
    handleStock(element, type) {
      const data = {};
      data.drugId = element.drugId;
      data.count = this.stockNum;
      data.type = type;
      stockManage(data).then(response => {
        if (response.data.success) {
          const message = response.data.data.drugName + response.data.data.stockInfo;
          messageBox.success(message);
          this.initData();
          this.stockNum = 1;
        } else {
          messageBox.error(response.data.errorMsg);
          this.stockNum = 1;
        }
      });
      console.log(element);
    }
  }
};
</script>

<style lang="scss" scoped>
.drug-info-wrapper {
  min-width: 100%;
  height: 100%;
}
.drug-title {
  height: 50px;
  float: left;
  width: 180px;
  margin-left: 50px;
  line-height: 50px;
  font-size: 20px;
  color: #409EFF;
  border-bottom: 1px solid #409EFF;
}
.drug-info-main {
  float: left;
  width: 100%;
  height: 50%;
  min-height: 400px;
  // border: 1px solid red;
}
.durg-table {
  float: left;
  margin-left: 20px;
  height: 100%;
  width: 750px;
  margin-top: 20px;
}
.durg-table-right {
  float: left;
  width: 500px;
  margin: 20px;
  height: 500px;
  border: 1px solid red;
}
.box-card {
  height: 100%;
  width: 100%;
}
.add-cate-btn {
  float: right;
  margin-right: 40px;
}
.panel-title {
  width: 100%;
  margin-top: 10px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: #409EFF;
}
.panel-content-item {
  display: inline-block;
  margin: 10px 0;
}
.stock-confirm {
  margin: auto 10px;
  // float: left;
  // width: 50px;
}
.name-btn {
  width: 280px;
}
</style>
