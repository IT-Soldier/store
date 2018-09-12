<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <!-- 相当于link-to标签,路由中的跳转 -->
    <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'MyBreadcrumb'
};
</script>

<style>

</style>
