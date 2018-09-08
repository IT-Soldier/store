<template>
  <el-card
  class="box-card"
   shadow="hover">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- 相当于link-to标签,路由中的跳转 -->
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="success" plain>添加用户</el-button>
    </div>
    <!-- 当el-table元素中注入data对象数组后，
    在el-table-column中用prop属性来对应对象中的键名即可填入数据，
    用label属性来定义表格的列名。
    可以使用width属性来定义列宽。 -->
    <!-- :data="tableData"绑定data中的数据 -->
    <!-- border加边框 -->
    <!-- lebal-width设置所有列的宽度 -->
    <el-table
    border
    :data="tableData"
    lebal-width="50px"
    style="width: 100%;">
    <!-- 如果需要显示索引，可以增加一列el-table-column，设置type属性为index即可显示从 1 开始的索引号。 -->
      <el-table-column type="index">
      </el-table-column>
      <el-table-column
        label="姓名">
        <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据 -->
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="邮箱">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column 
      label="电话">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="时间">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户状态">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
    class="fenye"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      currentPage4: 4
    };
  },
  methods: {
    test() {
      console.log('测试专用');
    },
    loadData() {
      // 若没有token封装到请求头中,请求必然失败
      let token = sessionStorage.getItem('token');
      this.$http.defaults.headers.common['Authorization'] = token;
      this.$http
        .get(`users?pagenum=1&pagesize=5`)
        .then(response => {
          if(response.status === 200) {
            console.log(response);
            this.tableData = response.data.data.users;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  // beforeCreate() {
  //   // 此处最愚蠢的是最早可以使用数据和方法的时候是created的时候
  // }
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
.el-input {
  width: 400px;
  margin: 10px 0;
}
.el-main {
  text-align: left;
}
.fenye {
  margin-top: 10px;
  margin-left: 10px;
}
.el-pagination__jump {
  margin-top: -10px;
}
</style>
