<template>
  <el-card
  class="box-card"
  shadow="hover">
    <my-breadcrumb></my-breadcrumb>
    <el-table
      :data="tableData"
      border
      style=" width: 100%; margin-top: 10px;">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <!-- prop与tableData数组对象中的属性名是对应的,去显示相应的值 -->
      <el-table-column
        prop="roleName"
        label="角色名称">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述"
        >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
          size="mini"
          type="primary"
          icon="el-icon-edit"
          plain></el-button>
          <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          plain></el-button>
          <el-button
          size="mini"
          type="success"
          icon="el-icon-check"
          plain></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    async loadData() {
      const response = await this.$http.get('roles');
      console.log(response.data);
      const {msg, status} = response.data.meta;
      if(status === 200) {
        this.tableData = response.data.data;
      } else {
        this.$message.error(msg);
      }
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style>
  .box-card {
    height: 100%;
    /* card高度不够,默认是hidden */
    overflow: auto;
    }

  .el-main {
    text-align: left;
    overflow: hidden;
  }
</style>
