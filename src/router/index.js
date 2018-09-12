// 运行代码 npm run lintfix 类似npm run dev
import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login.vue';
import Home from '@/views/Home.vue';
import User from '@/views/users/List';
import Role from '@/views/roles/Roles';
// 这是一个模块,不是一个vue实例,所以不能使用element-ui封装好的this.$message
// 需要按需引入message插件
import {Message} from 'element-ui';
// webpack自行将vue-router设置好了
Vue.use(Router);

const router =  new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/home',
      component: Home,
      children: [
        {
          name: 'users',
          // 接口的path是带s的,可文档并未说明
          path: '/users',
          component: User
        },
        {
          name: 'roles',
          path: '/roles',
          component: Role
        }
      ]
    }
  ]
});
// 配置路由前置守卫
router.beforeEach((to, from, next) => {
  // to,from都接收的是路由规则
  // 如果路由是login,则正常向下去执行
  if(to.name === 'login') {
    next();
  } else {
    const token = sessionStorage.getItem('token');
    // 如果token不存在,阻止路由跳转,不需要去验证token是否正确,那是后端的事情
    // token只会在sessionStorage存储一次,就是登录的时候
    if(!token) {
    // 没有token,则通过编程路由跳转去登录页面
    router.push('/login');
    // 提醒其登录
    Message.warning('请登录后访问页面');
    }
    // 如果有token则正常放行,绝对不能少,否则页面就没了
    next();
  }
});
// 用变量router接收了路由对象,然后去导出
export default router;