<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <!-- 标签内,比如图片使用的是绝对路径,根路径为src文件夹 -->
      <el-row :gutter="20">
        <el-col :span="4"><img src="/static/logo.png"></el-col>
        <el-col :span="18" class="title">电商后台管理系统</el-col>
        <el-col :span="2"><a class="logout" href="javascript:;" @click.prevent="logout">退出</a></el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-row>
          <el-col>
            <!-- unique-opened 只展开一个子菜单 -->
            <!-- router:是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
            <el-menu
              router
              unique-opened
              active-text-color="#ffd04b"
              class="el-menu-vertical-demo">
              <!-- el-submenu在页面中是菜单 -->
              <el-submenu
              v-for="level1 in option"
              :key="level1.id"
              :index="level1.path">
                <!-- 在向具名插槽提供内容的时候，我们可以在一个父组件的 <template> 元素上使用 slot 特性(--vue,具名插槽) -->
                <!-- 在模板中通过具名slot,title也不可以修改,框架内置的,才使得模板内容正常显示 -->
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{level1.authName}}</span>
                </template>
                  <!-- el-menu-item在页面中是菜单项 -->
                  <!-- router被使用以 index 作为 path 进行路由跳转 -->
                  <!-- index命名路由,此处进行了字符串的拼接,主要是因为/的存在 -->
                  <el-menu-item
                  v-for="level2 in level1.children"
                  :key="level2.id"
                  :index="'/' + level2.path">
                    <i class="el-icon-document"></i>
                    {{level2.authName}}
                  </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <!-- 主内容区 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      option: []
    };
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
        this.$router.push('/login');
        this.dialogVisible = false;
        this.$message.success('您已经成功退出!');
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出登录'
        });
      });
    },
    async loadData() {
      const response = await this.$http.get('menus');
      this.option = response.data.data;
      // console.log(response);
    }
  },
  beforeCreate() {
    // 在页面加载前,就进行token的验证,效果类似axios的同步请求
    const token = sessionStorage.getItem('token');
    if (!token) {
    // 仅仅验证了token是否存在,若有token,即使不正确也可以看到Home页面,但是无数据渲染,
    // 前端的验证强度已经足够
    // 当页面刷新时没有token就会跳转到登录页
      this.$router.push('/login');
      this.$message.warning('请登录后访问页面!');
      return;
    }
    this.$http.defaults.headers.common['Authorization'] = token;
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style>
 .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    padding: 0;
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
  .title {
    color: #fff;
    font-size: 24px;
  }
  .logout {
    text-decoration: none;
    color: orange;
  }
  .el-row,.el-col,.el-menu-vertical-demo {
    height: 100%;
  }
  .el-submenu__title {
    padding-left: 0 !important;
    padding-right: 60px !important;
  }
</style>
