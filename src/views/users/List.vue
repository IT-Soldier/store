<template>
  <el-card
  class="box-card"
  shadow="hover">
      <!-- 相当于link-to标签,路由中的跳转 -->
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb> -->
    <!-- 面包屑组件已经被封装 -->
    <my-breadcrumb></my-breadcrumb>
    <!-- 搜索框部分 -->
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
      <el-button
        type="success"
        plain
        @click="dialogAddFormVisible = true">添加用户</el-button>
    </div>
    <!-- 表格主体 -->
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
      <!-- change switch 状态发生变化时的回调函数,应该绑定在switch上 -->
      <el-table-column label="用户状态" width="100">
        <!-- scope.row除了可以在模板中使用,还可以在行内属性上使用 -->
        <template slot-scope="scope">
          <el-switch
          v-model="scope.row.mg_state"
          @change="stateChange(scope.row)"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
          size="mini"
          type="primary"
          icon="el-icon-edit"
          plain
          @click="openEditDialogForm(scope.row)"></el-button>
          <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          plain
          @click="handelDelele(scope.row.id)"></el-button>
          <el-button
          size="mini"
          type="success"
          icon="el-icon-check"
          plain
          @click="openRoleDialogForm(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加用户弹出框 -->
    <!-- close是Dialog 关闭的回调函数 -->
    <el-dialog
      center
      @close="closeDialog"
      :visible.sync="dialogAddFormVisible">
      <h2 style="text-align:center;">添加用户</h2>
      <el-form
      label-position="right"
      label-width="120px"
      :rules="rules"
      :model="formData"
      ref="ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input type="email" v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input type="text" v-model="formData.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="quitDialog">取 消</el-button>
        <el-button type="primary" @click="handelAdd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户弹出框 -->
    <el-dialog
      center
      @close="closeDialog"
      :visible.sync="dialogEditFormVisible">
      <el-form
      label-position="right"
      label-width="120px"
      :rules="rules"
      :model="formData"
      ref="ruleForm">
        <h2 style="text-align:center;">修改用户</h2>
        <el-form-item label="用户名" prop="username">
          <el-input disabled type="text" v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input type="email" v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input type="text" v-model="formData.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="quitDialog">取 消</el-button>
        <el-button type="primary" @click="handelEdit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 角色更改弹出框 -->
    <el-dialog
      center
      @close="closeDialog"
      :visible.sync="dialogRoleFormVisible">
      <el-form
      label-position="right"
      label-width="120px"
      :model="formData">
        <h2 style="text-align:center;">分配角色</h2>
        <el-form-item label="用户名">
          <el-input disabled type="text" v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="currentRoleId">
            <!-- 虽然是在select标签上绑定,但绑定的是option的value,由于接口要求,所以必须是数字,-->
            <!-- 而且是角色id,未分配角色默认为-1 -->
            <el-option label="请选择角色" :value="-1"></el-option>
            <!-- 使用v-for时,本框架要求必须绑定唯一的:key -->
            <!-- option -->
            <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="quitDialog">取 消</el-button>
        <el-button type="primary" @click="handelRole">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分页导航 -->
    <!-- layout控制是分页功能是否完整 -->
    <!-- 其余的功能就是英语字面的翻译 -->
    <el-pagination
      class="fenye"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 3, 4, 5]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      query: '',
      pagenum: 1,
      pagesize: 4,
      total: 0,
      dialogAddFormVisible: false,
      dialogEditFormVisible: false,
      dialogRoleFormVisible: false,
      formData: {
        username: '',
        password: '',
        email: '',
        mobile: '',
        id: '',
        role_id: '',
        region: ''
      },
      options: [],
      currentRoleId: -1,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 11, message: '长度在 6 到 11 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    // 加载用户信息
    async loadData() {
      // 获取表格数据并填充
      const response = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
        // response.data.data.users是当前this.pagenum页数对应的数据集合,也就是this.tableData中的东西
        this.tableData = response.data.data.users;
        // 用户信息总条数
        this.total = response.data.data.total;
    },
    // 查询功能,查询的是username
    handelQuery() {
      this.$http
        .get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.query}`)
        .then(response => {
          const {msg, status} = response.data.meta;
          if (status === 200) {
            console.log(response.data);
            this.total = response.data.data.total;
            this.pagenum = response.data.data.pagenum;
            this.tableData = response.data.data.users;
          } else {
            this.$message.error(msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 删除功能
    handelDelele(id) {
      this.$confirm('是否确认删除该条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http
          .delete(`users/${id}`)
          .then(response => {
            // console.log(response.data);
            const {msg, status} = response.data.meta;
            if (status === 200) {
              // 如果最后一页只有1条数据,此时删除,则this.pagenum应减一,再刷新页面
              if (this.total % this.pagesize === 1) {
                this.pagenum--;
              }
              // 第二种手段 this.tableData当前页数据集合
              // if (this.pagenum > 1 && this.tableData.length === 1) {
              // this.pagenum--;
              // }
              this.$message.success('删除成功');
              // 重新加载数据
              this.loadData();
            } else {
              this.$message.error(msg);
            }
          })
          .catch(error => {
            this.$message.error(error);
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 添加功能
    handelAdd() {
      this.dialogAddFormVisible = true;
      this.$refs.ruleForm.validate((valid) => {
      // 对整个表单进行校验的方法，参数为一个回调函数。
      // 该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。
      // 若不传入回调函数，则会返回一个 promise
      // 因为它封装了promise对象,取值方式相同,valid经过检验是验证之后返回的布尔值
      // console.log(valid);
        if (!valid) {
          return;
        }
        this.$http
          .post(`users`, this.formData)
          .then(response => {
            const {msg, status} = response.data.meta;
            // 用post时相对比较特殊,标识码是201
            if (status === 201) {
            // 添加成功关闭弹出框
              this.dialogAddFormVisible = false;
              // 重新加载数据,刷新页面
              this.loadData();
              // 清空文本框
              for (let key in this.formData) {
                this.formData[key] = '';
              }
              this.$message.success('添加成功');
            } else {
              this.$message.error(msg);
            }
          })
          .catch(error => {
            this.$message.error(error);
          });
      });
    },
    // 编辑功能
    async handelEdit() {
      const response = await this.$http.put(`users/${this.formData.id}`, {
        email: this.formData.email,
        mobile: this.formData.mobile
      });
        this.dialogEditFormVisible = false;
        // 重新加载数据,刷新页面
        this.loadData();
        // 清空文本框
        // for(let key in this.formData) {
        //   this.formData[key] = '';
        // }
        this.$message.success('添加成功');
    },
    // 角色分配功能
    async handelRole() {
      // 当选中option的value发生变化时,currentRoleId也会随之改变
      const response = await this.$http.put(`users/${this.formData.id}/role`, {
        rid: this.currentRoleId
      });
        this.$message.success('角色分配成功');
        this.dialogRoleFormVisible = false;
        this.loadData();
    },
    // 取消按钮,关闭弹出框
    quitDialog() {
      // 关闭添加弹出框
      this.dialogAddFormVisible = false;
      // 关闭编辑弹出框
      this.dialogEditFormVisible = false;
      // 关闭角色分配弹出框
      this.dialogRoleFormVisible = false;
      // 清空表单
      for (let key in this.formData) {
        this.formData[key] = '';
      }
    },
    // 叉号关闭弹出框
    closeDialog() {
      // 清空表单
      for (let key in this.formData) {
        this.formData[key] = '';
      }
    },
    // 打开编辑弹出框,并将数据渲染到页面上去
    openEditDialogForm(row) {
      // row中已经有了表单所需的信息,不需要再次发请求拿数据
      this.dialogEditFormVisible = true;
      this.formData.username = row.username;
      this.formData.mobile = row.mobile;
      this.formData.email = row.email;
      this.formData.id = row.id;
    },
    // 打开角色分配弹出框,并将数据渲染到页面上去
    async openRoleDialogForm(row) {
      this.dialogRoleFormVisible = true;
      this.formData.username = row.username;
      // 当前用户id,修改用户角色时使用
      this.formData.id = row.id;
      const response = await this.$http.get(`roles`);
      // 去拿到所有的角色分类,下拉列表中遍历
      this.options = response.data.data;
      const response_rid = await this.$http.get(`users/${row.id}`);
      const {rid} = response_rid.data.data;
      // 根据用户id去获取对应的角色id,去选中角色名称
      this.currentRoleId = rid;
    },
    // pagesize变化时触发事件
    handleSizeChange(val) {
      // 当不在第一页时,点击当前显示页数,回车时,应跳转到第一页
      if (this.pagenum !== 1) {
        this.pagenum = 1;
      }
      // 此处的val对应的是page-sizes中的值
      // console.log(`每页 ${val} 条`);
      this.pagesize = val - 0;
      this.loadData();
    },
    // pagenum变化时触发的事件
    handleCurrentChange(val) {
      // 此处的val对应的是current-page的值
      // console.log(`当前页: ${val}`);
      // val是字符串,pagenum需要的是数字
      this.pagenum = val - 0;
      this.loadData();
    },
    // 修改用户状态功能
    async stateChange(row) {
      const response = await this.$http.put(`users/${row.id}/state/${row.mg_state}`);
        this.$message.success('用户状态修改成功!');
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
  overflow: hidden;
}
.fenye {
  margin-top: 10px;
  margin-left: 10px;
}
.el-pagination__jump {
  margin-top: -10px;
}
.el-form-item__label {
  margin-top: 10px;
}
</style>
