// 运行代码 npm run lintfix 类似npm run dev
import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login.vue';
import Home from '@/views/Home.vue';
import User from '@/views/users/List';
// webpack自行将vue-router设置好了
Vue.use(Router);

export default new Router({
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
          name: 'user',
          path: '/user',
          component: User
        }
      ]
    }
  ]
});
