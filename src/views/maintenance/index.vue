<template>
  <div class="user-author">
    <div class="left-nav">
      <el-card
        class="left-card"
        >
        <div slot="header" class="clearfix">
          <span class="title">{{leftCardTitle}}</span>
        </div>
        <div class="content">
          <span
            class="item"
            :class="{'is-active': manageType === item.type}"
            v-for="item in manageItems"
            :key="item.type"
            @click="changeManage(item)">
            {{item.name}}
          </span>
        </div>
      </el-card>
    </div>
    <!-- 右侧主要内容 -->
    <div class="right-main">
      <el-card class="main-card">
        <div slot="header" class="clearfix">
          <span  class="title">{{itemName}}</span>
        </div>
        <div class="content">
          <!-- 用户 -->
          <div class="main" v-if="manageType === 1">
            <div class="add-user">
              <el-button type="primary" @click="addUser">添加用户</el-button>
            </div>
            <div class="user-table">
              <el-table
              :data="userList"
              height="400"
              border
              style="width: 100%"
              >
                <el-table-column prop="userName" label="用户名" width="180">
                </el-table-column>
                <el-table-column prop="userRole" label="角色" width="180">
                </el-table-column>
                <el-table-column prop="nickName" label="昵称" width="180">
                </el-table-column>
                <el-table-column prop="position" label="职位" width="180">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button @click="delUser(scope.row)" type="text" size="small" v-if="scope.row.userId !== currentId"><i class="el-icon-delete"></i> 删除</el-button>
                    <!-- <el-button @click="editUser(scope.row)" type="text" size="small">编辑</el-button> -->
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!-- 角色 -->
          <div class="main" v-if="manageType === 2">
            <div class="user-role">
              <el-table
              :data="allRole"
              height="400"
              border
              style="width: 100%"
              >
                <el-table-column prop="roleName" label="权限名" width="180">
                </el-table-column>
                <el-table-column prop="roleDesc" label="权限描述" width="180">
                </el-table-column>
                <el-table-column prop="creator" label="创建者" width="180">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="180">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button @click="updateRole(scope.row)" type="text" size="small"><i class="el-icon-edit"></i> 编辑权限</el-button>
                    <!-- <el-button @click="editUser(scope.row)" type="text" size="small">编辑</el-button> -->
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!-- 权限 -->
          <div class="main" v-if="manageType === 3">
            <div class="auth-content">
              <div class="left-auth">
                <span   class="item"
                        v-for="(item, index) in allRole"
                        :key="index"
                        @click="selectRole(item.roleId)"
                        :class="{'is-active': item.roleId === roleId}">
                  {{item.roleName}}
                </span>
              </div>
              <!-- 权限页面 -->
              <div class="right-auth">
                <el-tree
                      ref="tree"
                      :data="treeData"
                      v-if="treeData"
                      :props="defaultProps"
                      show-checkbox
                      node-key="id"
                      @check="handleCheckChange"
                      :default-expand-all="true"
                      :default-checked-keys="checkedAuths"
                      >
                </el-tree>
              </div>
              <div class="modify-auth">
                <el-button type="primary" @click="saveAuth"><i class="el-icon-upload"></i> 保存</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <el-dialog class="add-user-dialog"
      title="新增用户"
      width="30%"
      :visible.sync="userDialogVisible">
      <el-form ref="form" :model="form" :rules="addRoles" label-width="80px">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="rePwd">
          <el-input type="password" v-model="form.rePwd"></el-input>
        </el-form-item>
        <el-form-item label="用户角色" prop="userRole">
          <el-select v-model="form.userRole" placeholder="请选择">
            <el-option
              v-for="(item, idx) in selectRoleList"
              :key="idx"
              :label="item.roleName"
              :value="item.roleName"
              >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userDialogVisible = false">取 消</el-button>
        <el-button type="success" @click="saveNewUser">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, addUser, delUser } from 'api/user';
import { getAllAuthority, getRoleAuthority, modifyRoleAuth } from 'api/authority';
import { getRoleList } from 'api/role';
import { validatAlphAndNums } from 'utils/validate';
import { deepClone } from 'utils/index';
import * as messageBox from 'utils/message-box';
export default {
  data() {
    const validUserName = (rule, value, callback) => {
      if (value !== '') {
        if (!validatAlphAndNums(value)) {
          callback(new Error('用户名必须是字母/&数字组合'));
        } else {
          callback();
        }
      }
    };
    const validPwd = (rule, value, callback) => {
      if (value !== '') {
        if (value !== this.form.password) {
          callback(new Error('两次密码不一致'));
        } else {
          callback();
        }
      }
    };
    return {
      leftCardTitle: '系统管理',
      manageItems: [],
      itemName: '用户管理',
      manageType: 1,
      userList: [],
      allRole: [],
      selectRoleList: [],
      userDialogVisible: false,
      form: {
        userName: '',
        password: '',
        rePwd: '',
        userRole: ''
      },
      addRoles: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validUserName }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        rePwd: [
          { required: true, message: '再次输入密码', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validPwd }
        ],
        userRole: [
          { required: true, message: '请选择角色类型', trigger: 'blur' }
        ]
      },
      // treeData: [{
      //   label: '一级 1',
      //   children: [{
      //     label: '二级 1-1',
      //     children: [{
      //       label: '三级 1-1-1'
      //     }]
      //   }]
      // }, {
      //   label: '一级 2',
      //   children: [{
      //     label: '二级 2-1',
      //     children: [{
      //       label: '三级 2-1-1'
      //     }]
      //   }, {
      //     label: '二级 2-2',
      //     children: [{
      //       label: '三级 2-2-1'
      //     }]
      //   }]
      // }, {
      //   label: '一级 3',
      //   children: [{
      //     label: '二级 3-1',
      //     children: [{
      //       label: '三级 3-1-1'
      //     }]
      //   }, {
      //     label: '二级 3-2',
      //     children: [{
      //       label: '三级 3-2-1'
      //     }]
      //   }]
      // }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      originTreeData: [],
      checkedAuths: [],
      roleId: 0
    };
  },
  computed: {
    currentId() {
      const data = JSON.parse(localStorage.getItem('userData'));
      return data.userId;
    },
    treeData() {
      if (this.originTreeData && this.originTreeData.length) {
        const tree = this.originTreeData.filter((father) => {
          const childrenArr = this.originTreeData.filter((child) => {
            // 每一项子级数组
            return father.id === child.parentId;
          });
          // 有子级, 父级添加children,=>赋值
          if (childrenArr.length > 0) {
            father.children = childrenArr;
          }
          // 告诉最初始的parentId
          return father.parentId === -1;
        });
        return tree;
      }
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.manageItems = [{ name: '用户管理', type: 1 }, { name: '角色管理', type: 2 }, { name: '权限管理', type: 3 }];
      this.loadUserList();
      this.getRoles();
      this.loadAllAuthority();
    },
    loadUserList() {
      getUserList().then(response => {
        if (response.data.success) {
          const userList = response.data.data;
          this.userList = userList.filter(item => item.userId !== this.currentId);
        } else {
          messageBox.error(response.data.errorMsg);
        }
      });
    },
    getRoles() {
      getRoleList().then(resp => {
        if (resp.data.success) {
          const list = resp.data.data;
          this.allRole = list;
          list.forEach(el => {
            if (el.roleLevel !== 1) {
              this.selectRoleList.push(el);
            }
          });
        } else {
          messageBox.error(resp.data.errorMsg);
        }
      });
    },
    loadAllAuthority() {
      getAllAuthority().then(response => {
        const respData = response.data.data;
        if (response.data.success) {
          this.convertToTreeData(respData);
        } else {
          messageBox.error(response.data.errorMsg);
        }
      }).catch(() => {
        messageBox.error('未知错误');
      });
    },
    async convertToTreeData(treeData) {
      console.log(treeData);
      const treeOrigin = [];
      await treeData.forEach((item, index) => {
        const temp = {};
        temp.id = item.id;
        temp.label = item.name;
        temp.name = item.name;
        temp.parentId = item.moudleId;
        treeOrigin.push(temp);
      });
      console.log(treeOrigin);
      this.originTreeData = deepClone(treeOrigin);
      // this.selectRole(1);
    },
    addUser() {
      this.userDialogVisible = true;
    },
    saveNewUser() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const data = this.form;
          addUser(data).then(resp => {
            if (resp.data.success) {
              messageBox.success('添加成功');
              this.loadUserList();
            } else {
              messageBox.error(resp.data.errorMsg);
            }
            this.userDialogVisible = false;
          });
        }
      });
    },
    selectRole(roleId) {
      const data = {};
      data.roleId = roleId;
      this.roleId = roleId;
      this.checkedAuths = [];
      const $ts = this;
      getRoleAuthority(data).then(response => {
        if (response.data.success) {
          const respData = response.data.data;
          if (respData && respData.length) {
            respData.forEach(element => {
              $ts.checkedAuths.push(element.id);
            });
          }
          // console.log($ts.checkedAuths);
          if (this.treeData && this.treeData.length) {
            this.$nextTick(() => {
              $ts.$refs.tree.setCheckedKeys($ts.checkedAuths);
            });
          }
        } else {
          messageBox.error(response.data.errorMsg);
        }
      });
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(checked);
    },
    saveAuth() {
      const $ts = this;
      $ts.$confirm('本次权限设置将在下次登录生效, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const checkedKeys = this.$refs.tree.getCheckedKeys();
        const data = {};
        data.roleId = this.roleId;
        data.authIds = checkedKeys.toString();
        modifyRoleAuth(data).then(response => {
          if (response.data.success) {
            messageBox.success('设置权限成功!');
          } else {
            messageBox.error(response.data.errorMsg);
          }
        });
      }).catch(() => {
        messageBox.info('已取消重置');
      });
    },
    delUser(row) {
      const data = {};
      const $ts = this;
      data.userId = row.userId;
      $ts.$confirm('此操作将删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUser(data).then(response => {
          if (response.data.success) {
            messageBox.success('删除成功');
            $ts.loadUserList();
          } else {
            messageBox.error(response.data.errorMsg);
          }
        });
      }).catch(() => {
        $ts.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    updateRole(rowData) {
      console.log(rowData);
    },
    editUser(row) {},
    changeManage(item) {
      this.itemName = item.name;
      this.manageType = item.type;
      if (item.type === 3) {
        this.selectRole(1);
      }
    }
  }
};
</script>

<style lang="scss">
$normal-border: 1px solid #EBEBEB;
@mixin all-fix() {
  width: 100%;
  height: 100%;
}
@mixin middle-height($height) {
    height: $height;
    line-height: $height;
  }
@mixin test-corder($color) {
  border: 1px solid $color;
}
.user-author {
  width: 100%;
  height: 100vh;
  background: #ffffff;
  // @include test-corder(red);
  .left-nav {
    width: 15%;
    height: 100%;
    float: left;
    .left-card {
      @include all-fix();
      .title {
        font-size: 18px;
      }
      .content {
        width: 100%;
        .item {
          width: 100%;
          display: block;
          margin: 5px 0px;
          @include middle-height(30px);
          // padding-left: 10px;
        }
        .item:hover {
          background: rgb(240, 248, 248);
          cursor: pointer;
        }
        .is-active {
          background: rgb(240, 248, 248);
        }
      }
    }
  }
  .right-main {
    width: 84.5%;
    height: 100%;
    margin-left: 0.5%;
    float: left;
    // border: 1px solid red;
    .title {
        font-size: 16px;
        font-weight: bold;
      }
    .main-card {
      @include all-fix();
      .content {
        width: 100%;
        // min-height: 400px;
        // @include test-corder(red);
        .main {
          .add-user {
            width: 100%;
           height: 50px;
            border-bottom: $normal-border;
          }
          .user-table {
            width: 100%;
            min-height: 200px;
          }
          .auth-content {
            width: 1000px;
            min-height: 600px;
            // border: 1px solid red;
            border: $normal-border;
            padding: 10px;
            .left-auth {
              width: 200px;
              height: 580px;
              float: left;
              border: $normal-border;
              .item {
                width: 100%;
                display: block;
                margin: 5px 0px;
                text-align: center;
                @include middle-height(30px);
              }
              .item:hover {
                background: rgb(240, 248, 248);
                cursor: pointer;
              }
              .is-active {
                background: rgb(240, 248, 248);
              }
            }
            .right-auth {
              float: left;
              // border: 1px solid red;
              // width: 800px;
              margin-left: 10px;
              height: 580px;
            }
            .modify-auth {
              float: right;
              margin-right: 20px;
            }
          }
        }
      }
    }
  }
  .el-tree-node__content {
    height: 30px;
  }
  .el-tree-node__label {
    font-size: 16px;
  }
}
</style>
