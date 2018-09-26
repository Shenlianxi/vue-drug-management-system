<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
      class="card-box login-form">
      <h3 class="login-title">系统登录</h3>
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
          <icon-svg slot="prefix" icon-class="yanzhengma"></icon-svg></el-input>
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
        userName: '',
        password: '',
        validateCode: ''
      },
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
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          console.log(valid);
          // 验证通过
        } else {
          // 验证不通过
          console.log('nulllllll');
          messageBox.error('erroe');
        }
      });
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
