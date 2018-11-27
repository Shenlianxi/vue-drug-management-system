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
              prop="drugCategory"
              label="药品分类"
              width="160">
            </el-table-column>
            <el-table-column
              prop="drugAmount"
              label="药品数量"
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
              sortable
              width="160">
              <template slot-scope="scope">
                <el-button @click="handleDetail(scope.row)" type="text" size="small">详细和编辑</el-button>
                <el-button @click="handleRemove(scope.row)" type="text" size="small">移除药品</el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>
      <div class="durg-table-right">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>信息添加</span>
          </div>
          <div class="card-content">
            <el-tabs tabPosition="left">
              <el-tab-pane label="药品类别">
                <el-form :model="newCateForm" label-position="top" label-width="80px">
                  <el-form-item label="类别名称">
                    <el-input v-model="newCateForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="类别描述">
                    <el-input v-model="newCateForm.desc"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button class="add-cate-btn" type="primary" @click="addNewCate">新增</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="新进药品">
                <span class="panel-title">药品新增须知</span>
                <span class="panel-content-item">1.药品通用名称必须合理合法,并正确注册</span>
                <span class="panel-content-item">2.药品分类必须在本仓库允许的范围内,可自行添加</span>
                <span class="panel-content-item">3.药品功能需详细</span>
                <span class="panel-content-item">4.药品售价不得低于市场价,也不可以哄抬</span>
                <span class="panel-content-item">5.药品厂家必须标明,以便以后入库和出库</span>
                <el-button type="primary" plain @click="addNewDrug">我已明确,开始添加药品</el-button>
              </el-tab-pane>
              <!-- <el-tab-pane label="角色管理">角色管理</el-tab-pane>
              <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane> -->
            </el-tabs>
          </div>
        </el-card>
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
          <el-select @change="categoryChange" placeholder="请选择分类" v-model="detailForm.drugCategory">
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
    <el-dialog
      title="输入密码"
      :visible.sync="pwdDialogVisible"
      width="30%"
      >
      <el-form label-width="80px" :model="pwdForm">
        <el-form-item label="密码">
          <el-input type="password" v-model="pwdForm.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pwdDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="checkPwd">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="新增药品"
      top="8vh"
      width="40%"
      :close-on-click-modal="false"
      :visible.sync="newDrugFormVisible"
      >
      <el-form :model="newDrugForm" :rules="newDrugRules" ref="newDrugForm">
        <el-form-item label="药品名称" :label-width="formLabelWidth"  prop="name">
          <el-input v-model="newDrugForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="药品分类" :label-width="formLabelWidth" prop="category">
          <el-select @change="categoryChange" v-model="newDrugForm.category">
            <!-- <el-option :label="区域一" value="shanghai"></el-option> -->
            <el-option v-if="categoryOptions"  v-for="(item, index) in categoryOptions"
                        :key="index"
                        :label="item.label"
                        :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="药品单价/元" :label-width="formLabelWidth" prop="price">
          <el-input v-model="newDrugForm.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新增数量" :label-width="formLabelWidth" prop="amount">
          <el-input v-model="newDrugForm.amount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="药品来源" :label-width="formLabelWidth" prop="resource">
          <el-input v-model="newDrugForm.resource" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="药品功能" :label-width="formLabelWidth" prop="function">
          <el-input v-model="newDrugForm.function" autocomplete="off"></el-input>
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
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newDrugFormVisible = false">取 消</el-button>
        <el-button type="success" @click="saveNewDrug">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAllDrug, queryDetail, updateDrug, deleteDrug, getCategory, addCategory, addDrug } from 'api/drug';
import * as messageBox from 'utils/message-box';
import { login } from 'api/user';
export default {
  data() {
    const validateString = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('数据不能为空'));
      } else {
        callback();
      }
    };
    const validateNumber = (rule, value, callback) => {
      if (value === null) {
        callback(new Error('数据不能为空'));
      } else {
        callback();
      }
    };
    return {
      tableData: [],
      dialogFormVisible: false,
      pwdDialogVisible: false,
      newDrugFormVisible: false,
      formLabelWidth: '100px',
      detailForm: {},
      currentData: {},
      newCateForm: {
        name: '',
        desc: ''
      },
      pwdForm: {
        userName: '',
        password: ''
      },
      newDrugForm: {
        name: '',
        category: '中药材',
        price: null,
        amount: null,
        resource: '',
        function: '',
        icon: '暂无图标'
      },
      newDrugRules: {
        name: [
          { required: true, trigger: 'blur', validator: validateString }
        ],
        price: [
          { required: true, trigger: 'blur', validator: validateNumber }
        ],
        amount: [
          { required: true, trigger: 'blur', validator: validateNumber }
        ],
        resource: [
          { required: true, trigger: 'blur', validator: validateString }
        ],
        function: [
          { required: true, trigger: 'blur', validator: validateString }
        ]
      },
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
    this.initCategory();
  },
  methods: {
    initData() {
      getAllDrug().then(response => {
        if (response.data.success) {
          this.tableData = response.data.data;
        }
      });
    },
    initCategory() {
      const $ts = this;
      getCategory().then(resp => {
        if (resp.data.success) {
          const categoryData = resp.data.data;
          categoryData.forEach(el => {
            const tempObj = {};
            tempObj.label = el.categoryName;
            tempObj.value = el.categoryName;
            $ts.categoryOptions.push(tempObj);
          });
        } else {
          messageBox.error(resp.data.errorMsg);
        }
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
      this.$confirm('此操作将永久删除该药品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.pwdDialogVisible = true;
        this.currentData = el;
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
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
    },
    checkPwd() {
      const $ts = this;
      const userName = localStorage.getItem('userName');
      const data = {};
      data.userName = userName;
      data.password = this.pwdForm.password;
      const currentData = this.currentData;
      login(data).then(response => {
        if (response.data.success) {
          const dataDel = {};
          dataDel.drugId = currentData.drugId;
          deleteDrug(dataDel).then(res => {
            if (res.data.success) {
              $ts.initData();
              messageBox.success('删除成功');
              $ts.pwdForm.password = '';
              this.pwdDialogVisible = false;
            } else {
              messageBox.error(res.data.errorMsg);
            }
          });
        } else {
          messageBox.error(response.data.errorMsg);
        }
      });
    },
    // 新增分类
    addNewCate() {
      const $ts = this;
      const data = this.newCateForm;
      if (!data.name) {
        messageBox.warn('名称必填');
      } else {
        addCategory(data).then(response => {
          if (response.data.success) {
            messageBox.success('添加成功');
            $ts.initCategory();
          } else {
            messageBox.error(response.data.errorMsg);
          }
        });
      }
    },
    addNewDrug() {
      this.newDrugFormVisible = true;
    },
    saveNewDrug() {
      const data = this.newDrugForm;
      const $ts = this;
      this.$refs.newDrugForm.validate(valid => {
        if (valid) {
          addDrug(data).then(response => {
            if (response.data.success) {
              messageBox.success('新增药品成功');
              $ts.initData();
              this.newDrugFormVisible = false;
            }
          });
        } else {
          messageBox.warn('请完整信息');
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
.durg-table-right {
  float: left;
  width: 500px;
  margin: 20px;
  height: 500px;
  // border: 1px solid red;
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
</style>
