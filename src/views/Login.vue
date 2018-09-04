<template>
<div class="login-wrap">
  <el-form class="login-form" :label-position="labelPosition" label-width="80px">
    <h2>用户登录</h2>
    <el-form-item class="login-item" label="用户名">
      <el-input type="text"></el-input>
    </el-form-item>
    <el-form-item class="login-item" label="密码">
      <el-input type="password"></el-input>
    </el-form-item>
    <el-button class="login-button" type="primary">登录按钮</el-button>
  </el-form>
</div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: 'top'
    };
  }
};
</script>

<style>
  .login-wrap {
    position: relative;
    height: 100%;
    background: skyblue;
  }
  .login-wrap h2 {
    margin: 0;
  }
  .login-form {
    position:absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 400px;
    height: 350px;
    padding: 30px;
    margin: auto;
    background: #eee;
    border-radius: 20px;
  }
  .login-button {
    width: 100%;
    margin-top: 40px;
  }
</style>
