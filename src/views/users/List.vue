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
      <!-- clearable使得输入框可以被清除 -->
      <el-input
      clearable
      placeholder="请输入内容"
      class="input-with-select"
      v-model="query">
        <!-- slot="append"使得搜索按钮存在 -->
        <el-button
        slot="append"
        icon="el-icon-search"
        @click="handelQuery"></el-button>
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
          <!-- 时间格式处理详情参见main.js -->
          <span>{{ scope.row.create_time | format('YYYY-MM-DD') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户状态" width="100">
        <!-- scope.row除了可以在模板中使用,还可以在行内属性上使用 -->
        <template slot-scope="scope">
          <el-switch
          v-model="scope.row.mg_state"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" plain></el-button>
          <el-button size="mini" type="success" icon="el-icon-check" plain></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" plain
          @click="handelDelele(scope.row.id)"></el-button>
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
      query: '',
      currentPage4: 4
    };
  },
  methods: {
    loadData() {
      // 若没有token封装到请求头中,请求必然失败
      let token = sessionStorage.getItem('token');
      this.$http.defaults.headers.common['Authorization'] = token;
      this.$http
        .get(`users?pagenum=1&pagesize=7`)
        .then(response => {
          if (response.status === 200) {
            this.tableData = response.data.data.users;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 查询功能,查询的是username
    handelQuery() {
      // 若没有token封装到请求头中,请求必然失败
      let token = sessionStorage.getItem('token');
      this.$http.defaults.headers.common['Authorization'] = token;
      this.$http
        .get(`users?pagenum=1&pagesize=5&query=${this.query}`)
        .then(response => {
          if (response.status === 200) {
            this.tableData = response.data.data.users;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handelDelele(id) {
      this.$confirm('是否确认删除该条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 若没有token封装到请求头中,请求必然失败
        let token = sessionStorage.getItem('token');
        this.$http.defaults.headers.common['Authorization'] = token;
        this.$http
          .delete(`users/${id}`)
          .then(response => {
            if (response.status === 200) {
              this.$message.success('删除成功');
              // 重新加载数据
              this.loadData();
            }
          })
          .catch(error => {
            this.$message.error(error);
          });

        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
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
