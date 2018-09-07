<template>
  <el-container>
    <el-header>Header
      <a href="javascript:;" @click.prevent="logout">退出</a>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  beforeCreate() {
    // 在页面加载前,就进行token的验证,效果类似axios的同步请求
    const token = sessionStorage.getItem('token');
    if (!token) {
    // 仅仅验证了token是否存在,若有token,即使不正确也可以看到Home页面,但是无数据渲染,
    // 前端的验证强度已经足够
      this.$router.push('/Login');
      this.$message.warning('请登录后访问页面!');
    }
  },
  methods: {
    logout() {
      // 提示用户确认其已经触发的动作，并询问是否进行此操作时会用到此对话框。
      this.$confirm('是否确认退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 清空sessionStorage的token
        sessionStorage.removeItem('token');
        // 跳转到登录页,并提醒登录
        this.$router.push('/Login');
        this.dialogVisible = false;
        this.$message.success('您已经成功退出!');
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出登录'
        });
      });
    }
  }
};
</script>

<style>
 .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    height: 100%;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height: 100%;
  }
  .el-container {
    height: 100%;
  }
</style>
