import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login.vue';
//webpack自行将vue-router设置好了
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Login'
    },
    {
      name: 'Login',
      path: '/Login',
      component: Login
    }
  ]
});
