<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
      class="card-box login-form">
      <h3 class="login-title">Welcome To DMS</h3>
      <el-form-item prop="userName">
        <el-input class="login-input-el" name="userName" type="text" v-model="loginForm.userName" autoComplete="on" placeholder="用户名" @keyup.enter.native.prevent="handleLogin">
          <icon-svg slot="prefix" icon-class="yonghuming"></icon-svg>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input class="login-input-el" name="password" type="password" v-model="loginForm.password" autoComplete="on"
          placeholder="密码" @keyup.enter.native.prevent="handleLogin">
          <icon-svg slot="prefix" icon-class="mima"></icon-svg></el-input>
      </el-form-item>
      <el-form-item prop="validateCode">
        <el-input class="login-input-el" name="validateCode" type="text" v-model="loginForm.validateCode" autoComplete="on"
          placeholder="验证码" @keyup.enter.native.prevent="handleLogin">
          <icon-svg slot="prefix" icon-class="yanzhengma"></icon-svg>
          <valicated-code @checkCode="checkCode" slot="suffix" :refreshState="refreshState"></valicated-code></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as messageBox from 'utils/message-box';
import valicatedCode from 'components/valicated-com/verficated-code';
import { login } from 'api/user';
export default {
  name: 'login',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'));
      } else {
        callback();
      }
    };
    const validateValidateCode = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('请输入验证码'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        userName: 'admin',
        password: '123456',
        validateCode: ''
      },
      checkedCode: '',
      refreshState: 0,
      sendCount: 0,
      loginRules: {
        password: [
          { required: true, trigger: 'blur', validator: validatePass }
        ],
        validateCode: [
          { required: true, trigger: 'blur', validator: validateValidateCode }
        ]
      }
    };
  },
  components: {
    valicatedCode
  },
  methods: {
    handleLogin() {
      this.sendCount += 1;
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 验证通过
          const formData = this.loginForm;
          if (formData.validateCode.toLowerCase() === this.checkedCode) {
            login(formData).then(response => {
              if (response.data.success) {
                this.$router.push({ path: '/mainpageview' });
                this.$store.commit('SET_STATUS', 'online');
              } else {
                messageBox.error(response.data.errorMsg);
              }
            });
          } else {
            messageBox.error('验证码输入错误!');
            this.refreshState = this.sendCount;
          }
        } else {
          console.log('验证失败');
        }
        // 验证不通过
        // messageBox.error('密码输入错误!');
      });
    },
    checkCode(val) {
      this.checkedCode = val;
    }
  }
};
</script>

<style lang="scss">
.login-container {
    // @include relative;
    height: 100vh;
    background-color: #2d3a4b;
}
.login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
.login-title {
      font-size: 26px;
      font-weight: 400;
      color: #eeeeee;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
.login-input-el .el-input__inner {
  background:  rgba(0, 0, 0, 0.1);
  border: #494949 1px solid;
  color: #fff;
}
</style>
