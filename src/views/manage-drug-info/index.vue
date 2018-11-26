<template>
  <div class="drug-info-wrapper">
    <div class="drug-title">
      <span><i class="el-icon-edit"></i>  药品信息维护</span>
    </div>
    <div class="drug-info-main">
      <div class="durg-table">
        <el-table
          :data="tableData"
          border
          height="500"
          style="width: 100%">
            <el-table-column
              prop="drugId"
              label="药品编号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="drugName"
              label="药品名"
              width="160">
            </el-table-column>
            <el-table-column
              prop="drugCategory"
              label="药品分类"
              width="160">
            </el-table-column>
            <el-table-column
              prop="drugAmount"
              label="药品数量"
              width="120">
            </el-table-column>
            <el-table-column
              prop="drugPrice"
              label="单价"
              width="100">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="160">
              <template slot-scope="scope">
                <el-button @click="handleDetail(scope.row)" type="text" size="small">详细和编辑</el-button>
                <el-button @click="handleRemove(scope.row)" type="text" size="small">移除药品</el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      title="编辑药品详细"
      top="8vh"
      width="40%"
      :show-close="false"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      >
      <el-form :model="detailForm">
        <el-form-item label="药品名称" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="detailForm.drugName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :disabled="editState" label="药品分类" :label-width="formLabelWidth">
          <el-select @change="categoryChange" v-model="detailForm.drugCategory">
            <!-- <el-option :label="区域一" value="shanghai"></el-option> -->
            <el-option v-if="categoryOptions"  v-for="(item, index) in categoryOptions"
                        :key="index"
                        :label="item.label"
                        :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="药品图片" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleImgRemove"
            :file-list="fileList2"
            :limit="1"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="药品功能" :label-width="formLabelWidth">
          <el-input :disabled="editState" v-model="detailForm.drugFunction" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="药品单价/元" :label-width="formLabelWidth">
          <el-input :disabled="editState" v-model="detailForm.drugPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="药品地址" :label-width="formLabelWidth">
          <el-input :disabled="editState" v-model="detailForm.drugResource" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="进出库量" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="stockCount" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closed">取 消</el-button>
        <el-button type="primary" @click="startEdit">编辑</el-button>
        <el-button type="success" @click="saveChange">保存</el-button>
      </span>
    </el-dialog>
    <!-- <el-dialog></el-dialog> -->
  </div>
</template>

<script>
import { getAllDrug, queryDetail, updateDrug } from 'api/drug';
import * as messageBox from 'utils/message-box';
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: '90px',
      detailForm: {},
      categoryOptions: [],
      fileList2: [{ name: 'defaultDrug.jpg', url: require('../../assets/image/drugimage/defaultDrug.jpg') }],
      editState: true
    };
  },
  computed: {
    stockCount() {
      return '入库量--' + this.detailForm.instockCount + '    出库量--' + this.detailForm.outstockCount;
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      getAllDrug().then(response => {
        if (response.data.success) {
          console.log(response.data.data);
          this.tableData = response.data.data;
        }
      });
      const tempCat = ['片剂', '胶囊剂', '口服丸', '外用涂剂', '注射剂', '兴奋剂'];
      const $ts = this;
      tempCat.forEach(el => {
        const tempObj = {};
        tempObj.label = el;
        tempObj.value = el;
        $ts.categoryOptions.push(tempObj);
      });
    },
    handleDetail(element) {
      const data = {};
      data.drugId = element.drugId;
      queryDetail(data).then(response => {
        if (response.data.success) {
          const detail = response.data.data;
          this.detailForm = detail;
          console.log(detail);
        }
      });
      this.dialogFormVisible = true;
    },
    handleRemove(el) {
      console.log(el);
    },
    categoryChange(category) {
    },
    handlePreview(val) {},
    handleImgRemove(val) {},
    startEdit() {
      this.editState = false;
    },
    closed() {
      this.dialogFormVisible = false;
      this.editState = true;
    },
    saveChange() {
      const data = this.detailForm;
      this.editState = true;
      updateDrug(data).then(response => {
        if (response.data.success) {
          messageBox.success('保存成功');
          this.initData();
          this.dialogFormVisible = false;
        } else {
          messageBox.error(response.data.errorMsg);
        }
      });
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
  width: 900px;
  margin-top: 20px;
}
</style>
