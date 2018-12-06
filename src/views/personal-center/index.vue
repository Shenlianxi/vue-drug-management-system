<template>
  <div class="personal-center">
    <div class="per-content">
      <el-tabs v-model="activeName" @tab-click="handleClick" tabPosition="left" type="border-card" class="panel-profile">
        <el-tab-pane label="个人信息" name="profile">
          <div class="content">
            <el-form ref="userForm" :rules="userRules" :model="userForm" :label-width="labelWidth">
              <el-form-item label="用户名">
                <el-input v-model="userForm.userName" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="角色">
                <el-input v-model="userForm.userRole" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="昵称" prop="nickName">
                <el-input v-model="userForm.nickName" :disabled="!switchValue"></el-input>
              </el-form-item>
              <el-form-item label="部门" prop="position">
                <el-input v-model="userForm.position" :disabled="!switchValue"></el-input>
              </el-form-item>
              <el-form-item label="职位" prop="job">
                <el-input v-model="userForm.job" :disabled="!switchValue"></el-input>
              </el-form-item>
              <el-form-item label="年龄" prop="age">
                <!-- <el-input v-model="userForm.age" :disabled="!switchValue"></el-input> -->
                <el-slider v-model="userForm.age" :disabled="!switchValue"></el-slider>
              </el-form-item>
              <el-form-item>
                <el-switch
                  v-model="switchValue"
                  active-text="启用编辑"
                  inactive-text="">
                </el-switch>
                <el-button class="confirm" type="primary" @click="confirmProfile">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="密码修改" name="passwordPanel">
          <div class="content">
            <el-form :model="passwordForm" ref="pwdForm" :rules="pwdRules" :label-width="labelWidth">
              <el-form-item label="原密码" prop="oldPwd">
                <el-input v-model="passwordForm.oldPwd" :type="passwordOld">
                   <i   @mousedown="passwordOld = 'text'"
                        @mouseup="passwordOld = 'password'"
                        slot="suffix"
                        class="eye el-icon-view"></i>
                </el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newPwd">
                <el-input v-model="passwordForm.newPwd" :type="passwordNew">
                   <i   @mousedown="passwordNew = 'text'"
                        @mouseup="passwordNew = 'password'"
                        slot="suffix"
                        class="eye el-icon-view"></i>
                </el-input>
              </el-form-item>
              <el-form-item label="重新输入" prop="rePwd">
                <el-input v-model="passwordForm.rePwd" :type="passwordRe">
                   <i   @mousedown="passwordRe = 'text'"
                        @mouseup="passwordRe = 'password'"
                        slot="suffix"
                        class="eye el-icon-view"></i>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="confirm" type="primary" @click="confirmPassword">确认</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="权限查看" name="authorityPre">
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { changePwd, getUser, saveProfile } from 'api/user';
import * as messageBox from 'utils/message-box';
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.passwordForm.newPwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      activeName: 'profile',
      labelWidth: '80px',
      switchValue: false,
      passwordRe: 'password',
      passwordNew: 'password',
      passwordOld: 'password',
      userForm: {
        userName: '',
        userRole: '',
        nickName: '',
        position: '',
        job: '',
        age: null
      },
      passwordForm: {
        oldPwd: '',
        newPwd: '',
        rePwd: ''
      },
      userRules: {
        nickName: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        position: [
          { required: true, message: '请输入部门', trigger: 'blur' }
        ],
        job: [
          { required: true, message: '请输入职位', trigger: 'blur' }
        ]
        // age: [
        //   { required: true, message: '年龄不能为空', trigger: 'blur' }
        //   // { type: Number, message: '年龄必须为数字值', trigger: 'blur' }
        // ]
      },
      pwdRules: {
        oldPwd: [
          { required: true, message: '密码不为空', trigger: 'blur' },
          { min: 6, message: '密码不能小于6位', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '密码不为空', trigger: 'blur' },
          { min: 6, message: '密码不能小于6位', trigger: 'blur' }
        ],
        rePwd: [
          { required: true, trigger: 'blur', validator: validatePass },
          { min: 6, message: '密码不能小于6位', trigger: 'blur' }
        ]
      }
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      getUser().then(resp => {
        if (resp.data.success) {
          this.userForm = resp.data.data;
        } else {
          messageBox.error(resp.data.errorMsg);
        }
      });
    },
    handleClick(value) {
      console.log(value);
    },
    confirmProfile() {
      const formData = this.userForm;
      this.$refs.userForm.validate(valid => {
        if (valid) {
          const data = {};
          data.nickName = formData.nickName;
          data.position = formData.position;
          data.job = formData.job;
          data.age = formData.age;
          saveProfile(data).then(response => {
            if (response.data.success) {
              messageBox.success('信息更新成功');
            } else {
              messageBox.error(response.data.errorMsg);
            }
          });
        }
      });
    },
    confirmPassword() {
      const formData = this.passwordForm;
      this.$refs.pwdForm.validate(valid => {
        if (valid) {
          const data = {};
          data.oldPwd = formData.oldPwd;
          data.newPwd = formData.newPwd;
          changePwd(data).then(response => {
            if (response.data.success) {
              messageBox.success('密码修改成功');
            } else {
              messageBox.error(response.data.errorMsg);
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.personal-center {
  height: 100vh;
  width: 100%;
  // border: 1px solid red;
  position: relative;
}
.per-content {
    position: absolute;
    left: 0;
    right: 0;
    width: 1200px;
    min-height: 600px;
    // padding: 15px 35px 15px 35px;
    margin: 20px auto;
}
.panel-profile {
  width: 100%;
  height: 600px;
}
.content {
  height: 580px;
  width: 600px;
  // border: 1px solid blue;
}
.confirm {
  float: right;
}
.eye {
  cursor: pointer;
  margin-right: 10px;
}
</style>
