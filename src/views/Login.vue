<template>
<div class="login-wrap">
  <el-form 
  :label-position="labelPosition"
  class="login-form"
  :model="ruleForm"
  :rules="rules"
  label-width="80px">
    <h2>用户登录</h2>
    <el-form-item type="text" class="login-item" label="用户名" prop="username">
      <el-input v-model="ruleForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="ruleForm.password"></el-input>
    </el-form-item>
    <el-button class="login-button" type="primary" @click="handleLogin">登录按钮</el-button>
  </el-form>
</div>
</template>

<script>
export default {
  data() {
    return {
      // 由于要使用表单验证功能,所以数据发生了一些变化,formData的功能被ruleForm替代
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 11, message: '长度在 6 到 11 个字符', trigger: 'blur' }
        ],
      },
      labelPosition: 'top',
      asd: ''
    };
  },
  methods: {
    handleLogin() {
      this.$http
        .post('login', this.ruleForm)
        .then(response => {
          // 是否登录成功的信息是包含在response.data中的
          // 使用对象解构所需参数
          let {msg, status} = response.data.meta;
          if (status === 200) {
            console.log(response.data);
            // 提供的消息框,由element-ui提供
             this.$message.success(msg);
            // 使用的是$router.push, 而不是文档中router.push,
            // 是因为router插件为了全局使用, webpack已经暗中在vue中注册了router插件
            // 所以用法同axios的封装使用,它叫编程导航
            this.$router.push('/Home');
          } else {
            this.$message.error(msg);
          }
        })
        .catch(error => (
          console.log(error)
        ));
    }
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
